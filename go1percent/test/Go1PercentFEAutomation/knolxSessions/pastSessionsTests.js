const login = browser.page.login()
const sessionsPage = browser.page.knolxSessionsPage()
const globalsData = require('../../../globals')

describe("Past Sessions Page Frontend Automation", () => {
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
                .assert.textContains('@sessionDescription', globalsData.sessionDescriptionInPast)
                .clickOnClosePopUp()
        }),
        it('Verify user should be able to navigate to all Social Media links', async function () {
            sessionsPage
                .clickOnTestingTicket()
                .clickOnFacebook()
            let fbwindowHandles = await browser.window.getAllHandles();
            browser.assert.equal(fbwindowHandles.length, 2)
                .window.switchTo(fbwindowHandles[1])
                .assert.urlContains('facebook')
                .window.close()
                // switch to the main window again
                .window.switchTo(fbwindowHandles[0])
            sessionsPage
                .clickOnTwitter()

            let twitterWindowHandle = await browser.window.getAllHandles();
            browser.assert.equal(twitterWindowHandle.length, 2)
                .window.switchTo(twitterWindowHandle[1])
                .pause(3000)
                .assert.urlContains('twitter')
                .window.close()
                // switch to the main window again
                .window.switchTo(twitterWindowHandle[0])
            sessionsPage
                .clickOnLinkedin()
            let linkedinWindowHandle = await browser.window.getAllHandles();
            browser.assert.equal(linkedinWindowHandle.length, 2)
                .window.switchTo(linkedinWindowHandle[1])
                .assert.urlContains('linkedin')
                .window.close()
                // switch to the main window again
                .window.switchTo(linkedinWindowHandle[0])
            sessionsPage.clickOnClosePopUp()
        }),
        it('Filter Session using All Competency in Past Sessions Page', async () => {
            const beforeFiterByCompetencyName = await sessionsPage.getCompetencyNameFromFirstSession()
            sessionsPage.clickOnAllCompetencyDropdown()
                .selectCompetencyFromDropdown(beforeFiterByCompetencyName)
            const afterFiterByCompetencyName = await sessionsPage.getCompetencyNameFromFirstSession()
            sessionsPage
                .assert.textEquals(afterFiterByCompetencyName, beforeFiterByCompetencyName,"Before and After Competency Name is equals after using Filter By All Competency")
        }),

        it('Filter Session using All Sessions in Past Sessions Page', async () => {
            const beforeFiterBySessionName = await sessionsPage.getSessionNameFromFirstSession()
            sessionsPage.clickOnAllSessionsDropdown()
                .selectSessionsFromDropdown(beforeFiterBySessionName)
            const afterFiterBySessionsName = await sessionsPage.getSessionNameFromFirstSession()
            sessionsPage
                .assert.equal(afterFiterBySessionsName, beforeFiterBySessionName,"Before and After Session Name is equals after using Filter By All Sessions")

        }),
        it('Verify user should be able to filter session using All Time in Past Session page', async () => {
            const firstSessionDateBeforeFilter = await sessionsPage.getDateFromFirstSessions();
            sessionsPage.selectDateFromCalenderPastSessions();
            const firstSessionDateAfterFilter = await sessionsPage.getDateFromFirstSessions();
            sessionsPage.assert.equal(firstSessionDateAfterFilter, firstSessionDateBeforeFilter, "Before and After Session Time is equals after using Filter By All Time")
        }),
        after(function (browser) {
            browser.end();
        })
});
