import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import{LoginPage} from '../../../page-objects/login';
var userName = browser.globals.userName;
var password = browser.globals.password;
userName = 'testadmin';
password = 'testadmin';

describe("My Profile Page Frontend Automation", () => {
    
    const dashboardPage = browser.page.myProfile.dashboard();
    const myProfile = browser.page.myProfile.myProfilePage();


    beforeEach((client:NightwatchBrowser) => {
        // Create a page object and perform login actions
        const loginPage = browser.page.loginGo1();
        

        loginPage
        .maximizeWindow()
            .navigate()
            .enterCredentials(userName, password)
            .waitForElementVisible('@signIn', 2000)
            .signIn() 
            .assert.urlContains("my-dashboard", 'URL contains my-dashboard');

            
            
            dashboardPage.clickImage();
            browser.assert.urlContains("my-profile", 'URL contains my-profile')
 

    });
    afterEach(function (browser) {
        browser.end();
    });

    it('View rewards button is present on the profile page when no reward is redeemed till now', function (browser) {

        myProfile
         //In QA environment, all user have redeemed the rewards, so checking in production environment(Only GET methods)
         .navigate('https://nashtechglobal.go1percent.com/my-profile?id=656')
        .assert.elementPresent('@ViewRewardBtn','View Reward button exist');
          
    });

    it('Re-directed to the rewards page when he clicks on view rewards button', function (browser) {
        
        myProfile
            //In QA environment, all user have redeemed the rewards, so checking in production environment(Only GET methods)
            .navigate('https://nashtechglobal.go1percent.com/my-profile?id=656')
            .ClickOnRewardButton()
            .pause(1000)
            .assert.urlContains("rewards/list", 'View Rewards Page is present');


    });
    it('Re-directed to the rewards page and can able to edit the rewards as well', function (browser) {
        
        myProfile
            //In QA environment, all user have redeemed the rewards, so checking in production environment(Only GET methods)
            .navigate('https://nashtechglobal.go1percent.com/my-profile?id=656')
        
            .ClickOnRewardButton()
            .ClickOnRewardEditCancelBtn();
            

    });
    it('See view rewards list by clicking on the view rewards button', function (browser) {
        myProfile

         //In QA environment, all user have redeemed the rewards, so checking in production environment(Only GET methods)
         .navigate('https://nashtechglobal.go1percent.com/my-profile?id=656')
            .ClickOnRewardButton()
            .assert.urlContains("rewards/list", 'View Rewards list Page is visible');


    });
});