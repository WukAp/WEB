import { Controller, Body, UploadedFiles, UseInterceptors, Get, Post, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import * as fs from 'fs'
import { Server } from 'socket.io';

import {
  ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway
} from "@nestjs/websockets";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('getStocks')
  getFileStocks(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'data/stocks.json'));
    return new StreamableFile(file);
  }
  @Get('getBrokers')
  getFileBrokers(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'data/brokers.json'));
    return new StreamableFile(file);
  }
  @Post('uploadBrokers')
  @UseInterceptors(FileInterceptor('data/brokers.json'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
  }
  @Post('uploadBroker')
  uploadBrocker(@Body() newBroker) {
    let brokers;
    fs.readFile("data/brokers.json", (err, data: Buffer) => {
      if (err) throw err;
      brokers = JSON.parse(String(data));
      brokers.push(newBroker);
      fs.writeFile("data/brokers.json", JSON.stringify(brokers), (err) => {
        if (err) console.log("Error!");
      });;
    });

    console.log(newBroker);
  }
  @Post('deleteBroker')
  deleteBrocker(@Body() id_data) {
    console.log(id_data);
    let brokers;
    fs.readFile("data/brokers.json", (err, data: Buffer) => {
      if (err) throw err;
      brokers = JSON.parse(String(data));
      brokers.splice(brokers.indexOf(brokers.filter((node_broker) => id_data.id == node_broker.id)[0]), 1)
      fs.writeFile("data/brokers.json", JSON.stringify(brokers), (err) => {
        if (err) console.log("Error!");
      });;
    
    });

  }
  @Post('uploadBrokersBudget')
  uploadBrockersBudget(@Body() broker) {
    console.log(broker);
    let brokers;
    fs.readFile("data/brokers.json", (err, data: Buffer) => {
      if (err) throw err;
      brokers = JSON.parse(String(data));
      brokers[brokers.indexOf(brokers.filter((node_broker) => broker.id == node_broker.id)[0])].budget = broker.budget
      fs.writeFile("data/brokers.json", JSON.stringify(brokers), (err) => {
        if (err) console.log("Error!");
      });;
    });

  }
  @Post('changeBroker')
  changeBroker(@Body() broker) {
    console.log(broker);
    let brokers;
    fs.readFile("data/brokers.json", (err, data: Buffer) => {
      if (err) throw err;
      brokers = JSON.parse(String(data));
      //brokers[brokers.indexOf(brokers.filter((node_broker) => broker.id == node_broker.id)[0])] = broker.
      fs.writeFile("data/brokers.json", JSON.stringify(brokers), (err) => {
        if (err) console.log("Error!");
      });;
    });

  }
  

  

}
@WebSocketGateway(
  {
    cors: {
      origin: '*'
    }
  }
)

export class SocketService implements OnGatewayConnection {
  private index = 0;
  private interval;
  private stocks;


  constructor() {
    fs.readFile("data/stocks.json", (err, data: Buffer) => {
      if (err) throw err;
      this.stocks = JSON.parse(String(data));

    });
  }
  handleConnection(client: any) {
    console.log("CONNECTED");
  }
  @SubscribeMessage("start")
  handleEvent(@MessageBody() dto: any, @ConnectedSocket() client: any) {

    console.log("START");
    this.index = this.stocks[0].data.map((g) => {
      return g.Date;
    }).indexOf(dto.date.split("-")[1] + "/" + dto.date.split("-")[2] + "/" + dto.date.split("-")[0]);
    
    if (this.index == -1) {
      return
    }
    this.interval = setInterval(() => {
      if (this.index > 0) {
console.log(dto)
      client.broadcast.emit("trading", this.stocks.filter((ch) => dto.listTradings.includes(ch.code)).map(stock => { return { "name": stock.name, "code": stock.code, data: stock.data[this.index] } }))
        this.index -= 1
      } else {
        this.handleStopEvent()
      }
    }, 1000 /  dto.speed)
  }

  @SubscribeMessage("stop")
  handleStopEvent() {
    clearInterval(this.interval)
    console.log("STOP")
    this.index = this.stocks[0].data.length - 1;
  }

}