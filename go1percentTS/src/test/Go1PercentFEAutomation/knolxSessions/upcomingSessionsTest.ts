import { NightwatchBrowser } from 'nightwatch';
import { LoginPage } from '../../../page-objects/login';
import { KnolxSessionsPage } from '../../../page-objects/knolxSessions/knolxSessionsPage'
const competencyName = "TEST AUTOMATION COMPETENCY";
let login: LoginPage, sessionsPage: KnolxSessionsPage;

describe("Upcoming Sessions Page Frontend Automation", () => {
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
            .assert.urlContains("upcoming-sessions");
    }),

        // Upcoming Sessions Page
        it("Verify user should be able to see all fields in Upcoming Sessions page", () => {
            sessionsPage
                .waitForPageLoad()
                .assert.elementPresent('@allCompetency')
                .assert.elementPresent('@allSessions')
                .assert.elementPresent('@allTime')
                .assert.elementPresent('@allLocation');
        }),

        it('Verify user should be able to add session to calendar through add to calendar button', async () => {
            sessionsPage
                .clickOnNasher()
                .clickOnAddToCalenderButton()
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
                                .assert.urlContains('microsoft')
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


        it("Verify user should be able to add session to calender through bookmark button", async (browser: NightwatchBrowser) => {
            sessionsPage
                .clickOnBookMarkButton()
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
                                .assert.urlContains('microsoft')
                            // Close the second window or switch back to the first window
                            browser.window.close();
                            browser.window.switch(windowHandles[0]);
                        }
                    }
                });
            } catch (error) {
                console.error('Error occurred during the handling the multiple windows:', error);
            }
        }),

        it('Filter Session using All Sessions in Upcoming Sessions Page', async (browser: NightwatchBrowser) => {
            const beforeFiterBySessionName: string = await sessionsPage.getSessionNameFromFirstSession() as string
            sessionsPage.clickOnAllSessionsDropdown()
                .selectSessionsFromDropdown(beforeFiterBySessionName)
            const afterFiterBySessionsName: string = await sessionsPage.getSessionNameFromFirstSession() as string
            sessionsPage
                .assert.equal(afterFiterBySessionsName, beforeFiterBySessionName, "Before and After Session Name is equals after using Filter By All Sessions")
                .clickOnUpcomingSessionsTab()
        }),
        it('Verify user should be able to filter session using All Time in Upcoming Session page', async (browser: NightwatchBrowser) => {
            const firstSessionDateBeforeFilter: string = await sessionsPage.getDateFromFirstSessions();
            sessionsPage.selectDateFromCalenderUpcomingSessions();

            const firstSessionDateAfterFilter: string = await sessionsPage.getDateFromFirstSessions();
            sessionsPage.assert.equal(firstSessionDateAfterFilter, firstSessionDateBeforeFilter, "Sessions time is equals after using filter by all time")
                .clickOnUpcomingSessionsTab()
        }),
        it("Filter Session using All Competency in Upcoming Sessions Page", async (browser: NightwatchBrowser) => {
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
            sessionsPage.clickOnUpcomingSessionsTab()
        }),
        after(function (browser: NightwatchBrowser) {
            browser.end();
        })
});
