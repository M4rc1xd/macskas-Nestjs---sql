import { Controller, Get, Post, Query, Render, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UjJatekDto } from './ujJatek.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App',
    };
  }

  @Get('macskak')
  @Render('macskak')
  async getMacskak() {
    return {
      macskak: await this.appService.getMacskak(),
    };
  }

  @Get('jatekok')
  @Render('jatekok')
  async getJatekok() {
    return {
      jatekok: await this.appService.getJatekok(),
    };
  }

  @Get("macskakeres")
  @Render('macskakeres')
  async getMacskakBySearch(@Query('search') search: string) {
    return {
      macskak: await this.appService.getMacskakBySearch(search),
    };
  }

  @Get("ujjatek")
  @Render("ujjatekform")
  async ujJatekForm() {

  }

  @Post("ujjatek")
  async ujJatek(@Body() body: UjJatekDto) {
    await this.appService.ujJatek(body.nev);
  }
}
