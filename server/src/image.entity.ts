import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class CompressedImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalName: string;

    @Column()
    originalSize: number;

    @Column({ nullable: true })
    compressedSize: number;

    @CreateDateColumn()
    createdAt: Date;
}