import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Developer } from './entities/developer.entity';
import { DatabaseErrorHandler } from '../common/errors/database-error.handler';

@Injectable()
export class DevelopersService {
    constructor(
        @InjectRepository(Developer)
        private developerRepository: Repository<Developer>,
        private databaseErrorHandler: DatabaseErrorHandler,
    ) {}

    async create(createDeveloperDto: CreateDeveloperDto) {
        try {
            const savedDeveloper =
                await this.developerRepository.save(createDeveloperDto);
            return savedDeveloper;
        } catch (err) {
            this.databaseErrorHandler.handle(err, 'developer');
        }
    }

    async findAll() {
        const developers = await this.developerRepository.find({
            relations: ['games'],
        });

        return developers.map((developer) => ({
            ...developer,
            games: developer.games.map((game) => game.name),
        }));
    }

    async findOne(id: number) {
        const developer = await this.developerRepository.findOne({
            where: { id },
            relations: ['games'],
        });

        if (!developer) throw new NotFoundException('Developer not found');

        return {
            ...developer,
            games: developer.games.map((game) => game.name),
        };
    }

    async update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
        const developer = await this.developerRepository.findOneBy({ id });

        if (!developer) throw new NotFoundException('Developer not found');

        Object.assign(developer, updateDeveloperDto);
        try {
            await this.developerRepository.save(developer);
        } catch (err) {
            this.databaseErrorHandler.handle(err, 'developer');
        }
        return developer;
    }

    async remove(id: number) {
        const developer = await this.developerRepository.findOne({
            where: { id },
            relations: ['games'],
        });

        if (!developer) throw new NotFoundException('Developer not found');

        try {
            await this.developerRepository.delete(id);
            return {
                message: `Developer (ID: ${developer.id}) deleted successfully.`,
            };
        } catch (err) {
            this.databaseErrorHandler.handle(err, 'developer');
        }
    }
}
