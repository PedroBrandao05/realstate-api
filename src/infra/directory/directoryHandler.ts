import path from "path";
import fs from 'fs'

export default class DirectoryHandler {
    static async findFiles(directory: string){
        const folderPath = path.join(__dirname, '..', '..', '..', directory); 
        let fileNames: string[] = [];

        try {
            const files = await fs.promises.readdir(folderPath);
            fileNames = files.filter(file => fs.statSync(path.join(folderPath, file)).isFile());
        } catch (error) {
            console.error("Error reading this directory", error);
        }

        return fileNames;
    }
}