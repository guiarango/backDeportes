import { JsonResponse } from '../../common/interfaces/json-response.interface';

export interface FilesAdapter {
  uploadFile: (file: Express.Multer.File) => Promise<JsonResponse<Object>>;
  getFileUrl(fileName: string): Promise<JsonResponse<Object>>;
  deleteFile(fileName: string): Promise<JsonResponse<Object>>;
}
