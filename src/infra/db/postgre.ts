import { injectable } from "inversify";
import 'reflect-metadata'
import { IDatabaseDriver } from "../../application/contracts/databaseDriver";
import { config } from ".";
import pgPromise from "pg-promise";

@injectable()
export default class PostgreSQLDriver implements IDatabaseDriver {

    async connect(): Promise<pgPromise.IDatabase<any, any>> {
        const postgre = pgPromise({})
        const db = postgre(config)
        db.connect().then(() => console.log('Connected to database')).catch((err) => {console.log(err)})
        return db;
    }

    async disconnect(db: pgPromise.IDatabase<any, any>): Promise<void> {
        await db.$pool.end()
    }
    
    async run(query: string): Promise<void> {
        const database = await this.connect()
        await database.query(query)
        await this.disconnect(database)
    }

    async get(query: string): Promise<any> {
        const database = await this.connect()
        const results = await database.query(query)
        await this.disconnect(database)
        return results
    }
}