import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Logger, BadRequestException } from '@nestjs/common';
import { UploadFolders } from 'src/enums';
import { v4 as uuidv4 } from 'uuid';

export const fileUpload = async (
  file: FileUpload,
  subFolder = UploadFolders.IMAGES,
) => {
  const { createReadStream, filename } = file;
  const randomName = await uuidv4();
  const fileName = `${randomName}${filename}`;
  const uploadFileStatus: Promise<boolean> = new Promise(
    async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${subFolder}/${fileName}`))
        .on('finish', () => resolve(true))
        .on('error', () => {
          Logger.error(
            `fileUpload: Error with upload file filename: ${filename}`,
          );
          reject(false);
          throw new BadRequestException();
        }),
  );

  if (!uploadFileStatus) {
    Logger.error('Error during image upload at fileUpload function');
    throw new BadRequestException();
  }

  return `/${subFolder}/${fileName}`;
};
