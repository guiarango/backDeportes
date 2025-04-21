import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterAdapter } from './adapters/multer.adapter';
import { AwsS3Adapter } from './adapters/s3-aws.adapter';

@Module({
  controllers: [FilesController],
  providers: [FilesService, MulterAdapter, AwsS3Adapter],
  exports: [MulterAdapter],
})
export class FilesModule {}
