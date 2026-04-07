import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    async create(createUserDto: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        try {
            return await this.usersRepository.save(user);
        } catch (err) {
            throw new ConflictException(
                'Username/email already in use. Try again with a different one',
            );
        }
    }

    async findAll() {
        return this.usersRepository.find();
    }

    async findOne(id: number) {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    async findByEmail(email: string) {
        return await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'role'],
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) throw new NotFoundException('User not found');

        if (updateUserDto.username) {
            const existingUsername = await this.usersRepository.findOne({
                where: { username: updateUserDto.username, id: Not(id) },
            });

            if (existingUsername)
                throw new BadRequestException('Username already in use');
        }

        if (updateUserDto.email) {
            const existingEmail = await this.usersRepository.findOne({
                where: { email: updateUserDto.email, id: Not(id) },
            });

            if (existingEmail)
                throw new BadRequestException('Email already in use');
        }

        Object.assign(user, updateUserDto);
        try {
            await this.usersRepository.save(user);
        } catch (err) {
            throw new BadRequestException(
                'Duplicated field value. One of the fields you informed is already in use.',
            );
        }
        return 'User updated successfully.';
    }

    async remove(id: number) {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) throw new NotFoundException('User not found');
        return await this.usersRepository.delete(id);
    }
}
