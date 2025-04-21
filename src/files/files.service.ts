import { Injectable } from '@nestjs/common';
import { MulterAdapter } from './adapters/multer.adapter';

@Injectable()
export class FilesService {
  constructor(private readonly filesManager: MulterAdapter) {}
  async upload(file: Express.Multer.File) {
    return await this.filesManager.uploadFile(file);
  }

  async getImageUrl(fileName: string) {
    return await this.filesManager.getFileUrl(fileName);
  }

  async deleteImage(fileName: string) {
    return await this.filesManager.deleteFile(fileName);
  }
}
