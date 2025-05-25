import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
    InternalServerErrorException,
    Logger,
    Get,
    Param,
    NotFoundException,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { ApiConsumes, ApiBody } from '@nestjs/swagger';
  import { VideoService } from './video.service';
  
  @Controller('video')
  export class VideoController {
    private readonly logger = new Logger(VideoController.name);
  
    constructor(private readonly videoService: VideoService) {}
  
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            callback(null, uniqueName);
          },
        }),
      }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
          title: { type: 'string' },
        },
      },
    })
    async uploadVideo(@UploadedFile() file: Express.Multer.File) {
      if (!file) {
        this.logger.error('File not found in upload request');
        throw new BadRequestException('File not found in request');
      }
  
      this.logger.log(`Received file: ${file.originalname}, saved as ${file.filename}`);
  
      try {
        const savedVideo = await this.videoService.handleVideoUpload(file.path, file.originalname);
        this.logger.log(`Video processed and saved with id: ${savedVideo._id}`);
        return {
          message: 'Video uploaded and processed successfully',
          data: savedVideo,
        };
      } catch (error) {
        this.logger.error(`Error processing video: ${error.message}`, error.stack);
        throw new InternalServerErrorException('Failed to process video');
      }
    }

 
  @Get('quizzes')
  async getQuizzes() {
  const quizzes = await this.videoService.getQuizSummaries();
  if (!quizzes || quizzes.length === 0) {
    throw new NotFoundException('No quizzes found');
  }
  return quizzes;
  }

  @Get('quiz/:id')
async getQuizDetails(@Param('id') id: string) {
  const quiz = await this.videoService.getQuizDetails(id);
  if (!quiz) {
    throw new NotFoundException(`Quiz with id ${id} not found`);
  }
  return quiz;
}


  }
  