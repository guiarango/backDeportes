import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Sport extends Document {
  @Prop({ isRequired: true, unique: true, index: true })
  name: string;
  @Prop({ isRequired: true })
  description: string;
  @Prop({ isRequired: true })
  history: string;
}

export const SportSchema = SchemaFactory.createForClass(Sport);
