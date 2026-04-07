import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const secretOrKey = configService.get<string>('JWT_SECRET');

        if (!secretOrKey) throw new Error('JWT_SECRET is not defined');

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretOrKey,
        });
    }

    validate(payload: any) {
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
        };
    }
}
