import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientProxyFactory, ClientOptions } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'USER_MICROSERVICE',
      useFactory: () => {
        const options = {
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 8875,
          },
        };
        return ClientProxyFactory.create(options as ClientOptions);
      },
        },
    AppService,
  ],
})
export class AppModule {}