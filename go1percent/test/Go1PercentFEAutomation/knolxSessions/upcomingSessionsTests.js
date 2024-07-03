const login = browser.page.login()
const sessionsPage = browser.page.knolxSessionsPage()
const globalsData = require('../../../globals')

describe("Upcoming Sessions Page Frontend Automation", () => {
    before(function () {
        browser
            .window.maximize()
        login
            .navigate()
            .enterCredentials(globalsData.requestData.username, globalsData.requestData.password)
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
                .assert.elementPresent('@allLocation')
        }),
        it("Verify user should be able to add session to calender through add to calender button", async function () {
            sessionsPage
                .clickOnNasher()
                .clickOnAddToCalenderButton()
            let windowHandles = await browser.window.getAllHandles();
            browser.assert.equal(windowHandles.length, 2)
                .window.switchTo(windowHandles[1])
                .assert.urlContains('microsoft')
                .window.close()
            // switch to the main window again
            browser.window.switchTo(windowHandles[0])
            sessionsPage.clickOnClosePopUp()

        }),
        it("Verify user should be able to add session to calender through bookmark button", async function (browser) {
            sessionsPage
                .clickOnBookMarkButton()
            let windowHandles = await browser.window.getAllHandles();
            browser.assert.equal(windowHandles.length, 2)
                .window.switchTo(windowHandles[1])
                .assert.urlContains('microsoft')
                .window.close()
            // switch to the main window again
            browser.window.switchTo(windowHandles[0])
        }),

        it('Filter Session using All Competency in Upcoming Sessions Page',async () => {
            const beforeFiterByCompetencyName =await sessionsPage.getCompetencyNameFromFirstSession()
            sessionsPage.clickOnAllCompetencyDropdown()
                .selectCompetencyFromDropdown(beforeFiterByCompetencyName)
            const afterFiterByCompetencyName = await sessionsPage.getCompetencyNameFromFirstSession()
            sessionsPage
                .assert.textEquals(afterFiterByCompetencyName,beforeFiterByCompetencyName,"Before and After Competency Name is equals after using Filter By All Competency")
        }),

        it('Filter Session using All Sessions in Upcoming Sessions Page', async() => {
            const beforeFiterBySessionName =await sessionsPage.getSessionNameFromFirstSession()
            sessionsPage.clickOnAllSessionsDropdown()
                .selectSessionsFromDropdown(beforeFiterBySessionName)
            const afterFiterBySessionsName = await sessionsPage.getSessionNameFromFirstSession()
            sessionsPage
                .assert.textEquals(afterFiterBySessionsName,beforeFiterBySessionName,"Before and After Session Name is equals after using Filter By All Sessions")
        }),
        it('Verify user should be able to filter session using All Time in Upcoming Session page', async () => {
            const firstSessionDateBeforeFilter = await sessionsPage.getDateFromFirstSessions();
            sessionsPage.selectDateFromCalenderUpcomingSessions();
            const firstSessionDateAfterFilter = await sessionsPage.getDateFromFirstSessions();
            sessionsPage.assert.equal(firstSessionDateAfterFilter, firstSessionDateBeforeFilter, "Before and After Session Time is equals after using Filter By All Time")
        }),

        after(function (browser) {
            browser.end();
        })

});