import 'reflect-metadata'
import { injectable } from 'inversify'
import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { ApplicationError } from '../../domain/error/application'
import IMediaHandler from '../../application/contracts/mediaHandler'

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'temp')

export const multerConfig = {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(req, file, callback) {
            const fileHash = req.params.id 
            const filename = `${fileHash}-${file.originalname}`

            return callback(null, filename)
        },
    }),
}

@injectable()
export default class Multer implements IMediaHandler {
    upload: any 
    
    constructor()
    {this.upload = multer(multerConfig)}

    save(method: string, fieldName: string) {
       return this.upload[method](fieldName)
    }
}