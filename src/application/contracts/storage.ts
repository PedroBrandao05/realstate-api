export default interface IStorage {
    send(filename: string): Promise<void>
    remove(filename: string): Promise<void>
    dispatch(filename: string): Promise<void>
}