import { Injectable } from '@nestjs/common'
import { ConfigService } from './config/config.service'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            url: ConfigService.get('DATABASE_URL'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            migrationsRun: false,
            synchronize: false,
            logging: ['error'],
        }
    }
}
