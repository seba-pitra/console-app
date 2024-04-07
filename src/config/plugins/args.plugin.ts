import yargs from "yargs";
import { hideBin } from 'yargs/helpers';


export const yarg = yargs( hideBin(process.argv) )
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Multiplicacion table base'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Multiplicacion table limit'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Show multiplicacion table'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'multiplication-table',
        describe: 'file name'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: './outputs',
        describe: 'File destination'
    })
    .check(( argv, options ) => {
        if( argv.b < 0 ) throw 'Error: base must be greater than 0'
        if( argv.l < 0 ) throw 'Error: base must be greater than 0'

        return true;
    })
    .parseSync()

