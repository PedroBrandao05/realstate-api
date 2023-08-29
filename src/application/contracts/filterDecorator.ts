export default interface IFilterDecorator {
    leach (value?: any, previous?: string[], ): Promise<string[]>
}