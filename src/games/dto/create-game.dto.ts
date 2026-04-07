import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    readonly developerId: number;
}
