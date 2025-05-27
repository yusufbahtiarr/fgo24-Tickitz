export function isEmailExists(data, email) {
  return data.filter((user) => user.email === email).length > 0;
}

export function comparePassword(base64encoded, password) {
  if (window.atob(base64encoded) === password) {
    return true;
  } else {
    return false;
  }
}
