import { injectable } from "inversify";
import 'reflect-metadata'
import { IDatabaseDriver } from "../../application/contracts/databaseDriver";
import connection from ".";
import { disconnect } from ".";

@injectable()
export default class DatabaseDriver implements IDatabaseDriver {
    
    async run(query: string): Promise<any> {
        const database = await connection()
        const results = await database.query(query)
        await disconnect(database)
        return results
    }
}