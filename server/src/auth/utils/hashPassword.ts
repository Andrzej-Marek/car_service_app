import * as bcrypt from 'bcryptjs';

export const hashPassword = (
  password: string,
  salt: string,
): Promise<string> => {
  return bcrypt.hash(password, salt);
};
