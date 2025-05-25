import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoController } from './video/video.controller';
import { VideoService } from './video/video.service';
import { AIService } from './ai/ai.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './video/models/video.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/video-transcriber'),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  controllers: [AppController, VideoController],
  providers: [AppService, VideoService, AIService],
})
export class AppModule {}
