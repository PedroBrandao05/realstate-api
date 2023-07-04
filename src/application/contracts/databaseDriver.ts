export interface IDatabaseDriver {
    connect (): Promise<any>
    disconnect (db: any): Promise<void>
    get <T>(query: string): Promise<T>
    run (query: string): Promise<void>
}