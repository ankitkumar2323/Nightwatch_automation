const globalsData = require('../../../globals')
const sessionsPage = browser.page.LeaderboardRewards.RewardSectionPage()
const imageContainer = ".ImageMinWidthClass > input"
const path = require('path');

describe("Rewards Page Frontend Automation", () => {
    before(function () {
        const user = "Test Admin"
        browser
            .window.maximize()
            .page.login()
            .navigate()
            .enterCredentials(browser.globals.adminUserName,browser.globals.adminPassword)
            .signIn()
            .assert.urlContains("my-dashboard")
            sessionsPage.assert.textContains('@userType',user);
    });
    //  Verify that Admin should able to see Reward section (TC-280) 
    it("Should display rewards tab on expanding leaderboard", () => {
        sessionsPage
        .clickOnLeaderboardButton()
        .waitForElementPresent('@rewardsButton')
        .assert.elementPresent('@rewardsButton')
                
    }),

    // Verify that Admin should be able to see rewards page after clicking reward tab(TC-281)
    it("Should display rewards page on clicking rewards button", () => {
        sessionsPage
        .waitForElementPresent('@rewardsButton')
        .clickOnRewardsButton()
        .assert.urlContains("/rewards/list");
    }),

    // Verify that Admin should able to see all rewards present in reward page (TC-282)
    it("Should be able to see all rewards for admin on scrolling", (browser) => {
        browser
        .execute(function() {
            window.scrollTo(0, document.body.scrollHeight);
        })
        .execute(function() {
            window.scrollTo(0, 0);
        })
        sessionsPage
        .waitForElementPresent('@lastReward',8000)
        .assert.elementPresent('@lastReward')
     }),
   
    // Verify that Admin should able to switch between forCompetency from Individual (TC-283)  
    it("Should be able to switch between forCompetency from Individual Buttons", () => {
        sessionsPage
           .waitForElementPresent('@forCompetencyButton')
           .clickOnForCompetencyButton()
           .waitForElementPresent('@currentButton')
           .assert.cssProperty('@currentButton','background-color',globalsData.rewardSectionMessages.colorCode)
    }),

    // Verify that admin should be able to click on edit option in any reward (TC-284) 
    it("Should be able to open update rewards page on clicking edit button", () => {
        const updateMessage = "Update Reward"
        sessionsPage
           .clickOnIndividualButton()
           .clickOnEditButton()
           .waitForElementPresent('@updatePage')
           .assert.textContains('@updatePage',updateMessage)
    }),
          
    //  Verify that Admin should be able to see delete popup for cross button (TC-285)
    it("Should be able to see delete popup for cross button", () => {
        const title = "Delete"
        sessionsPage
           .moveToElement('@crossButton', 1, 1)
           .getAttribute('@crossButton', 'title', function(result) {
            this.assert.equal(result.value, title);
           })
         
   }),

   // Verify that admin should be able to edit Reward description (TC-289) 
    it("Should be able to see message on updating reward description", () => {
        sessionsPage
           .waitForElementPresent('@rewardDescription')
           .setValue('@rewardDescription', 'testing reward description')
           .clickOnUpdateButton()
           .waitForElementPresent('@updateMessage')
           .assert.textContains('@updateMessage',globalsData.rewardSectionMessages.successMessage)
    }),

    //  Verify that admin should be able to edit Reward name and able to click on update button (TC-290)
    it("Should be able to see message on updating reward name", () => {
        sessionsPage
           .waitForElementPresent('@editButton')
           .clickOnEditButton()
           .waitForElementPresent('@rewardName',3000)
           .setValue('@rewardName', 'testing reward name demo')
           .clickOnUpdateButton()
           .assert.textContains('@updateMessage',globalsData.rewardSectionMessages.successMessage)
    }),

    //  Verify that admin should be able to increase or decrease Required points (TC-291)
    it("Should be able to increase or decrease required points", () => {
        sessionsPage
           .waitForElementPresent('@editButton',6000)
           .clickOnEditButton()
           .waitForElementPresent('@requiredPoints',3000)
           .clickOnRequiredPoint()
           .getValue("@requiredPoints",function (result) {
            currentValue = parseInt(result.value);
            updatedValue = currentValue + 1;
            this.setValue("input[type='number']",updatedValue)
           })
            .clickOnUpdateButton()
            .assert.textContains('@updateMessage', globalsData.rewardSectionMessages.successMessage)
        }),
  
    //  Verify that admin should be able to increase or decrease stock quantity (TC-292)
    it("Should be able to increase or decrease stock quantity for admin", () => {
        let updatedValue;
        sessionsPage
       .waitForElementPresent('@editButton',6000)
       .clickOnEditButton()
       .waitForElementPresent('@stockQuantity',3000)
       .clickOnStockQuantity()
       .getValue('@stockQuantity', function (result) {
           currentValue = parseInt(result.value)
            updatedValue = currentValue + 1;
        })
        .perform((done) => {
            sessionsPage
            .clearValue('@stockQuantity')
            .setValue('@stockQuantity', updatedValue)
            .waitForElementPresent('@updateButton')
            .clickOnUpdateButton()
            .assert.textContains('@updateMessage', globalsData.rewardSectionMessages.successMessage);
            done()       
        })
    }),

    // Verify that admin should be able to delete existing pic in update rewards page (TC-286)   
    it("Should be able to see message on clicking cross button on image", () => {
        sessionsPage
           .waitForElementPresent('@editButton',6000)
           .clickOnEditButton()
           .waitForElementPresent('@crossButton',3000)
           .clickOnCrossButton()
           .waitForElementPresent('@imageUploadMessage')
           .assert.textContains('@imageUploadMessage',globalsData.rewardSectionMessages.imageUploadMessage)
    }),

    // Verify that admin should be able to upload new image to existing reward (TC-288)
    it("Should be able to upload new image to existing reward image", () => {
        const absolutePath = path.resolve(__dirname, '../../../helpers/Go1PercentFEAutomation/LeaderboardRewards/imageFiles/eardopes.jpg');
        sessionsPage
            .waitForElementPresent('@imageUploadMessage');
            browser
                .isEnabled(imageContainer, function () {
                        browser.uploadFile(imageContainer, absolutePath);
                    });
        sessionsPage  
            .clickOnUpdateButton()
            .assert.textContains('@updateMessage', globalsData.rewardSectionMessages.successMessage)
    }),

   //  Verify that admin should not be able to add any other extension files (TC-287)
    it("Should be able to see popup message on uploading invalid format image", () => {
        const absolutePath = path.resolve(__dirname, '../../../helpers/Go1PercentFEAutomation/LeaderboardRewards/imageFiles/giphy1.gif');
        sessionsPage
            .waitForElementPresent('@editButton',6000)
            .clickOnEditButton()
            .clickOnCrossButton()
            .waitForElementPresent('@imageUploadMessage')
            browser
            .isEnabled(imageContainer, function () {
                    browser.uploadFile(imageContainer, absolutePath);
                });
        sessionsPage    
            .assert.textContains('@imageFormatMessage', globalsData.rewardSectionMessages.imageFormatFailureMessage)
    }),

    //  Verify that admin should not be able to add any image files of invalid size            
     it("Should be able to see popup message on uploading image of invalid size", () => {
        const absolutePath = path.resolve(__dirname, '../../../helpers/Go1PercentFEAutomation/LeaderboardRewards/imageFiles/nature.jpg');
        sessionsPage
            .waitForElementPresent('@imageUploadMessage')
            browser
            .isEnabled(imageContainer, function () {
                    browser.uploadFile(imageContainer, absolutePath);
                });
        sessionsPage    
            .assert.textContains('@imageInvalidSize', globalsData.rewardSectionMessages.imageInvalidSizeMessage)
    }),

    after(function (browser) {
        browser.end();
    })
})   
