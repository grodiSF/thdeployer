import { AuthInfo, Connection } from '@salesforce/core';
import { flags, SfdxCommand } from '@salesforce/command';
import * as puppeteer from 'puppeteer';
import * as stripcolor from 'strip-color';

import { exec } from '../../../../common/execProm';
// @ts-ignore
export default class ReleaseCreate extends SfdxCommand {
    protected static flagsConfig = {
        name: flags.string({ char: 'n', description: 'name of the community to activate', required: true }),
        showbrowser: flags.boolean({ char: 'b', description: 'show the browser...useful for local debugging' })
    };

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {
        
        // Creating a new authentication file.
        const authInfo = await AuthInfo.create({
            username: 'dirk.gronert@trail.head', oauth2Options:
        {
            loginUrl :'https://mythdev.my.salesforce.com', 
            clientId: '3MVG9vtcvGoeH2bjIw4_uuLk1RKxd4D423JzqmDj_aW1P_jz9_V3FXE8qOWxSdQ9Js4GoMUeViqC4U9a3QmiB',
            clientSecret: '599D23B8E86C01AD2045AE8720754BFD2CB2A1C99A6F07DE4CC6289457E9BB7C'
        }});
        authInfo.save();


        // Using the AuthInfo
        /* eslint-disable-next-line no-unused-variable */
        // @ts-ignore
        const connection = await Connection.create({authInfo : authInfo});
            
        
        this.ux.startSpinner('starting headless browser');
        /* eslint-disable-next-line no-unused-variable */
        // @ts-ignore
        const browser = await puppeteer.launch({ headless: !this.flags.showbrowser, args: ['--no-sandbox'] });
        const openResult = await exec('sfdx force:org:open -r --json');
        /* eslint-disable-next-line no-unused-variable */
        // @ts-ignore
        const url = JSON.parse(stripcolor(openResult.stdout)).result.url;
    }
}