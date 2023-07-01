import { injectable } from "inversify";
import 'reflect-metadata'
import { IDatabaseDriver } from "../../application/contracts/databaseDriver";
import connection from ".";

@injectable()
export default class DatabaseDriver implements IDatabaseDriver {
    
    async run(query: string): Promise<any> {
        connection.query(query, function(err, results, fields){
            return results
        })
    }
}