import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeveloperDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
