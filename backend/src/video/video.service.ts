import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AIService } from 'src/ai/ai.service';
import { MCQResult } from 'src/models/mcq.interface';
import { Video, VideoDocument } from './models/video.schema';
import { title } from 'process';

@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name);

  constructor(
    private readonly aiService: AIService,
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
  ) {}

  async handleVideoUpload(filePath: string, filename: string) {
    const startTime = Date.now();
    this.logger.log(`Starting video processing for file: ${filename}`);

    try {
      // Step 1: Transcribe video
      const transcript = await this.aiService.transcribe(filePath);
      this.logger.log(`Transcript length: ${transcript.length} characters`);

      // Step 2: Split transcript into chunks
      const segments = this.splitTranscript(transcript);
      this.logger.log(`Transcript split into ${segments.length} segments`);

      // Step 3: Generate MCQs
      const mcqResults: MCQResult[] = [];
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        this.logger.log(`Generating MCQs for segment ${i + 1}/${segments.length}`);
        const mcqs = await this.aiService.generateMCQs(segment);
        mcqResults.push({ segment, mcqs });
      }

      // Step 4: Save to MongoDB
      const savedDocument = await this.videoModel.create({
        filename,
        title,
        transcript,
        mcqResults,
      });

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      this.logger.log(`Processing complete for: ${filename} (Duration: ${duration}s)`);

      return savedDocument;
    } catch (error) {
      this.logger.error(`Error processing video ${filename}: ${error.message}`, error.stack);
      throw error;
    }
  }

  private splitTranscript(text: string): string[] {
    return text.match(/(.|[\r\n]){1,4000}/g) || [];
  }

  async getQuizSummaries() {
    const videos = await this.videoModel.find().exec();

    return videos.map((video) => ({
      id: video._id,
      topic: video.filename || 'Untitled Quiz',
      segments: video.mcqResults?.length || 0,
      mcqs: video.mcqResults?.reduce((acc, seg) => acc + (seg.mcqs?.length || 0), 0),
    }));
  }

  async getQuizDetails(id: string) {
    return this.videoModel.findById(id).exec();
  }
}
