
const runCommand = async ( args: string[] ) => {
    process.argv = [ ...process.argv, ...args ];

    const { yarg } = await import('../../../src/config/plugins/args.plugin');
    
    return yarg;
}

describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })
    
    test('should return default values',async () => {
        const argv = await runCommand([ '-b', '5' ])
        
        expect( argv ).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: './outputs',
        }));
    })

    test('should return configuration with custom values',async () => {
        const argv = await runCommand([ '-b', '3', '-l', '7', '-s', 'true', '-n', 'custom-name', '-d', 'custom-destination',  ])
        
        expect( argv ).toEqual( expect.objectContaining({
            b: 3,
            l: 7,
            s: true,
            n: 'custom-name',
            d: 'custom-destination',
        }));
    })


})