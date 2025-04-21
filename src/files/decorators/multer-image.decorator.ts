import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export const MulterFile = (
  fileField: string,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: Function,
  ) => Function,
) => {
  UseInterceptors(
    FileInterceptor(fileField, {
      fileFilter: fileFilter,
      // limits:{fileSize:1000},
    }),

    //Add FileNamer.helper
  );
};
