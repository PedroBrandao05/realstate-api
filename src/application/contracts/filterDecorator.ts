export default interface IFilterDecorator {
    leach (values: any, previous?: string[]): Promise<string[]>
}