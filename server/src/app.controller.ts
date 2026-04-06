import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompressionService } from './compression/compression.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompressedImage } from './image.entity';

@Controller('images') // All routes will start with /images
export class AppController {
  constructor(
      private readonly compressionService: CompressionService,
      @InjectRepository(CompressedImage)
      private imageRepo: Repository<CompressedImage>,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // 1. Check if the file actually arrived (ALWAYS do this first)
    if (!file) {
      console.error('❌ No file found in the request!');
      return { error: 'No file uploaded' };
    }

    console.log('--- New Upload Request ---');
    console.log('File received:', file.originalname);
    console.log('Original Size:', file.size);

    try {
      // 2. Send to FastAPI for compression
      const compressedBuffer = await this.compressionService.sendToFastApi(file);
      console.log('✅ Received from FastAPI. New size:', compressedBuffer.length);

      // 3. Save metadata to PostgreSQL
      const newImage = this.imageRepo.create({
        originalName: file.originalname,
        originalSize: file.size,
        compressedSize: compressedBuffer.length,
      });
      const saved = await this.imageRepo.save(newImage);
      console.log('💾 Saved to Database with ID:', saved.id);

      // 4. Return results
      return {
        message: 'Compression successful!',
        originalSize: file.size,
        compressedSize: compressedBuffer.length,
        data: compressedBuffer.toString('base64'),
      };
    } catch (error) {
      console.error('❌ Error during processing:', error.message);
      return { error: 'Compression failed', details: error.message };
    }
  };
}