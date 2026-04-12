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
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Roles } from '../users/user-roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('developers')
export class DevelopersController {
    constructor(private readonly developersService: DevelopersService) {}

    @Post()
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard)
    create(@Body() createDeveloperDto: CreateDeveloperDto) {
        return this.developersService.create(createDeveloperDto);
    }

    @Get()
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.developersService.findAll();
    }

    @Get(':id')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.developersService.findOne(+id);
    }

    @Patch(':id')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard)
    async update(
        @Param('id') id: string,
        @Body() updateDeveloperDto: UpdateDeveloperDto,
    ) {
        return await this.developersService.update(+id, updateDeveloperDto);
    }

    @Delete(':id')
    @Roles(UserRole.USER)
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string) {
        await this.developersService.remove(+id);
        return 'Developer Removed Successfully';
    }
}
