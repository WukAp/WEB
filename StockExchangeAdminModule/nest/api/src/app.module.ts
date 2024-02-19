import { Module } from '@nestjs/common';
import { AppController, SocketService } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule {}
