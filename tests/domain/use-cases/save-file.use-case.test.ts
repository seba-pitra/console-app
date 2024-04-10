import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs, { mkdir } from 'fs';


describe('SaveFileUseCase', () => {

    const customOptions  = { 
        fileContent: 'custom content', 
        fileDestination: 'custom-outputs', 
        fileName: 'custom-name' 
    };
    const customFilePath = `${ customOptions.fileDestination }/${ customOptions.fileName }.txt`;
    
    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if( outputFolderExists ) fs.rmSync('outputs', { recursive: true })
            
        const customOutputFolderExists = fs.existsSync( customOptions.fileDestination );
        if( customOutputFolderExists ) fs.rmSync( customOptions.fileDestination, { recursive: true } );
    })

    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options  = { fileContent: 'test content' };

        const result      = saveFile.execute( options );
        const fileExists  = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
        
        expect( saveFile ).toBeInstanceOf( SaveFile );
        expect( result ).toBeTruthy();
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toContain( options.fileContent );
    })
  
    test('should save file with custom values', () => {
        const saveFile = new SaveFile();

        const result      = saveFile.execute( customOptions );
        const fileExists  = fs.existsSync(customFilePath)
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' })
        
        expect( result ).toBeTruthy();
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toContain( customOptions.fileContent );
    })
   
    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        )
        const result = saveFile.execute( customOptions );
        
        expect( result ).toBeFalsy();

        mkdirSpy.mockRestore();
    })
    
    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing message from testing') }
        )
        const result = saveFile.execute( customOptions );
        
        expect( result ).toBeFalsy();

        writeFileSpy.mockRestore();
    })

})