import path from 'path'
import fs from 'fs'


export default async function findFilesInDirectory(dirname: string): Promise<string[]>{
    const folderPath = path.join(__dirname, '..', '..', '..', dirname); 
    let fileNames: string[] = [];

    try {
        const files = await fs.promises.readdir(folderPath);
        fileNames = files.filter(file => fs.statSync(path.join(folderPath, file)).isFile());
    } catch (error) {
        console.error("Error reading this directory", error);
    }

    return fileNames;
}