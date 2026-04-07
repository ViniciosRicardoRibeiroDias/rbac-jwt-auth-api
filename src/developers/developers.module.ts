import { Module } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { DevelopersController } from './developers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [TypeOrmModule.forFeature([Developer]), CommonModule],
    controllers: [DevelopersController],
    providers: [DevelopersService],
})
export class DevelopersModule {}
