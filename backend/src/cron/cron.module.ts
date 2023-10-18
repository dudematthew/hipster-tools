import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CronService } from './cron.service';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        CronService,
    ],
    exports: [
        CronService,
    ]
})
export class CronModule {}
