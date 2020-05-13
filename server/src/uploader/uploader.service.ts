import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { fileUpload } from 'src/utils/fileUpload';
import * as fs from 'fs';

@Injectable()
export class UploaderService {
  async uploadSingleImage(image: FileUpload): Promise<string> {
    try {
      const imageUrl = await fileUpload(image);
      return imageUrl;
    } catch (error) {
      Logger.error(`Error during uploadSingleImage uploader.service`);
      throw new BadRequestException();
    }
  }

  async removeSingleImage(imageUrl: string): Promise<boolean> {
    try {
      fs.unlinkSync(`uploads/${imageUrl}`);
      return true;
    } catch (err) {
      Logger.error(`Error during delete image path ${imageUrl}`);
      throw new NotFoundException();
    }
  }
}
