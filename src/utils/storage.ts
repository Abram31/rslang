export function setStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getStorage(value: string) {
  return localStorage.getItem(value);
}
