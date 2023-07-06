export interface IDatabaseDriver {
    connect (): Promise<any>
    disconnect (db: any): Promise<void>
    get (query: string): Promise<any>
    run (query: string): Promise<void>
    initQuery?: string
    dropQuery?: string
}