import { Injectable } from '@nestjs/common';
import mysql, { RowDataPacket } from 'mysql2/promise';
import { Macska } from './macska.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'test'
});

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getMacskak() {
    const [rows] = await mysqlConnection.execute(
      `SELECT id, suly, szem_szin AS szemSzin, gazdi_id AS gazdiId, jatek_id AS jatekId FROM macskak`,
    );
    return rows as Macska[];
  }

  async getJatekok() {
    const [rows] = await mysqlConnection.execute(
      `SELECT nev FROM jatekok`,
    );

    return rows;
  }

  async getMacskakBySearch(search: string) {
  const [results] = await mysqlConnection.execute
    (`SELECT id, suly, szem_szin AS szemSzin, gazdi_id AS gazdiId, jatek_id AS jatekId FROM macskak where szem_szin LIKE ?`, [`%${search}%`]);
    const rows = results as any
    return rows as Macska[];
  }

  async ujJatek(nev: string){
    const [results] = await mysqlConnection.execute
    ('INSERT INTO jatekok (nev) VALUES (?)', [nev]);
    console.log(results);
  }
}
