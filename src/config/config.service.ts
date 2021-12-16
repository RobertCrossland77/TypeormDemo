import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    static get(key: string): string {
        return process.env[key];
    }
}