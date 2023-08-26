export enum FeatureType {
    UNIT = 'unit',
    REAL_STATE = 'realState'
}

export class Feature {
    id!: string
    type!: FeatureType
    description!: string
}