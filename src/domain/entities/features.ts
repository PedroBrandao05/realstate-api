export class Feature {
    constructor (
        private readonly id: string,
        private readonly type: 'unity' | 'realState',
        private readonly description: string
    ){}
}