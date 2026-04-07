import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from '../developers/entities/developer.entity';
import { DatabaseErrorHandler } from '../common/errors/database-error.handler';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        @InjectRepository(Developer)
        private developersRepository: Repository<Developer>,
        private databaseErrorHandler: DatabaseErrorHandler,
    ) {}

    async create(createGameDto: CreateGameDto) {
        const developer = await this.developersRepository.findOneBy({
            id: createGameDto.developerId,
        });

        if (!developer) throw new NotFoundException('Developer not found');

        const game = this.gamesRepository.create({
            ...createGameDto,
            developer,
        });

        try {
            return await this.gamesRepository.save(game);
        } catch (err) {
            this.databaseErrorHandler.handle(err, 'game');
        }
    }

    async findAll() {
        const games = await this.gamesRepository.find({
            relations: ['developer'],
        });

        return games.map((game) => ({
            id: game.id,
            name: game.name,
            releaseDate: game.releaseDate,
            developer: { name: game.developer.name },
        }));
    }

    async findOne(id: number) {
        const game = await this.gamesRepository.findOne({
            relations: ['developer'],
            where: { id },
        });

        if (!game) throw new NotFoundException('Game not found');

        return {
            id: game.id,
            name: game.name,
            releaseDate: game.releaseDate,
            developer: { name: game.developer.name },
        };
    }

    async update(id: number, updateGameDto: UpdateGameDto) {
        const game = await this.gamesRepository.findOneBy({ id });

        if (!game) throw new NotFoundException('Game not found');

        if (updateGameDto.developerId) {
            const developer = await this.developersRepository.findOneBy({
                id: updateGameDto.developerId,
            });

            if (!developer) throw new NotFoundException('Developer not found');

            game.developer = developer;
        }

        Object.assign(game, updateGameDto);

        try {
            await this.gamesRepository.save(game);
        } catch (err) {
            this.databaseErrorHandler.handle(err);
        }
        return game;
    }

    async remove(id: number) {
        const game = await this.gamesRepository.findOneBy({ id });

        if (!game) throw new NotFoundException('Game not found');

        await this.gamesRepository.delete(id);

        return {
            message: `Game (ID: ${game.id}) deleted successfully.`,
        };
    }
}
