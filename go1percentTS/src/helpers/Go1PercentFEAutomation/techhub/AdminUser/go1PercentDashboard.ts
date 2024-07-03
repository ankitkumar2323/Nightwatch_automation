import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import { DashboardPage } from '../../../../page-objects/techhub/AdminUser/dashboard';



    export function navigateToTechhubPage(browser:NightwatchBrowser):void {
        browser
            .page.techhub.AdminUser.dashboard()
            .Navigate_To_TechHub(browser)
        browser.assert.urlContains("tech-hub");
    }