import { Module } from '@nestjs/common';
import { DatabaseErrorHandler } from './errors/database-error.handler';

@Module({
    providers: [DatabaseErrorHandler],
    exports: [DatabaseErrorHandler],
})
export class CommonModule {}
