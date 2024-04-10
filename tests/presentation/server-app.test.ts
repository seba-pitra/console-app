import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from '../../src/presentation/server-app';


describe('Server App', () => {
    const options = {
        base: 3,
        limit: 5,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-filename',
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();

        expect( serverApp ).toBeInstanceOf( ServerApp )
        expect( typeof ServerApp.run ).toBe( 'function' )
    })
    
    test('should run ServerApp with options', () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute');
        const saveFileSpy    = jest.spyOn( SaveFile.prototype, 'execute');
        
        
        ServerApp.run( options )


        expect( logSpy ).toHaveBeenCalledTimes(2);
        expect( logSpy ).toHaveBeenCalledWith('server running...');
        expect( logSpy ).toHaveBeenLastCalledWith('File Created!');
        
        expect( createTableSpy ).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({ 
            base: options.base, 
            limit: options.limit 
        });
        
        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({ 
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });
    })

    test('should run with custom values mocked', () => {
        const tableLog = '1 x 1 = 1';
        const logErroMock   = jest.fn();
        const logMock       = jest.fn();
        const createMock    = jest.fn().mockReturnValue(tableLog);
        const saveFileMock  = jest.fn().mockReturnValue(true);

        global.console.error = logErroMock;
        global.console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
        
        ServerApp.run( options );


        expect( logMock ).toHaveBeenCalledWith('server running...')
        expect( createMock ).toHaveBeenCalledWith({ "base": 3, "limit": 5 })
        expect( saveFileMock ).toHaveBeenCalledWith({
            fileContent: tableLog,
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        })
        expect( logMock ).toHaveBeenCalledWith('File Created!')
        expect( logErroMock ).not.toHaveBeenCalled()
    })

    
    


})