import { JsonResponse } from '../../common/interfaces/json-response.interface';

export interface FileStorageAdapter {
  saveImage(
    fileName: string,
    file: Express.Multer.File,
  ): Promise<JsonResponse<Object>>;
  returnSignedUrl(
    fileName: string,
    file: Express.Multer.File,
  ): Promise<JsonResponse<Object>>;
  deleteFile(fileName: string): Promise<JsonResponse<Object>>;
}
