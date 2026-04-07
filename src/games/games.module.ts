import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Developer } from '../developers/entities/developer.entity';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [TypeOrmModule.forFeature([Game, Developer]), CommonModule],
    controllers: [GamesController],
    providers: [GamesService],
})
export class GamesModule {}
