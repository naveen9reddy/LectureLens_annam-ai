// src/video/video.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema({ strict: false }) // Allow extra fields just in case
export class Video {
  @Prop()
  filename: string;

  @Prop()
  title: string;
  

  @Prop()
  transcript: string;

  @Prop({ type: Array })
  mcqResults: {
    segment: string;
    mcqs: {
      question: string;
      options: string[];
      answer: string;
    }[];
  }[];
}

export const VideoSchema = SchemaFactory.createForClass(Video);
