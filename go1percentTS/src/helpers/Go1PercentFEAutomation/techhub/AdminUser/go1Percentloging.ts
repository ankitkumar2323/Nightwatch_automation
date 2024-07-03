import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import { LoginPage } from '../../../../page-objects/techhub/AdminUser/login';



   export function beforeEach(browser: NightwatchBrowser):void {
        browser
            .maximizeWindow()
            .page.techhub.AdminUser.login()
            .navigate()
            .enterCredentials(browser.globals.adminUserName, browser.globals.adminPassword)
            .signIn()
        //browser.pause(30000)
    }

    export function after(browser: NightwatchBrowser):void {
        browser.end();
    }
    export function landingOnDashboardPage(browser: NightwatchBrowser): void {
        browser.assert.urlContains("my-dashboard");
    }
    
