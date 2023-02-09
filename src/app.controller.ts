import { Controller, Inject, Post, Body, Get , Req, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import {ClientProxy} from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly client: ClientProxy,
    private readonly appService: AppService
  ) {}

  //{"pattern":"sum","data":[0,3,35],"id":"ce51ebd3-32b1-4ae6-b7ef-e018126c4cc4"}
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('getManipolatedName')
  async getManipolatedName(
    @Query('name') name: string,
    @Query('surname') surname: string,
  ) {
   

    const info = {
      name, surname
    }

    return this.client.send('getManipolatedName', info).toPromise();

  }

}