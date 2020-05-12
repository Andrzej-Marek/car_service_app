import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Logger, BadRequestException } from '@nestjs/common';

export const fileUpload = async (file: FileUpload) => {
  const { createReadStream, filename } = file;
  const randomName = await uuidv4();
  const fileName = `${randomName}${filename}`;
  const uploadFileStatus: Promise<boolean> = new Promise(
    async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/images/${fileName}`))
        .on('finish', () => resolve(true))
        .on('error', () => {
          Logger.error(`Error with uploadfile filename: ${filename}`);
          reject(false);
        }),
  );

  if (!uploadFileStatus) {
    Logger.error('Error during image upload at fileUpload function');
    throw new BadRequestException();
  }

  return `/images/${fileName}`;
};
