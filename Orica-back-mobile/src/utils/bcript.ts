import * as bcrypt from 'bcrypt';

const salt = 10;

export function encodePassword(rawPassword: string) {
  return bcrypt.hash(rawPassword, salt);
}
