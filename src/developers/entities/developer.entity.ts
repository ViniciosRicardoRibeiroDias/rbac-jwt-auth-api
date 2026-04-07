import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../../games/entities/game.entity';

@Entity()
export class Developer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Game, (game) => game.developer)
    games: Game[];
}
