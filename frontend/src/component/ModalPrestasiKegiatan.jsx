import { useState } from "react";
import { X, Upload, ImagePlus } from "lucide-react";

const emptyForm = { tanggal: "", judul: "", isi: "", deskripsi: "", status_publikasi: "Draft", juara: "", tingkat: "" };

export default function ModalPrestasiKegiatan({ tipe, isOpen, onClose, onCreated, initialData = null }) {
  const isEditing = Boolean(initialData);
  const [form, setForm] = useState(() => initialData ? {
    ...emptyForm,
    tanggal: String(initialData.tanggal || "").slice(0, 10),
    judul: initialData.judul || initialData.isi || "",
    isi: initialData.isi || "",
    deskripsi: initialData.deskripsi || "",
    status_publikasi: initialData.status_publikasi || "Draft",
    juara: initialData.juara ?? "",
    tingkat: initialData.tingkat || "",
  } : emptyForm);
  const [files, setFiles] = useState([null, null, null]);
  const [removeCurrentPhoto, setRemoveCurrentPhoto] = useState([false, false, false]);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const isPrestasi = tipe === "prestasi";

  if (!isOpen) return null;

  async function submit(event) {
    event.preventDefault();
    setError("");
    setIsSaving(true);
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "juara" && key !== "tingkat" || isPrestasi) body.append(key, value);
    });
    files.forEach((file, index) => {
      if (file) body.append(`gambar${index + 1}`, file);
      if (removeCurrentPhoto[index]) body.append(`hapus_gambar${index + 1}`, "true");
    });
    try {
      const id = initialData?.id_prestasi || initialData?.id_kegiatan;
      const response = await fetch(isEditing ? `http://localhost:5000/api/content/${tipe}/${id}` : `http://localhost:5000/api/content/${tipe}`, {
        method: isEditing ? "PUT" : "POST",
        credentials: "include",
        body,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Data gagal disimpan.");
      await onCreated(result.id, form.status_publikasi, result.warning);
      onClose();
    } catch (submitError) {
      setError(submitError.message || "Tidak dapat terhubung ke server.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="modal-content-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Konten Sekolah</p>
            <h2 id="modal-content-title" className="mt-1 text-2xl font-bold text-gray-900">{isEditing ? "Edit" : "Tambah"} {isPrestasi ? "Prestasi" : "Kegiatan"}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup modal" className="rounded-full p-2 text-gray-500 hover:bg-gray-100"><X size={20} /></button>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">Tanggal
              <input required type="date" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </label>
            <label className="block text-sm font-medium text-gray-700">Status publikasi
              <select value={form.status_publikasi} onChange={(e) => setForm({ ...form, status_publikasi: e.target.value })} className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option value="Draft">Draft</option>
                <option value="Sudah Publikasi">Sudah Publikasi</option>
              </select>
            </label>
          </div>

          {isPrestasi && <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">Juara
              <input required type="number" min="1" step="1" value={form.juara} onChange={(e) => setForm({ ...form, juara: e.target.value })} placeholder="Contoh: 1" className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </label>
            <label className="block text-sm font-medium text-gray-700">Tingkat
              <select required value={form.tingkat} onChange={(e) => setForm({ ...form, tingkat: e.target.value })} className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                <option value="">Pilih tingkat</option><option value="kecamatan">Kecamatan</option><option value="kabupaten">Kabupaten</option><option value="provinsi">Provinsi</option><option value="nasional">Nasional</option>
              </select>
            </label>
          </div>}

          <label className="block text-sm font-medium text-gray-700">Judul
            <input required type="text" maxLength={200} value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} placeholder={isPrestasi ? "Masukkan judul prestasi" : "Masukkan judul kegiatan"} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>

          <label className="block text-sm font-medium text-gray-700">Isi
            <textarea required rows={isPrestasi ? 8 : 3} value={form.isi} onChange={(e) => setForm({ ...form, isi: e.target.value })} placeholder={isPrestasi ? "Tuliskan isi prestasi secara lengkap..." : "Tuliskan isi atau nama kegiatan..."} className="mt-1.5 w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>

          <label className="block text-sm font-medium text-gray-700">Deskripsi
            <textarea required rows={isPrestasi ? 3 : 5} value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} placeholder="Tambahkan deskripsi singkat..." className="mt-1.5 w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </label>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-gray-700">Foto (opsional, maksimal 3)</legend>
            {files.map((file, index) => {
              const currentImage = initialData?.gambar_list?.[index];
              const removed = removeCurrentPhoto[index];
              return <div key={index} className="rounded-lg border border-gray-200 p-3">
                <p className="mb-2 text-sm font-semibold text-gray-700">Foto {index + 1} <span className="font-normal text-gray-500">· Maks 8 MB</span></p>
                {isEditing && currentImage && !file && !removed && <img src={`http://localhost:5000/uploads/${currentImage}`} alt={`Foto ${index + 1} saat ini`} className="mb-3 h-32 w-full rounded-md object-cover" />}
                <div className="flex flex-col items-start gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-600 hover:border-primary">
                    <ImagePlus className="text-primary" size={20} />{file?.name || (removed ? "Foto akan dihapus" : currentImage ? "Ganti foto" : "Pilih foto")}
                    <input type="file" accept="image/*" className="sr-only" onChange={(event) => {
                      const selected = event.target.files?.[0] || null;
                      if (selected && selected.size > 8 * 1024 * 1024) {
                        setError(`Foto ${index + 1} melebihi batas ukuran 8 MB.`);
                        event.target.value = "";
                        return;
                      }
                      const nextFiles = [...files];
                      nextFiles[index] = selected;
                      setFiles(nextFiles);
                      const nextRemoved = [...removeCurrentPhoto];
                      nextRemoved[index] = false;
                      setRemoveCurrentPhoto(nextRemoved);
                      setError("");
                    }} />
                  </label>
                  {file && <button type="button" onClick={() => { const nextFiles = [...files]; nextFiles[index] = null; setFiles(nextFiles); }} className="rounded-lg px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-50">Hapus Foto</button>}
                  {!file && isEditing && currentImage && !removed && <button type="button" onClick={() => { const nextRemoved = [...removeCurrentPhoto]; nextRemoved[index] = true; setRemoveCurrentPhoto(nextRemoved); }} className="rounded-lg px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-50">Hapus Foto</button>}
                  {removed && <button type="button" onClick={() => { const nextRemoved = [...removeCurrentPhoto]; nextRemoved[index] = false; setRemoveCurrentPhoto(nextRemoved); }} className="rounded-lg px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/10">Batalkan hapus</button>}
                </div>
              </div>;
            })}
          </fieldset>

          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">Batal</button>
            <button type="submit" disabled={isSaving} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:brightness-110 disabled:opacity-60"><Upload size={17} />{isSaving ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Simpan"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
