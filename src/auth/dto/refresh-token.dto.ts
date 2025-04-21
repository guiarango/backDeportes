import { IsMongoId, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsMongoId()
  tokenId: string;

  @IsString()
  token: string;
}
