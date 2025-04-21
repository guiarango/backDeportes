import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema()
export class RefreshToken extends Document {
  @Prop({})
  userId: string;
  @Prop({})
  token: string;
  @Prop({})
  createdAt: string;
  @Prop({})
  expiresAt?: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
