import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompressedImage } from './image.entity'; // 👈 1. Import it

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'png_compressor',
      entities: [CompressedImage], // 👈 2. Add it here
      synchronize: true, // ⚠️ This creates the table automatically
    }),
    TypeOrmModule.forFeature([CompressedImage]), // 👈 3. Register it for use
  ],
})
export class AppModule {}