import { injectable } from "inversify";
import { IDatabaseDriver } from "../../application/contracts/databaseDriver";
import sqlite3, { Database } from "sqlite3";
import 'reflect-metadata'

@injectable()
export default class InMemoryDatabase implements IDatabaseDriver {
    initQuery!: string
    dropQuery!: string
    database!: Database

    async connect(): Promise<void> {
        const database = new sqlite3.Database(':memory:', (err) => {
            if (err) {
                console.log(err)
            }
        })
        database.serialize(() => {
            database.run(this.initQuery, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('initial query executed')
                }
            })
        })
        this.database = database
    }

    async clear(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.database.run(this.dropQuery, (err) => {
                if (err) reject(err)
                resolve()
            })
        })
    }

    async disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.database.close((err) => {
                if (err) reject(err)
                resolve()
            })
        })
    }

    async get<T>(query: string): Promise<T> {
        return new Promise((resolve, reject) => {
           this.database.get<T>(query, (err, row) => {
                if (err) reject(err)
                resolve(row)
            })
        })
    }

    async run(query: string) {
        this.database.run(query, (err) => {
            if (err) {
                console.log(err)
            }
        })
    }
    
}