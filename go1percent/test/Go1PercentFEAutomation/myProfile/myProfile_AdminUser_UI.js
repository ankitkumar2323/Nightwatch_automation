const DataSet = require('../../../globals');
//const MyProfilePage = require('../../page-objects/myProfilePage');
//const Login=browser.page.login();
var userName = browser.globals.userName;
var password = browser.globals.password;
userName = 'testadmin';
password = 'testadmin';
const profilePicUploadSuccessMsg = "Profile picture updated successfully!";

describe("My Profile Page Frontend Automation", () => {
    //this.timeout(25000)
    var myProfile = browser.page.myProfilePage();


    beforeEach(function (browser) {

        browser
            .window.maximize()
            //.maximizeWindow()
            .page.login()
            .navigate()
            .pause(3000)
            .enterCredentials(userName, password)
            //browser.pause(3000);
            .signIn()
            .assert.urlContains("my-dashboard", 'URL contains my-dashboard');
        myProfile
            //.page.myProfilePage()
            .pause(1000)
            .ClickOnMyProfile()
            .pause(1000)
            .assert.urlContains("my-profile", 'URL contains my-profile')

    });
    afterEach(function (browser) {//testadmin
        browser.end();
    });

    it('View rewards button is present on the profile page when no reward is redeemed till now', async function (browser) {

            await myProfile.element.find('@ViewRewardBtn').waitUntil('visible', {timeout: 3000, abortOnFailure: false},{message: 'View Reward button found.'});
          
    });

    it('Re-directed to the rewards page when he clicks on view rewards button', function (browser) {//testadmin
        myProfile
            
            //.waitForElementVisible()
            .pause(8000)
            .ClickOnRewardButton()
            .pause(4000)
            .assert.urlContains("rewards/list", 'You entered the View Rewards Page');


    });
    it('Re-directed to the rewards page and can able to edit the rewards as well', function (browser) {//testadmin
        myProfile
            
            .pause(8000)
            .ClickOnRewardButton()
            .pause(3000)
            .ClickOnRewardEditCancelBtn()
            .pause(2000)
            //.console.log("Rewards can be edit from admin user");
            

    });
    it('See view rewards list by clicking on the view rewards button', function (browser) {//testadmin
        myProfile

            .pause(8000)
            .ClickOnRewardButton()
            .pause(4000)
            .assert.urlContains("rewards/list", 'View Rewards list Page is visible');


    });
});