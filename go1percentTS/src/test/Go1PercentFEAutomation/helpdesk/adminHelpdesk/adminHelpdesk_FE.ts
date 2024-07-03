import { NightwatchTests, NightwatchBrowser } from "nightwatch";

import { assert } from "console";
import { AdminHelpdesk } from "../../../../page-objects/helpdesk/adminHelpdesk/adminHelpdesk";
import { LoginPage } from "../../../../page-objects/login";


let helpDesk: AdminHelpdesk = browser.page.helpdesk.adminHelpdesk.adminHelpdesk() as AdminHelpdesk

let login: LoginPage = browser.page.login() as LoginPage



describe('Go1percent techHub FE Testing', () => {
    beforeEach((browser: NightwatchBrowser) => {
        browser
            .url("https://nashtechglobal.qa.go1percent.com/")
            .window.maximize()

        // Initialize the page object and perform login, sign-in, and navigation actions.
        login
            .enterCredentials('testadmin', 'testadmin')
            .signIn()
    });

    // Teardown: After each test, end the browser session.
    afterEach((browser: NightwatchBrowser) => {
        browser.end();
    });
    it('Verify that the total available Tickets should be same as the count mentioned in the total records - Open ticket', async (): Promise<void> => {
        helpDesk
            .pause(500)
            .selectAdminHelpdeskSection()
            .pause(500)
        const totalTicketsCount = await helpDesk.getTotalTicketsCount();
        const openTicketCount = await helpDesk.getOpenTicketCount();
        browser.assert.equal(totalTicketsCount, openTicketCount, `The text should be "${totalTicketsCount}"`);
    })
    it('Verify that the total available Tickets should be same as the count mentioned in the total records - Unassigned ticket', async (): Promise<void> => {
        helpDesk
            .pause(500)
            .selectAdminHelpdeskSection()
            .pause(500)
            .selectUnassignedTicketSection()
        const totalTicketsCount = await helpDesk.getTotalTicketsCount();
        const UnassignedCount = await helpDesk.getUnassignedTicketCount();
        browser.assert.equal(totalTicketsCount, UnassignedCount, `The text should be "${totalTicketsCount}"`);
    })
    it('Verify that the total available Tickets should be same as the count mentioned in the total records - Overdue ticket', async (): Promise<void> => {
        helpDesk
            .pause(500)
            .selectAdminHelpdeskSection()
            .pause(500)
            .selectOverDueTicketsSection()
        const totalTicketsCount = await helpDesk.getTotalTicketsCount();
        const overdueTicketsCount = await helpDesk.getOverDueTicketsCount();
        browser.assert.equal(totalTicketsCount, overdueTicketsCount, `The text should be "${totalTicketsCount}"`);
    });
    it('Verify that the total available Tickets should be same as the count mentioned in the total records - Closed ticket', async (): Promise<void> => {
        helpDesk
            .pause(500)
            .selectAdminHelpdeskSection()
            .pause(500)
            .selectClosedTicketSection()
        const totalTicketsCount = await helpDesk.getTotalTicketsCount();
        const closedTicketCount = await helpDesk.getClosedTicketsCount();
        browser.assert.equal(totalTicketsCount, closedTicketCount, `The text should be "${totalTicketsCount}"`);
    });
});


