import { Controller, Inject, Post, Body, Get, Req, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_MICROSERVICE_1') private readonly client1: ClientProxy,
    @Inject('USER_MICROSERVICE_2') private readonly client2: ClientProxy,

    private readonly appService: AppService
  ) { }

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
    return this.client1.send('getManipolatedName', info).toPromise();
  }

  @Post('addRecording')
  async addRecording(@Body() body: any) {
    return this.client1.send('addRecording', body).toPromise();
  }

  @Get('getAllRec')
  async getAllRec() {
    return this.client1.send('getAllRec', {}).toPromise();
  }

  

  @Get('getRecForChannel')
  async getRecForChannel(
    @Query('chId') chId: Number,
  ) {
    return this.client1.send('getRecForChannel', chId).toPromise();
  }

  

  @Get('getManipulatedAge')
  async getManipulatedAge(
    @Query('age') age: Number,
  ) {
    return this.client2.send('getManipulatedAge', age).toPromise();
  }

}