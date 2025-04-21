import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  S3Client,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FileStorageAdapter } from '../interfaces/files-storage.adapter';
import { JsonResponse } from 'src/common/interfaces/json-response.interface';

@Injectable()
export class AwsS3Adapter implements FileStorageAdapter {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow(
        'AWS_S3_SECRET_ACCESS_KEY',
      ),
    },
  });

  private readonly bucketName = this.configService.getOrThrow('AWS_BUCKET');

  constructor(private readonly configService: ConfigService) {}

  async saveImage(
    fileName: string,
    file: Express.Multer.File,
  ): Promise<JsonResponse> {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
          Body: file.buffer,
          ACL: 'private',
        }),
      );

      return { ok: true, status: 200, message: 'File saved succesfully' };
    } catch (error) {
      this.handleError(error);
    }
  }

  async returnSignedUrl(fileName: string): Promise<JsonResponse<Object>> {
    try {
      // First check if the file exists
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
        }),
      );

      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });

      return {
        ok: true,
        status: 200,
        message: 'ssecureUrl generated succesfully',
        data: { secureUrl: signedUrl },
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteFile(fileName: string): Promise<JsonResponse> {
    try {
      // First check if the file exists
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
        }),
      );

      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
        }),
      );

      return {
        ok: true,
        status: 200,
        message: 'File deleted succesfully',
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    if (error.$metadata.httpStatusCode === 404)
      throw new BadRequestException("The File doesn't exist on the repository");

    console.log(error);
    throw new InternalServerErrorException(`Please check server logs`);
  }
}
