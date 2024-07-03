const { assert } = require('nightwatch');
const DataSet = require('../../../globals');
var userName = browser.globals.userName;
var password = browser.globals.password;
// userName = 'testemployee';
// password = 'testemployee';
const profilePicUploadSuccessMsg = "Profile picture updated successfully!";

describe("My Profile Page Frontend Automation", () => {
    //this.timeout(25000)
    var myProfile = browser.page.myProfilePage();


    beforeEach(function (browser) {

        browser
            .window.maximize()
            .page.login()
            .navigate()
            .pause(3000)
            .enterCredentials(userName, password)
            .signIn()
            .assert.urlContains("my-dashboard", 'URL contains my-dashboard');

        myProfile
            .pause(1000)
            .ClickOnMyProfile()
            .pause(1000)
            .assert.urlContains("my-profile", 'URL contains my-profile')

    });
    afterEach(function (browser) {
        browser.end();
    });

    it("No Badges Earned' message when no badges were earned to their profile", function (browser) {

        browser.elements('xpath', "//div[@class='w-20']", function (result) {
            if (result.status === 0) {
                let Pending = result.value;
                let Total = Pending.length;
                console.log('Total Badge numbers are : ', Total,' ; if Badge count is 0 then No badge present.');
            }
        })

    });
    it('View the profile picture along with the monthly rank', function (browser) {
        myProfile
            .waitForElementVisible('@ProfilePicExist', 5000)
            .assert.elementPresent('@ProfilePicExist', 'Profile Pic exist')
            .assert.elementPresent('@ViewMonthlyRank', 'Monthly Rank exist');
    });
    it('Change their profile picture by clicking on update profile page', function (browser) {
        myProfile

        .waitForElementVisible('@UpdateProfilepic', 7000)
            .ClickOnUpdateProfilePic()
            .waitForElementVisible('@ProfilePicSuccessMsg', 7000)
            .expect('@ProfilePicSuccessMsg').to.be.eq(profilePicUploadSuccessMsg)
            .pause(2000);
    });
    it('Name and competency name on the profile page', function (browser) {
        myProfile
            .waitForElementVisible('@UserName', 7000)
            .assert.elementPresent('@UserName', 'User Name Visible')
            .assert.elementPresent('@CompetencyName', 'Competency Name Visible');

    });
    it.only('View the points, overall rank and monthly score on the profile page', function (browser) {
        myProfile
            .pause(3000)
            .assert.elementPresent('@Points', 'User Points Visible')
            .assert.elementPresent('@OverallRank', 'User OverallRank Visible')
            .assert.elementPresent('@MonthlyScore', 'User Monthly Score Visible')

    });

    it('View the reward if redeemed', function (browser) {
        myProfile
            .waitForElementVisible('@RewardExist', 10000)
            .assert.elementPresent('@RewardExist', 'Reward redeemed for the user')
            .assert.elementPresent('@ViewRewardBtn', 'No reward redeemed for the user');

  

    });
    it('View all the rewards redeemed by him/her', function (browser) {
        myProfile
            .waitForElementVisible('@RewardExist', 10000)
            .assert.elementPresent('@RewardExist', 'All redeemed reward for the user displyed')
            .assert.elementPresent('@ViewRewardBtn', 'No reward redeemed for the user');


    });
    it.only('View the badges and the count in the badges section', function (browser) {

        browser.elements("xpath","@BadgeCounts", function (result) {
            if (result.status === 0) {
                let Pending = result.value;
                let Total = Pending.length;
                console.log('Total Badge numbers are : ', Total,' ; if Badge count is 0 then No badge present.');


            }
        })
    });
    it('See month and score and rank by clicking on the badges', function (browser) {
        myProfile
            .waitForElementVisible('@Badge', 10000)
            .ClickOnBadge()
            .pause(2000)
            .assert.elementPresent('@BadgeRank', 'Badge Rank visible for the user')
            .assert.elementPresent('@BadgeMonth', 'Badge Month visible for the user')
            .assert.elementPresent('@BadgeScore', 'Badge Score visible for the user')
            .ClickOnBadgeQuit();

    });

});
