import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './database/entities/user/user.module';
import { TypeORMSession } from './database/entities/session.entity';
import { DatabaseModule } from './database/database.module';
import { join } from 'path';
// import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { ConfigModule } from './config/config.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';
import { HealthModule } from './health/health.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule, // Config that uses yaml
    CacheModule.register({
      isGlobal: true,
    }), // Cache manager
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../frontend/dist'),
      exclude: ['/api*', '/auth*', '/admin*', '/health*'],
    }), // Serve the frontend
    ScheduleModule.forRoot(), // Module that powers the cron jobs
    DatabaseModule, // Everything related to the database
    LoggerModule, // Logger
    AuthModule, // Authentication endpoints and strategies
    // AdminPanelModule, // Old admin panel
    CronModule, // Cron jobs
    HealthModule, // Health check
    PassportModule,
    

    // Entities and their modules --
    UserModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    TypeORMSession,
  ],
})
export class AppModule {}
