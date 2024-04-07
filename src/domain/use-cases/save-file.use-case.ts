import fs from 'fs'


export interface SaveFileUseCase {
    execute: ( options: SaveFileOptions ) => boolean;
}
export interface SaveFileOptions {
    fileDestination?: string;
    fileContent : string;
    fileName?   : string;
}

export class SaveFile implements SaveFileUseCase {
    constructor(/*
    * repository: StorageRepository
    */){}

    execute ({ 
        fileContent, 
        fileDestination = 'outputs', 
        fileName = 'table' 
    }: SaveFileOptions) {
        try {
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${ fileDestination }/${ fileName }.txt`, fileContent);
            return true;

        } catch (error) {
            console.error(error)
            return false;
        }
    }
}