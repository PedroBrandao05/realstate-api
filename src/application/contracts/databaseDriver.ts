export interface IDatabaseDriver {
    run (query: string): Promise<any>
}