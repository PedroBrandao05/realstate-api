import { injectable } from "inversify";
import 'reflect-metadata'
import IDatabaseConnection from "../../application/contracts/databaseConnection";
import pgp from 'pg-promise'; 
import dotenv from 'dotenv'

dotenv.config()

const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME

export default class PgPromiseAdapter implements IDatabaseConnection {
  connection: any;

  async connect(): Promise<void> {
    this.connection = pgp()(`postgres://postgres:${dbPassword}@localhost:5432/${dbName}`);
  }
  
  query(statement: string, params: any[]): Promise<any> {
    return this.connection.query(statement, params);
  }

  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}