
import { ServerApp } from "../src/presentation/server-app";




describe('Test App.ts', () => {
    
    test('should call Server.run with values', async () => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        
        process.argv = [ 'node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test_destination'];
        
        await import ('../src/app');

        expect( ServerApp.run ).toHaveBeenCalled();
        expect( ServerApp.run ).toHaveBeenCalledWith({
            "base": 10,
            "fileDestination": "test_destination",
            "fileName": "test-file",
            "limit": 5,
            "showTable": true,
        });
    })
})