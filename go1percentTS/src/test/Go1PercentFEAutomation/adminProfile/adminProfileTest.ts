import { NightwatchAPI } from "nightwatch";

describe('Admin Profile Test Cases', ()=>{
    const dashboardPage = browser.page.adminProfilePage.dashboard();
    const adminProfilePage = browser.page.adminProfilePage.adminProfile();

    before ((browser) => {
        const loginPage = browser.page.loginGo1();

        loginPage
        .maximizeWindow()
            .navigate()
            .enterCredentials(browser.globals.userName, browser.globals.password)
            .waitForElementVisible('@signIn', 2000)
            .signIn();
    }),

    it('Verify that login is successful and we are on dashboard page', ()=>{
        browser.assert.urlContains('my-dashboard');
    })

    it('Verify that user is able to open the admin profile from dasboard page' , (browser:NightwatchAPI) => {
        
        dashboardPage.clickImage();
        browser.assert.urlContains('my-profile')
        dashboardPage.assert.visible('@badgeText');
    })

    it('Verify the test admin details from the profile page', async (browser) => {
        const adminPointsText = await adminProfilePage.adminProfileGetText('@adminPoints');
        browser.assert.equal(adminPointsText, "0");
        const adminRankText = await adminProfilePage.adminProfileGetText('@adminRank');
        browser.assert.equal(adminRankText, '1');
        const adminMonthlyScoreText = await adminProfilePage.adminProfileGetText('@adminMonthlyScore');
        browser.assert.equal(adminMonthlyScoreText, '3355');
    })

}) 
    