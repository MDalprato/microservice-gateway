import { Controller, Get, Inject, Post, Body } from '@nestjs/common';
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

  @Get('/sum')
  async createUser() {
    const payload = [0,3,35];
    return this.client.send('sum', payload).toPromise();
  }
}