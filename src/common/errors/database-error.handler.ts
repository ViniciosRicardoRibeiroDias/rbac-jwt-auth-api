import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';

type EntityName = 'developer' | 'game' | 'resource';

@Injectable()
export class DatabaseErrorHandler {
    public handle(err: any, entityName: EntityName = 'resource'): never {
        if (err.code == 23505)
            throw new ConflictException(
                `A ${entityName} with this name already exists. Try again with a different name.`,
            );
        if (err.code == 23001)
            throw new ConflictException(
                `This ${entityName} can't be deleted because it has related entities`,
            );
        console.log(err);
        throw new InternalServerErrorException('é aqui que ta batendo');
    }
}
