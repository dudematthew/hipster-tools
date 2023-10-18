import { Inject, Injectable, Logger, forwardRef } from "@nestjs/common";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class CronService {

    private readonly logger = new Logger(CronService.name);

    private readonly timeZone = 'Europe/Warsaw';

    constructor (
        private readonly databaseService: DatabaseService,
        private readonly schedulerRegistry: SchedulerRegistry,
    ) {
        // ! Set timezone to Europe/Warsaw
        process.env.TZ = this.timeZone;

        this.init();
        this.logger.verbose(`CronService initialized. Timezone: ${console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)}`)
    }

    private async init () {
        this.logger.log('CronService initialized');
    }

    public getCronJob (name: string) {
        return this.schedulerRegistry.getCronJob(name);
    }

    public scheduleCronJob(
        name: string,
        cronExpression: string | Date,
        callback: () => void
    ): CronJob {
        const cronJob = new CronJob(cronExpression, callback, undefined, false, this.timeZone);

        this.schedulerRegistry.addCronJob(name, cronJob);

        cronJob.start();

        this.logger.log(`Scheduled cron job '${name}' with expression '${cronExpression} to run at '${cronJob.nextDates()}'`);
        
        return cronJob;
    }
    

    // Schedule a cron job to run every hour
    // TODO: Change this to run every 6 hours
    // @Cron('0 0 * * * *', {
    //     name: 'updateConnectedRoles',
    //     timeZone: 'Europe/Warsaw',
    // }) // At 00:00:00am every day
    // public async updateConnectedRoles () {
    //     this.logger.log('updateConnectedRoles started working...');

    //     await this.apexSyncService.updateConnectedRoles();
    // }

}