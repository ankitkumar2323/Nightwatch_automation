module.exports = {
    url: "",

    elements: {
        leaderboardButton: "[src='../../../assets/Icons/leaderboard.svg']",     
        rewardsButton: ".nav.subMenu li a[href='/rewards/list']",
        points: "span[class='fs-4']",
        value_of_points: "span[class='font-weight-bolder']",
        forCompetencyButton: "a[class='cursor-pointer']",
        individualButton: "a[class='cursor-pointer']",
        redeemButton: ".my-1.reedeem-btn",
        popup: ".content.text-center.overall-txt-color.mt-4.mb-3",
        yesButton: "button[class='btn btn-primary m-2']",
        noButton: "button[class='btn btn-secondary m-2']",
        message: "div[aria-label='Hi, you have redeemed the reward']",
        settings: "app-dropdown-wrapper i[class='material-icons user-icon']",
        logout: "div[class='d-flex py-1'] span"      ,
        editButton: "div .editIcon span.material-icons",
        updatePage: ".modal-title.pull-left.ms-2",
        crossButton: "i[title='Delete']",
        imageUploadMessage: "div[class='fileUploadMsg'] span",
        rewardDescription: ".form-control.reward-controls.ng-untouched.ng-pristine.ng-valid[rows='5']",
        updateButton: "#updateButton",
        updateMessage: "div[aria-label='Reward was successfully updated!']",
        imageFormatMessage: "div[aria-label='The acceptable file formats are jpeg, jpg and png.']",
        imageInvalidSize: "div[aria-label='File size is more than 500 KB.']",
        rewardName: "input[type='text']",
        requiredPoints: "input[formcontrolname='pointsNeededToRedeem']",
        stockQuantity: "input[formcontrolname='quantity']",
        currentButton: ".cursor-pointer.newTabs",
        popupBox:".confirm",
        userType:"h4 span:nth-child(2)",
        lastReward: " div[class='col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-12 mt-3 card rewrdlist d-flex justify-content-center align-items-center']:last-child",
    },
    commands: [{
        clickOnLeaderboardButton() {
            return this
                .waitForElementVisible('@leaderboardButton', 5000)
                .click("@leaderboardButton")
        },
        clickOnRewardsButton() {
            return this
                .waitForElementVisible('@rewardsButton', 5000)
                .click('@rewardsButton')
        },
        clickOnForCompetencyButton() {
            return this
                .waitForElementVisible('@forCompetencyButton',6000)
                .click('@forCompetencyButton')
        },
        clickOnIndividualButton() {
            return this
                .waitForElementVisible('@individualButton',5000)
                .click('@individualButton')
        },
        clickOnRedeemButton() {
            return this
                .waitForElementVisible('@redeemButton',5000)
                .click('@redeemButton')
        },
        clickOnYesButton() {
            return this
                .waitForElementVisible('@yesButton',5000)
                .click('@yesButton')
        },
        clickOnNoButton() {
            return this
                .waitForElementVisible('@noButton',5000)
                .click('@noButton')
                
        },
        clickOnLogoutButton() {
            return this
               .waitForElementVisible('@settings',5000)
               .click('@settings')
               .pause(2000)
               .click('@logout')
        },
        clickOnEditButton() {
            return this
                .waitForElementVisible('@editButton',6000)
                .click('@editButton')
                
        },
        clickOnCrossButton() {
            return this
                .waitForElementVisible('@crossButton',5000)
                .click('@crossButton')
                
        },
        clickOnImageUploadMessageButton() {
            return this
                .waitForElementVisible('@imageUploadMessage',5000)
                .click('@imageUploadMessage') 
        },
        clickOnUpdateButton() {
            return this
                .waitForElementVisible('@updateButton',6000)
                .click('@updateButton')      
        },
        clickOnRequiredPoint() {
            return this
                .waitForElementVisible('@requiredPoints',7000)
                .click('@requiredPoints')    
        },
        clickOnStockQuantity() {
            return this
                .waitForElementVisible('@stockQuantity',7000)
                .click('@stockQuantity')    
        },

    }]
};