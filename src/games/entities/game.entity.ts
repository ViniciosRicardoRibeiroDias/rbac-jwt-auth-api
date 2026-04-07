import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Developer } from '../../developers/entities/developer.entity';

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column('date', { name: 'release_date' })
    releaseDate: Date;

    @ManyToOne(() => Developer, (developer) => developer.games, {
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'developer_id' })
    developer: Developer;
}
