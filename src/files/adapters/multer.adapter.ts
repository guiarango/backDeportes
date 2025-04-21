import { Injectable } from '@nestjs/common';
import { fileNamer } from '../helpers';
import { FilesAdapter } from '../interfaces/files-adapter.interface';
import { AwsS3Adapter } from './s3-aws.adapter';
import { JsonResponse } from 'src/common/interfaces/json-response.interface';

@Injectable()
export class MulterAdapter implements FilesAdapter {
  constructor(private readonly storage: AwsS3Adapter) {}
  async uploadFile(file: Express.Multer.File): Promise<JsonResponse<Object>> {
    return await this.storage.saveImage(fileNamer(file), file);
  }
  async getFileUrl(fileName: string): Promise<JsonResponse<Object>> {
    return await this.storage.returnSignedUrl(fileName);
  }

  async deleteFile(fileName: string): Promise<JsonResponse<Object>> {
    return await this.storage.deleteFile(fileName);
  }
}
