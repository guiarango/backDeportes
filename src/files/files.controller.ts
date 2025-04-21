import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from './helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('user-image')
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  uploadUserImage(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.upload(file);
  }

  @Get(':fileName')
  getFile(@Param('fileName') fileName: string) {
    return this.filesService.getImageUrl(fileName);
  }

  @Delete(':fileName')
  deleteFile(@Param('fileName') fileName: string) {
    return this.filesService.deleteImage(fileName);
  }
}
