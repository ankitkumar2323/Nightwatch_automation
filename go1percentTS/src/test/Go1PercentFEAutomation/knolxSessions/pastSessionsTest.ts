import { NightwatchBrowser } from 'nightwatch';
import { LoginPage } from '../../../page-objects/login';
import { KnolxSessionsPage } from '../../../page-objects/knolxSessions/knolxSessionsPage'
const sessionDescription = "Testing TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting Ticket";

let login: LoginPage, sessionsPage: KnolxSessionsPage;

describe("Past Sessions Page Frontend Automation", () => {
    before(function () {
        login = browser.page.login() as LoginPage
        sessionsPage = browser.page.knolxSessions.knolxSessionsPage() as KnolxSessionsPage
        browser.window.maximize()
        login.navigate()
            .enterCredentials(browser.globals.userName, browser.globals.password)
            .signIn()
            .assert.urlContains("my-dashboard")
        sessionsPage
            .clickOnKnolxButton()
            .clickOnSessionsButton()
            .waitForPageLoad()
            .assert.urlContains("upcoming-sessions")
            .clickOnPastSessionsTab()
    }),
        // Past Sessions Page
        it('Verify user should be able to see all fields in Past Sessions page', () => {
            sessionsPage
                .assert.elementPresent('@allCompetency')
                .assert.elementPresent('@allSessions')
                .assert.elementPresent('@allTime')
                .assert.elementPresent('@allLocation')
        }),
        it('Verify user should be able to see Session details', () => {
            sessionsPage
                .clickOnTestingTicket()
                .assert.textContains('@sessionDescription', sessionDescription)
                .clickOnClosePopUp()
        }),

        it('Verify user should be able to navigate to all Social Media links', async (browser: NightwatchBrowser) => {
            sessionsPage
                .clickOnTestingTicket()
                .clickOnFacebook()
            try {
                let windowHandles: string[];
                await browser.window.getAllHandles((result) => {
                    if (Array.isArray(result.value)) {
                        windowHandles = result.value;
                        // Assuming there are at least two window handles
                        if (windowHandles.length >= 2) {
                            browser.assert.equal(windowHandles.length, 2)
                            let currentWindowHandle = windowHandles[1];
                            // Switch to the second window
                            browser
                                .window.switch(currentWindowHandle)
                                .assert.urlContains('facebook')
                            // Close the second window or switch back to the first window
                            browser.window.close();
                            browser.window.switch(windowHandles[0]);
                        }
                    }
                });
            } catch (error) {
                console.error('Error occurred during the handling the multiple windows:', error);
            }
            sessionsPage
                .clickOnTwitter()
            // Twitter
            try {
                let windowHandles: string[];
                await browser.window.getAllHandles((result) => {
                    if (Array.isArray(result.value)) {
                        windowHandles = result.value;
                        // Assuming there are at least two window handles
                        if (windowHandles.length >= 2) {
                            browser.assert.equal(windowHandles.length, 2)
                            let currentWindowHandle = windowHandles[1];
                            // Switch to the second window
                            browser
                                .window.switch(currentWindowHandle)
                                .assert.urlContains('twitter')
                            // Close the second window or switch back to the first window
                            browser.window.close();
                            browser.window.switch(windowHandles[0]);
                        }
                    }
                });
            } catch (error) {
                console.error('Error occurred during the handling the multiple windows:', error);
            }

            sessionsPage
                .clickOnLinkedin()

            // Linkedin 
            try {
                let windowHandles: string[];
                await browser.window.getAllHandles((result) => {
                    if (Array.isArray(result.value)) {
                        windowHandles = result.value;
                        // Assuming there are at least two window handles
                        if (windowHandles.length >= 2) {
                            browser.assert.equal(windowHandles.length, 2)
                            let currentWindowHandle = windowHandles[1];
                            // Switch to the second window
                            browser
                                .window.switch(currentWindowHandle)
                                .assert.urlContains('linkedin')
                            // Close the second window or switch back to the first window
                            browser.window.close();
                            browser.window.switch(windowHandles[0]);
                        }
                    }
                });
            } catch (error) {
                console.error('Error occurred during the handling the multiple windows:', error);
            }

            sessionsPage.clickOnClosePopUp()
        }),



        it('Filter Session using All Sessions in Past Sessions Page', async () => {
            const beforeFiterBySessionName: string = await sessionsPage.getSessionNameFromFirstSession() as string
            sessionsPage.clickOnAllSessionsDropdown()
                .selectSessionsFromDropdown(beforeFiterBySessionName)
            const afterFiterBySessionsName: string = await sessionsPage.getSessionNameFromFirstSession() as string
            sessionsPage
                .assert.equal(afterFiterBySessionsName, beforeFiterBySessionName, "Before and After Session Name is equals after using Filter By All Sessions")
                .clickOnPastSessionsTab()
        }),

        it('Verify user should be able to filter session using All Time in Past Session page', async () => {
            const firstSessionDateBeforeFilter = await sessionsPage.getDateFromFirstSessions();

            sessionsPage.selectDateFromCalenderPastSessions();

            const firstSessionDateAfterFilter = await sessionsPage.getDateFromFirstSessions();

            sessionsPage.assert.equal(firstSessionDateAfterFilter, firstSessionDateBeforeFilter, "Sessions time is equals after using filter by all time")
                .clickOnPastSessionsTab()
        }),
        it('Filter Session using All Competency in Past Sessions Page', async (browser: NightwatchBrowser) => {
            sessionsPage
                .clickOnAllCompetencyDropdown()
                .selectOneCompetencyNameFromDropdown()
            const expectedCompetencyName: string = await sessionsPage.getCompetencyNameText() as string
            if (await browser.useXpath().isPresent("(//div[@class='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'])[1]") == true) {
                const actualCompetencyName: string = await sessionsPage.getCompetencyNameFromFirstSession() as string;
                sessionsPage.assert.equal(actualCompetencyName, expectedCompetencyName.toUpperCase(), "Before and After Competency Name is equal after using Filter By All Competency");
            } else {
                const textValue: string = await sessionsPage.getNoSessionsText() as string
                sessionsPage.assert.equal(textValue, 'No Sessions to display', "No Sessions is present with Competency Name: " + expectedCompetencyName.toUpperCase());
            }
            sessionsPage.clickOnPastSessionsTab()
        }),
        after(function (browser: NightwatchBrowser) {
            browser.end();
        })
});
