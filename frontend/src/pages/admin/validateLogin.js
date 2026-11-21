export function validateLogin({ username, password }) {
  if (!username?.trim()) return "Username wajib diisi.";
  if (!password) return "Password wajib diisi.";
  return "";
}
