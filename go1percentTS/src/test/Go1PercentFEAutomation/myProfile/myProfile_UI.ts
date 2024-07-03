import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import{LoginPage} from '../../../page-objects/login';
var userName = browser.globals.userName;
var password = browser.globals.password;
userName = 'testadmin';
password = 'testadmin';

const profilePicUploadSuccessMsg = "Profile picture updated successfully!";

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
 
    it("No Badges Earned' message when no badges were earned to their profile", function (browser) {

        browser.elements('xpath', "@BadgeCounts", function (result) {
            if (result.status === 0) {
                let Pending = result.value;
                let Total = Pending.length;
                console.log('Total Badge numbers are : ', Total, ' ; if Badge count is 0 then No badge present.');
            }
        })

    });
    it('View the profile picture along with the monthly rank', function (browser) {
        myProfile
            .pause(2000)
            .assert.elementPresent('@ProfilePic', 'Profile Pic exist')
            .assert.elementPresent('@ViewMonthlyRank', 'Monthly Rank exist');
    });
    it('Change their profile picture by clicking on update profile page', function (browser) {
        myProfile

            .waitForElementVisible('@UpdateProfilepic', 30000)
            .ClickOnUpdateProfilePic()
            .waitForElementVisible('@ProfilePicSuccessMsg', 30000)
            .assert.textContains('@ProfilePicSuccessMsg', profilePicUploadSuccessMsg, 'Profile picture updated successfully')
            // .expect('@ProfilePicSuccessMsg').to.be.eq(profilePicUploadSuccessMsg)
            .pause(2000);
    });
    it('Name and competency name on the profile page', function (browser) {
        myProfile
            .waitForElementVisible('@UserName', 30000)
            .assert.elementPresent('@UserName', 'User Name Visible')
            .assert.elementPresent('@CompetencyName', 'Competency Name Visible');

    });
    it('View the points, overall rank and monthly score on the profile page', function (browser) {
        myProfile
            .waitForElementVisible('@Points', 7000)
            .assert.elementPresent('@Points', 'User Points Visible')
            .assert.elementPresent('@OverallRank', 'User OverallRank Visible')
            .assert.elementPresent('@MonthlyScore', 'User Monthly Score Visible')

    });

    it('View the reward if redeemed', function (browser) {
        myProfile
            .waitForElementVisible('@rewardImg', 10000)
            .assert.elementPresent('@rewardImg', 'Reward redeemed for the user')
            //.assert.elementPresent('@ViewRewardBtn', 'No reward redeemed for the user');



    });
    it('View all the rewards redeemed by him/her', function (browser) {
        myProfile
            .waitForElementVisible('@rewardImg', 10000)
            .assert.elementPresent('@rewardImg', 'All redeemed reward for the user displyed')
            //.assert.elementPresent('@ViewRewardBtn', 'No reward redeemed for the user');


    });
    it('View the badges and the count in the badges section', function (browser) {

        browser.elements("xpath", "@BadgeCounts", function (result) {
            if (result.status === 0) {
                let Pending = result.value;
                let Total = Pending.length;
                console.log('Total Badge numbers are : ', Total, ' ; if Badge count is 0 then No badge present.');


            }
        })
    });
    it('See month and score and rank by clicking on the badges', function (browser) {
        myProfile
            
            .ClickOnBadge()
            .pause(2000)
            .assert.elementPresent('@BadgeRank', 'Badge Rank visible for the user')
            .assert.elementPresent('@BadgeMonth', 'Badge Month visible for the user')
            .assert.elementPresent('@BadgeScore', 'Badge Score visible for the user')
            .ClickOnBadgeQuit();

    });

});
