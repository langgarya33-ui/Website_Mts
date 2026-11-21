require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const db = require("./config/database_mts");

const app = express();
const uploadDirectory = path.join(__dirname, "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype?.startsWith("image/")) {
      return callback(new Error("File harus berupa gambar."));
    }
    callback(null, true);
  },
});

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  createDatabaseTable: false,
});

app.use(session({
  name: "mts_admin_session",
  secret: process.env.SESSION_SECRET || "replace-this-session-secret-before-deployment",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 8,
  },
}));

app.get("/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  if (!/^[\w.-]+\.webp$/i.test(filename)) {
    return res.sendStatus(404);
  }

  const imagePath = path.join(uploadDirectory, filename);
  if (req.session.admin) {
    return res.sendFile(imagePath, (error) => {
      if (error && !res.headersSent) res.sendStatus(error.statusCode || 404);
    });
  }

  const sql = `
    SELECT 1 FROM berita
    WHERE status_publikasi = 'Sudah Publikasi' AND FIND_IN_SET(?, gambar) > 0
    UNION ALL
    SELECT 1 FROM kegiatan
    WHERE status_publikasi = 'Sudah Publikasi' AND FIND_IN_SET(?, gambar) > 0
    UNION ALL
    SELECT 1 FROM prestasi
    WHERE status_publikasi = 'Sudah Publikasi' AND FIND_IN_SET(?, gambar) > 0
    LIMIT 1
  `;

  db.query(sql, [filename, filename, filename], (err, rows) => {
    if (err) {
      console.error("Gagal memeriksa akses gambar:", err);
      return res.sendStatus(500);
    }
    if (!rows.length) return res.sendStatus(404);
    return res.sendFile(imagePath, (error) => {
      if (error && !res.headersSent) res.sendStatus(error.statusCode || 404);
    });
  });
});

function requireAdmin(req, res, next) {
  if (!req.session.admin) {
    return res.status(401).json({ message: "Silakan login sebagai admin." });
  }
  next();
}

const contentTypes = {
  berita: { table: "berita", id: "id_berita", imageLimit: 1, fields: ["tanggal", "judul", "isi", "deskripsi", "status_publikasi"] },
  kegiatan: { table: "kegiatan", id: "id_kegiatan", imageLimit: 3, fields: ["tanggal", "judul", "isi", "deskripsi", "status_publikasi"] },
  prestasi: { table: "prestasi", id: "id_prestasi", imageLimit: 3, fields: ["tanggal", "judul", "isi", "deskripsi", "juara", "tingkat", "status_publikasi"] },
};

function uploadImageSlots(req, res, limit, callback) {
  const fields = Array.from({ length: limit }, (_, index) => ({ name: `gambar${index + 1}`, maxCount: 1 }));
  imageUpload.fields(fields)(req, res, (error) => callback(error, req.files || {}));
}

async function compressImageSlots(filesBySlot, limit) {
  const filenames = [];
  for (let index = 0; index < limit; index += 1) {
    const file = filesBySlot[`gambar${index + 1}`]?.[0];
    if (!file) {
      filenames.push("");
      continue;
    }
    const filename = `${Date.now()}-${require("crypto").randomUUID()}.webp`;
    await sharp(file.buffer)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(uploadDirectory, filename));
    filenames.push(filename);
  }
  return filenames;
}

function serializeContentRow(type, row) {
  const limit = contentTypes[type]?.imageLimit || 1;
  const images = row.gambar ? String(row.gambar).split(",") : [];
  while (images.length < limit) images.push("");
  images.length = limit;
  const firstImage = images.find(Boolean) || null;
  return {
    ...row,
    gambar: firstImage,
    foto: firstImage,
    gambar_list: images,
    status_publikasi: row.status_publikasi || "Sudah Publikasi",
    tipe: type,
  };
}

app.get("/api/content/:type", (req, res) => {
  const config = contentTypes[req.params.type];
  if (!config) return res.status(404).json({ message: "Jenis konten tidak ditemukan." });
  const visibilitySql = req.session.admin ? "" : " WHERE status_publikasi = 'Sudah Publikasi'";
  db.query(`SELECT * FROM ${config.table}${visibilitySql} ORDER BY ${config.id} DESC`, (err, rows) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data. Pastikan tabel sudah dibuat sesuai skema." });
    return res.json(rows.map((row) => serializeContentRow(req.params.type, row)));
  });
});

app.get("/api/content/:type/:id", (req, res) => {
  const config = contentTypes[req.params.type];
  if (!config) return res.status(404).json({ message: "Jenis konten tidak ditemukan." });
  const visibilitySql = req.session.admin ? "" : " AND status_publikasi = 'Sudah Publikasi'";
  db.query(`SELECT * FROM ${config.table} WHERE ${config.id} = ?${visibilitySql} LIMIT 1`, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data. Pastikan tabel sudah dibuat sesuai skema." });
    if (!rows.length) return res.status(404).json({ message: "Konten tidak ditemukan." });
    return res.json(serializeContentRow(req.params.type, rows[0]));
  });
});

app.post("/api/content/:type", requireAdmin, (req, res, next) => {
  const config = contentTypes[req.params.type];
  if (!config) return res.status(404).json({ message: "Jenis konten tidak ditemukan." });

  uploadImageSlots(req, res, config.imageLimit, async (uploadError, filesBySlot) => {
    if (uploadError) return res.status(400).json({ message: uploadError.message || "Gagal mengunggah gambar." });
    try {
      const data = {};
      for (const field of config.fields) data[field] = req.body[field];
      if (!data.tanggal || !data.isi?.trim() || !data.deskripsi?.trim()) {
        return res.status(400).json({ message: "Tanggal, isi, dan deskripsi wajib diisi." });
      }
      if (!data.judul?.trim()) {
        return res.status(400).json({ message: "Judul wajib diisi." });
      }
      if (!data.status_publikasi) data.status_publikasi = "Draft";
      if (!["Draft", "Sudah Publikasi"].includes(data.status_publikasi)) {
        return res.status(400).json({ message: "Status publikasi tidak valid." });
      }
      if (req.params.type === "prestasi" && (!data.juara?.trim() || !data.tingkat?.trim())) {
        return res.status(400).json({ message: "Juara dan tingkat wajib diisi." });
      }
      if (req.params.type === "prestasi" && !data.judul?.trim()) {
        return res.status(400).json({ message: "Judul prestasi wajib diisi." });
      }

      const filenames = await compressImageSlots(filesBySlot, config.imageLimit);
      const columns = ["id_akun", ...config.fields, "gambar"];
      const values = [req.session.admin.id, ...config.fields.map((field) => data[field]), filenames.join(",")];
      const placeholders = columns.map(() => "?").join(", ");
      db.query(`INSERT INTO ${config.table} (${columns.join(", ")}) VALUES (${placeholders})`, values, (err, result) => {
        if (err) {
          filenames.filter(Boolean).forEach((filename) => fs.promises.unlink(path.join(uploadDirectory, filename)).catch(() => {}));
          console.error(`Gagal menyimpan ${req.params.type}:`, err);
          const message = err.code === "ER_BAD_FIELD_ERROR"
            ? `Kolom judul belum tersedia di tabel ${config.table}. Tambahkan kolom judul sebelum menyimpan.`
            : "Gagal menyimpan data. Periksa kolom tabel dan pastikan skema sudah sesuai.";
          return res.status(500).json({ message });
        }
        return res.status(201).json({ id: result.insertId, message: "Data berhasil ditambahkan." });
      });
    } catch (error) {
      console.error("Gagal memproses gambar:", error);
      return res.status(400).json({ message: "Foto tidak dapat diproses. Pastikan file gambar valid." });
    }
  });
});

app.put("/api/content/:type/:id", requireAdmin, (req, res) => {
  const config = contentTypes[req.params.type];
  if (!config) return res.status(404).json({ message: "Jenis konten tidak ditemukan." });

  uploadImageSlots(req, res, config.imageLimit, async (uploadError, filesBySlot) => {
    if (uploadError) return res.status(400).json({ message: uploadError.message || "Gagal mengunggah gambar." });

    db.query(`SELECT * FROM ${config.table} WHERE ${config.id} = ? LIMIT 1`, [req.params.id], async (findError, rows) => {
      if (findError) return res.status(500).json({ message: "Gagal membaca data konten." });
      if (!rows.length) return res.status(404).json({ message: "Konten tidak ditemukan." });

      const current = rows[0];
      const data = {};
      for (const field of config.fields) data[field] = req.body[field];
      data.judul = data.judul || current.judul || current.isi;
      if (!data.tanggal || !data.isi?.trim() || !data.deskripsi?.trim() || !data.judul?.trim()) {
        return res.status(400).json({ message: "Tanggal, judul, isi, dan deskripsi wajib diisi." });
      }
      if (!["Draft", "Sudah Publikasi"].includes(data.status_publikasi)) {
        return res.status(400).json({ message: "Status publikasi tidak valid." });
      }
      if (req.params.type === "prestasi" && (!data.juara?.trim() || !data.tingkat?.trim())) {
        return res.status(400).json({ message: "Juara dan tingkat wajib diisi." });
      }

      let newFiles = [];
      let imageSlots = current.gambar ? String(current.gambar).split(",") : [];
      while (imageSlots.length < config.imageLimit) imageSlots.push("");
      imageSlots.length = config.imageLimit;
      const removedFiles = [];
      try {
        const compressedSlots = await compressImageSlots(filesBySlot, config.imageLimit);
        for (let index = 0; index < config.imageLimit; index += 1) {
          const oldFilename = imageSlots[index];
          if (compressedSlots[index]) {
            imageSlots[index] = compressedSlots[index];
            newFiles.push(compressedSlots[index]);
            if (oldFilename) removedFiles.push(oldFilename);
          } else if (req.body[`hapus_gambar${index + 1}`] === "true") {
            imageSlots[index] = "";
            if (oldFilename) removedFiles.push(oldFilename);
          }
        }
      } catch (error) {
        console.error("Gagal memproses gambar:", error);
        return res.status(400).json({ message: "Foto tidak dapat diproses. Pastikan file gambar valid." });
      }

      const imageValue = imageSlots.join(",");
      db.query(`SHOW COLUMNS FROM ${config.table}`, (schemaError, schemaRows) => {
        if (schemaError) {
          newFiles.forEach((filename) => fs.promises.unlink(path.join(uploadDirectory, filename)).catch(() => {}));
          return res.status(500).json({ message: "Gagal membaca skema tabel konten." });
        }
        const availableColumns = new Set(schemaRows.map((column) => column.Field));
        const updateFields = config.fields.filter((field) => availableColumns.has(field));
        const columns = [...updateFields, "gambar"];
        const values = [...updateFields.map((field) => data[field]), imageValue, req.params.id];
        db.query(
          `UPDATE ${config.table} SET ${columns.map((column) => `${column} = ?`).join(", ")} WHERE ${config.id} = ?`,
          values,
          (updateError) => {
            if (updateError) {
              newFiles.forEach((filename) => fs.promises.unlink(path.join(uploadDirectory, filename)).catch(() => {}));
              console.error(`Gagal memperbarui ${req.params.type}:`, updateError);
              return res.status(500).json({ message: "Gagal memperbarui data. Periksa kembali skema tabel." });
            }
            removedFiles.forEach((filename) => fs.promises.unlink(path.join(uploadDirectory, filename)).catch(() => {}));
            const warning = availableColumns.has("judul") ? undefined : "Kolom judul belum tersedia; perubahan judul tidak disimpan.";
            return res.json({ id: req.params.id, message: "Data berhasil diperbarui.", warning });
          },
        );
      });
    });
  });
});

app.delete("/api/content/:type/:id", requireAdmin, (req, res) => {
  const config = contentTypes[req.params.type];
  if (!config) return res.status(404).json({ message: "Jenis konten tidak ditemukan." });

  db.query(`SELECT gambar FROM ${config.table} WHERE ${config.id} = ? LIMIT 1`, [req.params.id], (findError, rows) => {
    if (findError) return res.status(500).json({ message: "Gagal membaca data konten." });
    if (!rows.length) return res.status(404).json({ message: "Konten tidak ditemukan." });

    const filenames = rows[0].gambar ? String(rows[0].gambar).split(",").filter(Boolean) : [];
    db.query(`DELETE FROM ${config.table} WHERE ${config.id} = ?`, [req.params.id], (deleteError) => {
      if (deleteError) return res.status(500).json({ message: "Gagal menghapus data konten." });
      filenames.forEach((filename) => fs.promises.unlink(path.join(uploadDirectory, filename)).catch(() => {}));
      return res.json({ message: "Data berhasil dihapus." });
    });
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running",
  });
});

app.get("/api/admin", (req, res) => {
  const sql = "SELECT id_akun AS id, username, aktif FROM akun";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
      });
    }

    res.json(result);
  });
});

app.get("/api/admin/session", (req, res) => {
  if (!req.session.admin) {
    return res.status(200).json({ authenticated: false, admin: null });
  }
  return res.json({ authenticated: true, admin: req.session.admin });
});

app.post("/api/admin/logout", requireAdmin, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("mts_admin_session", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.json({ message: "Logout berhasil." });
  });
});

app.post("/api/admin/login", (req, res) => {
  const username = typeof req.body?.username === "string" ? req.body.username.trim() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password wajib diisi." });
  }

  const sql = "SELECT id_akun, username, hash_password, aktif FROM akun WHERE username = ? LIMIT 1";
  db.query(sql, [username], async (err, result) => {
    if (err) {
      console.error("Gagal mengambil data admin:", err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }

    const admin = result[0];
    if (!admin) {
      return res.status(401).json({ message: "Username atau password salah." });
    }

    try {
      const passwordMatches = await bcrypt.compare(password, admin.hash_password || "");
      if (!passwordMatches) {
        return res.status(401).json({ message: "Username atau password salah." });
      }

      if (admin.aktif === "0" || admin.aktif === 0) {
        return res.status(403).json({ message: "Akun admin tidak aktif." });
      }

      req.session.regenerate((sessionError) => {
        if (sessionError) {
          console.error("Gagal membuat sesi admin:", sessionError);
          return res.status(500).json({ message: "Gagal membuat sesi login." });
        }

        req.session.admin = { id: admin.id_akun, username: admin.username };
        req.session.save((saveError) => {
          if (saveError) {
            console.error("Gagal menyimpan sesi admin:", saveError);
            return res.status(500).json({ message: "Gagal menyimpan sesi login." });
          }
          return res.json({
            message: "Login berhasil.",
            admin: req.session.admin,
          });
        });
      });
    } catch (compareError) {
      console.error("Gagal memverifikasi password admin:", compareError);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
