import 'reflect-metadata'
import { injectable } from 'inversify'
import IStorage from '../../application/contracts/storage'
import aws, { S3 } from 'aws-sdk'
import config from 'config'
import { ClientConfiguration } from 'aws-sdk/clients/s3'
import { multerConfig } from '../mediaHandler/multer'
import path from 'path'
import mime from 'mime'
import fs from 'fs'
import { ApplicationError } from '../../domain/error/application'

const s3Config = config.get('AWS-SDK.S3BucketConfig') as ClientConfiguration
const bucketName = config.get('AWS-SDK.S3BucketName') as string

@injectable()
export default class S3Storage implements IStorage {
    private client: S3
    private directory = path.resolve(multerConfig.directory)

    constructor()
    { this.client = new aws.S3(s3Config)}

    async dispatch(filename: string): Promise<void> {
        const filePath = path.resolve(this.directory, filename)
        await fs.promises.unlink(filePath)
    }

    async remove(filename: string): Promise<void> {
        this.client.deleteObject({
            Bucket: bucketName,
            Key: filename
        })
        .promise()
    }

    async send(filename: string): Promise<void> {
        const filePath = path.resolve(this.directory, filename)
        const ContentType = mime.getType(filePath)
        if (!ContentType) throw new ApplicationError("Unable to get file content type", 500)
        const fileContent = await fs.promises.readFile(filePath)
        this.client.putObject({
            Bucket: bucketName,
            Key: filename,
            ACL: 'public-read',
            Body: fileContent,
            ContentType
        })
        .promise()
    }
}