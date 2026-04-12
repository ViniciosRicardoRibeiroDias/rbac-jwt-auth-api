import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Roles } from '../users/user-roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Post()
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard)
    create(@Body() createGameDto: CreateGameDto) {
        return this.gamesService.create(createGameDto);
    }

    @Get()
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.gamesService.findAll();
    }

    @Get(':id')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.gamesService.findOne(+id);
    }

    @Patch(':id')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
        return this.gamesService.update(+id, updateGameDto);
    }

    @Delete(':id')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.gamesService.remove(+id);
    }
}
