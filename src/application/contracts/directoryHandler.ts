export default interface IDirectoryHandler {
    findFiles (directory: string): Promise<string[]>
}