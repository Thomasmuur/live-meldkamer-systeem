import {Controller, Get} from '@nestjs/common';
import {AppService} from "./app.service";
import {AppVersion} from "@lms/models";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('version')
    public getApiVersion(): AppVersion {
        return {
            version: this.appService.getApiVersion(),
        };
    }

}
