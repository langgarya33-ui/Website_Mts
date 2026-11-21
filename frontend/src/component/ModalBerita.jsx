import { useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";

export default function ModalBerita({ isOpen, onClose, onCreated, initialData = null }) {
  const isEditing = Boolean(initialData);
  const [form, setForm] = useState(() => initialData ? {
    tanggal: String(initialData.tanggal || "").slice(0, 10),
    judul: initialData.judul || initialData.isi || "",
    isi: initialData.isi || "",
    deskripsi: initialData.deskripsi || "",
    status_publikasi: initialData.status_publikasi || "Draft",
  } : { tanggal: "", judul: "", isi: "", deskripsi: "", status_publikasi: "Draft" });
  const [file, setFile] = useState(null);
  const [removeCurrentPhoto, setRemoveCurrentPhoto] = useState(false);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  async function submit(event) {
    event.preventDefault(); setError("");
    setIsSaving(true);
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    if (file) body.append("gambar1", file);
    if (removeCurrentPhoto) body.append("hapus_gambar1", "true");
    try {
      const url = isEditing ? `http://localhost:5000/api/content/berita/${initialData.id_berita}` : "http://localhost:5000/api/content/berita";
      const response = await fetch(url, { method: isEditing ? "PUT" : "POST", credentials: "include", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Berita gagal disimpan.");
      await onCreated(result.id, form.status_publikasi, result.warning);
      onClose();
    } catch (submitError) { setError(submitError.message || "Tidak dapat terhubung ke server."); }
    finally { setIsSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="modal-berita-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div><p className="text-sm font-semibold uppercase tracking-wide text-primary">Konten Sekolah</p><h2 id="modal-berita-title" className="mt-1 text-2xl font-bold">{isEditing ? "Edit Berita" : "Tambah Berita"}</h2></div>
          <button type="button" onClick={onClose} aria-label="Tutup modal" className="rounded-full p-2 text-gray-500 hover:bg-gray-100"><X size={20} /></button>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">Tanggal<input required type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
            <label className="block text-sm font-medium text-gray-700">Status publikasi<select value={form.status_publikasi} onChange={(e) => setForm({ ...form, status_publikasi: e.target.value })} className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"><option>Draft</option><option>Sudah Publikasi</option></select></label>
          </div>
          <label className="block text-sm font-medium text-gray-700">Judul<input required type="text" maxLength={200} value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} placeholder="Masukkan judul berita" className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <label className="block text-sm font-medium text-gray-700">Isi berita<textarea required rows={8} value={form.isi} onChange={(e) => setForm({ ...form, isi: e.target.value })} placeholder="Tuliskan isi berita..." className="mt-1.5 w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <label className="block text-sm font-medium text-gray-700">Deskripsi<textarea required rows={3} value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} placeholder="Tambahkan deskripsi singkat..." className="mt-1.5 w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <div className="block text-sm font-medium text-gray-700">
            <p>Foto (opsional, maksimal 1)</p>
            <div className="mt-2 rounded-lg border border-gray-200 p-3">
              {isEditing && initialData.gambar_list?.[0] && !file && !removeCurrentPhoto && <img src={`http://localhost:5000/uploads/${initialData.gambar_list[0]}`} alt="Foto berita saat ini" className="mb-3 h-32 w-full rounded-md object-cover" />}
              <p className="mb-2 text-sm font-semibold text-gray-700">Foto 1 <span className="font-normal text-gray-500">· Maks 8 MB</span></p>
              <div className="flex flex-col items-start gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-primary">
                  <ImagePlus className="text-primary" size={20} />{file?.name || (removeCurrentPhoto ? "Foto akan dihapus" : "Pilih foto")}
                  <input type="file" accept="image/*" className="sr-only" onChange={(event) => {
                    const selected = event.target.files?.[0] || null;
                    if (selected && selected.size > 8 * 1024 * 1024) {
                      setError("Foto 1 melebihi batas ukuran 8 MB.");
                      event.target.value = "";
                      return;
                    }
                    setFile(selected);
                    setRemoveCurrentPhoto(false);
                    setError("");
                  }} />
                </label>
                {file && <button type="button" onClick={() => setFile(null)} className="rounded-lg px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-50">Hapus Foto</button>}
                {!file && isEditing && initialData.gambar_list?.[0] && !removeCurrentPhoto && <button type="button" onClick={() => setRemoveCurrentPhoto(true)} className="rounded-lg px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-50">Hapus Foto</button>}
                {removeCurrentPhoto && <button type="button" onClick={() => setRemoveCurrentPhoto(false)} className="rounded-lg px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/10">Batalkan hapus</button>}
              </div>
            </div>
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5"><button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">Batal</button><button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:brightness-110 disabled:opacity-60"><Upload size={17} />{isSaving ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Simpan"}</button></div>
        </form>
      </section>
    </div>
  );
}
