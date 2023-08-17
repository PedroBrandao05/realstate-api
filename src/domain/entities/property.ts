export type Media = {url: string}

export class Property {
    id!: string
    title!: string
    privateTitle!: string
    description!: string
    privateDescription!: string
    media!: Media[]
    userId!: string
    ownerId!: string
    publishDate!: Date
}