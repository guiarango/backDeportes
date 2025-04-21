import { Request } from 'express';

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];

  const validExtensions = ['png', 'jpg', 'jpeg'];

  if (!validExtensions.includes(fileExtension))
    return callback(
      new Error('Extension type must be: [".png",".jpg",".jpeg"]'),
      false,
    );

  callback(null, true);
};
