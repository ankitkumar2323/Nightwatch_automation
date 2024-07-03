import { NightwatchBrowser } from "nightwatch";
import{LoginPage} from '../../../page-objects/login';
import{RewardsPage} from '../../../page-objects/LeaderboardRewards/RewardSectionPage';
import globalsData from '../../../../globals';

let sessionsPage: RewardsPage;
describe("Rewards Page Frontend Automation with Typescript for User", () => {
    
    before((browser: NightwatchBrowser) => {
        const page = browser.page.login()as LoginPage;
        page
            .maximizeWindow()
            .navigate()
            .enterCredentials(browser.globals.employeeUserName,browser.globals.employeePassword)
            .signIn()
            .assert.urlContains("my-dashboard")

            sessionsPage = browser.page.LeaderboardRewards.RewardSectionPage() as RewardsPage;
            
    }),

    // Verify that user should be able to click reward button and able to see reward page (TC-273) 
    it("Should be able to see rewards page on expanding leaderboard and clicking rewards button", () => {
        sessionsPage
        .clickOnLeaderboardButton()
        .clickOnRewardsButton()
        .assert.urlContains("/rewards/list");
    }), 

    // Verify user should able to see and switch between Two buttons (TC-274) 
    it("Should be able to switch between forCompetency and Individual Buttons", () => {
        sessionsPage
           .clickOnForCompetencyButton()
           .assert.cssProperty('@currentButton','background-color',globalsData.rewardSectionMessages.colorCode)
           .clickOnIndividualButton()
           .assert.cssProperty('@currentButton','background-color',globalsData.rewardSectionMessages.colorCode)   
    }),

    // Verify that user should be able to see all the Rewards present in Rewards page (TC-275)
    it("Should be able to see reward points on loading all rewards", () => {
        const resultMessage = "pts"
        sessionsPage
            .assert.textContains('@points',resultMessage)   
            .getText('@value_of_points', function(result) {
                const value = typeof result.value === 'string' ? parseInt(result.value, 10) : 0; // Parse the text content to an integer
                this.assert.ok(value > 0, 'Value is greater than 0'); // Assert that the value is greater than 0
              });
          
    }),

    // Verify that user should able to click on Redeem button (TC-276)
    it("Should be able to click on redeem button", () => {
        sessionsPage
           .clickOnRedeemButton()
           .assert.textContains('@popup',globalsData.rewardSectionMessages.popupMessage)
    }),

     // Verify that user should able to click on NO button (TC-278) 
     it("Should be able to close popup message box when no button is clicked", (browser: NightwatchBrowser) => {
        sessionsPage
            .clickOnNoButton()
            .assert.not.elementPresent('@popupBox')
                
    }),

    // Verify that user should able to click on yes button (TC-277) 
    it("Should display message when yes button is clicked", () => {
        sessionsPage
            .waitForElementPresent('@redeemButton')
            .clickOnRedeemButton()
            .clickOnYesButton()
            .assert.textContains('@message',globalsData.rewardSectionMessages.redeemMessage)
                
    }),
    
    after((browser: NightwatchBrowser) => {
        browser.end();
    })
})
