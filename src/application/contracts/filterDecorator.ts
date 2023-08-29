export default interface IFilterDecorator {
    leach (value?: {max: number, min: number}, previous?: string[], ): Promise<string[]>
}