import { PageObjectModel, EnhancedPageObject } from 'nightwatch';



const myProfileElements = {
        Setting: "#navbar  div:nth-of-type(2) ul app-dropdown-wrapper i",
        MyProfile: "div[class='d-flex py-1 mt-1'] span",
        UpdateProfilepic: {

            selector: "//button[normalize-space()='Update Profile Picture']",
            locateStrategy: 'xpath',
        },


        UpdateProfilePicSaveButton: "div[class='mt-5'] button:nth-child(1)",
        ProfilePic: {
            locateStrategy: 'xpath',
            selector: '//div[@class="material-symbols-outlined no-profile"]'
        },

        ViewRewardBtn: ".btn.add-button.reedeem-btn.mt-5",
        ProfilePicSuccessMsg: "#toast-container",
        RewardEditBtn: "div[class='row me-2'] div:nth-child(1) div:nth-child(1) span:nth-child(1)",
        RewardEditCancelBtn: ".btn.btn-light",
        NoBadgeEarned: "div[class='d-flex flex-column align-items-center my-auto'] p",
        BadgesContainer: "div[class='d-flex justify-content-start align-items-center no-scroll-badges']",
        EachBadge: {
            locateStrategy: 'xpath',
            selector: "//div[@class='w-20']"
        },
        EachBadgeInside: "div[class='d-flex flex-column align-items-center outer-div']",
        NoProfilePic: {
            locateStrategy: 'xpath',
            selector: "//div[@id='img']//*[name()='svg']"
        },
        ProfilePicExist: {
            locateStrategy: 'xpath',
            selector: "//img[@id='img']"
        },
        ViewMonthlyRank: {
            locateStrategy: 'xpath',
            selector: "//div[@class='material-symbols-outlined hexSmall']//*[name()='svg']"
        },
        UserName: "div[class='d-flex flex-column align-items-center'] div h3",
        CompetencyName: "span.studio",
        Points : {
            selector : "//span[text()='Points']/preceding-sibling::h4",
            locateStrategy : 'xpath'
        },
        OverallRank : { 
            selector : " //span[text()='Overall Rank']/preceding-sibling::h4",
            locateStrategy : 'xpath'
        },
        MonthlyScore: "div[class='d-flex flex-column align-items-center points-section p-1'] h4[class='mt-2']",
        rewardImg: "img[alt='reward']",

        Badge: "app-my-profile > div > div:nth-of-type(2) > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(1)",
        BadgeRank: "modal-container div.modal-content > div > div:nth-of-type(1)",
        BadgeMonth: "modal-container div.modal-content > div > div:nth-of-type(2) > div >div >h6",
        BadgeScore: "div[class='info-div d-flex flex-column justify-content-center'] span[class='score-size']",
        BadgeQuit: "div[class='d-flex justify-content-between align-items-center'] div:nth-child(2)",
        BadgeCounts: {
            locateStrategy: 'xpath',
            selector: "//div[@class='w-20']"
        },
    };
    

 
    const myProfileCommands = {

        ClickOnBadgeQuit(this: MyProfilePage) {
            return this
                .waitForElementVisible('@BadgeQuit')
                .click('@BadgeQuit');
        },
        ClickOnBadge(this: MyProfilePage) {
            return this
                .waitForElementVisible('@Badge')
                .click('@Badge');
        },

        ClickOnUpdateProfilePic(this: MyProfilePage) {
            this
                .waitForElementVisible('@UpdateProfilepic')
                .click('@UpdateProfilepic')
                .waitForElementVisible('@UpdateProfilePicSaveButton')
                .click('@UpdateProfilePicSaveButton')
            return this
        },

        ClickOnMyProfile(this: MyProfilePage) {
            this
                .waitForElementVisible('@Setting')
                .click('@Setting')
                .waitForElementVisible('@MyProfile')
                .click('@MyProfile');
            return this
        },


        ClickOnProfilePic(this: MyProfilePage) {
            this
                .waitForElementVisible('@ProfilePic')
                .click('@ProfilePic')
            return this
        },
        ClickOnRewardButton(this: MyProfilePage) {
            this
                .waitForElementVisible('@ViewRewardBtn',30000)
                .click('@ViewRewardBtn');
            return this
        },
        waitForPageLoad(this: MyProfilePage) {
            return this
                .waitForElementVisible('body')
        },
        ClickOnRewardEditCancelBtn(this: MyProfilePage) {
            this
                .click('@RewardEditBtn')
                .pause(2000)
                .waitForElementVisible('@RewardEditCancelBtn',40000)
                .assert.elementPresent('@RewardEditCancelBtn','reward editable')
                .click('@RewardEditCancelBtn');
            return this

        },
        BadgeCheck(this: MyProfilePage) {
            return this
                .waitForElementVisible('@NoBadgeEarned')
                .assert.elementPresent('@NoBadgeEarned')
        },
        ViewUserCompetencyName(this: MyProfilePage) {
            this
                .waitForElementVisible('@UserName')
                .pause(3000)
                .waitForElementVisible('@CompetencyName')
            return this
        },
};



const myProfilePage: PageObjectModel = {
    elements: myProfileElements,
    commands: [myProfileCommands]
};


export default myProfilePage;
export interface MyProfilePage 
    extends EnhancedPageObject <
        typeof myProfileCommands,
        typeof myProfileElements
    > { }