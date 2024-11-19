import Cryptr from "cryptr";
export function encrypt(text) {
  const secretkey = process.env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secretkey);

  const encryptedString = cryptr.encrypt(text);
  return encryptedString;
}
export function decrypt(encryptedString) {
  const secretkey = process.env.NEXTAUTH_SECRET;
  const cryptr = new Cryptr(secretkey);

  const text = cryptr.decrypt(encryptedString);
  return text;
}
