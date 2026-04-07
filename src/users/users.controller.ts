import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/public.decorator';
import { Roles } from './user-roles.decorator';
import { UserRole } from './enums/user-role.enum';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @Public()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Roles(UserRole.ADMIN)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @Roles(UserRole.USER)
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.usersService.update(+id, updateUserDto);
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.usersService.remove(+id);
        return `User (id: ${id}) deleted successfully`;
    }
}
