import { PageObjectModel, EnhancedPageObject } from 'nightwatch';
import { NightwatchBrowser } from 'nightwatch'

const techHubCommands = {
    enterCredentials(this: TechHubPage) {
        return this
            .waitForElementVisible('@emailInput')
            .setValue('@emailInput', 'testemployee')
            .pause(1000)
            .setValue('@passwordInput', 'testemployee')
            .pause(1000)
    },

    signIn(this: TechHubPage) {
        return this
            .click("@signIn")
    },

    elementClick(this: TechHubPage, selector: string) {
        return this
            .waitForElementVisible(selector)
            .click(selector)
    },

    displayAllTechHub(this: TechHubPage) {
        return this
            .waitForElementVisible('@allTechHubs')
            .isVisible('@allTechHubs')
    },

    displayPendingpage(this: TechHubPage) {
        return this
            .waitForElementVisible('@pending')
            .isVisible('@pending')
    },

    displayTemplatePage(this: TechHubPage) {
        return this
            .waitForElementVisible('@templates')
            .isVisible('@templates')
    },

    disableSubmitButtonInRequestRepo(this: TechHubPage) {
        return this
            .waitForElementVisible('@requestRepoBranch')
            .click('@requestRepoBranch')
            .waitForElementVisible('@repoName')
            .setValue('@repoName', 'TestingTestingHub')
    },

    requiredNameInRepo(this: TechHubPage) {
        return this
            .waitForElementVisible('@requestRepoBranch')
            .click('@requestRepoBranch')
            .waitForElementVisible('@repoName')
            .click('@repoName')
            .waitForElementVisible('@selectTechnology')
            .click('@selectTechnology')
    },

    requiredCharactersInRepo(this: TechHubPage) {
        return this
            .click('@repoName')
            .setValue('@repoName', 'testi')
    },

    technologyRequiredError(this: TechHubPage) {
        return this
            .waitForElementVisible('@requestRepoBranch')
            .click('@requestRepoBranch')
            .waitForElementVisible('@selectTechnology')
            .click('@selectTechnology')
            .click("@descriptionBox")
    },

    requestRepoBranchSubmission(this: TechHubPage) {
        const uniqueName = `TestingNightwatchTestcase1-${Math.floor(Math.random() * 1000000)}`;
        return this
            .waitForElementVisible('@requestRepoBranch')
            .click('@requestRepoBranch')
            .waitForElementVisible('@repoName')
            .setValue('@repoName', uniqueName)
            .waitForElementVisible('@selectTechnology')
            .click('@selectTechnology')
            .waitForElementVisible('@chooseTechnology')
            .click('@chooseTechnology')
            .waitForElementVisible('@descriptionBox')
            .setValue('@descriptionBox', 'jhgfghjkhgyftdrfghbgvftcdtghjnkmjhgyftghjnkhbgyvftcdrfgvhbjnhbgvfcdrcfgvhbjnhbgvfcrdfcgvhbjnknhbgvtfcdftgvhbjnknhbgvfcttgvh')
            .waitForElementVisible('@submitButton')
            .isEnabled('@submitButton')
            .click('@submitButton')
            .waitForElementVisible("@submissionPopupAlert")
    },

    newBranchFromExistingRepo(this: TechHubPage) {
        return this
            .waitForElementVisible('@requestRepoBranch')
            .click('@requestRepoBranch')
            .waitForElementVisible('@repoName')
            .setValue('@repoName', 'TestingTestingHub')
            .waitForElementVisible("@selectTechnology")
            .click('@selectTechnology')
            .waitForElementVisible('@chooseTechnology')
            .click('@chooseTechnology')
            .waitForElementVisible('@descriptionBox')
            .setValue('@descriptionBox', 'jhgfghjkhgyftdrfghbgvftcdtghjnkmjhgyftghjnkhbgyvftcdrfgvhbjnhbgvfcdrcfgvhbjnhbgvfcrdfcgvhbjnknhbgvtfcdftgvhbjnknhbgvfcttgvh')
            .waitForElementVisible('input[formcontrolname="isNewBranch"]')
    },

    enableSubmitButton(this: TechHubPage) {
        return this
            .waitForElementVisible('@submitButton')
            .isEnabled('@submitButton')
            .click('@submitButton')
            .waitForElementVisible("@submissionPopupAlert", 5000)
    },

    clickCancelButton(this: TechHubPage) {
        return this
            .waitForElementVisible('@requestRepoBranch')
            .click('@requestRepoBranch')
            .waitForElementVisible('@cancelButton')
            .isEnabled('@cancelButton')
            .click('@cancelButton')
            .waitForElementVisible('@requestRepoBranch')
            .isVisible('@requestRepoBranch')
    },

    draftAndPendingButton(this: TechHubPage) {
        return this
            .waitForElementVisible('@pendingButton')
            .click('@pendingButton')
            .waitForElementVisible('@draftButton')
            .click('@draftButton')
    },

    draftSubmitButtonDisable(this: TechHubPage) {
        return this
            .waitForElementVisible('@titleName')
            .setValue('@titleName', 'TestingTestingHub')
    },

    requirementCharactersForTitle(this: TechHubPage) {
        return this
            .waitForElementVisible('@titleName')
            .setValue('@titleName', 'Testing')
    },

    requiredCharactersForCaption(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftCaption')
            .setValue('@draftCaption', 'caption')
    },

    requiredCharactersForDescription(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftDescriptionBox')
            .setValue('@draftDescriptionBox', 'sdfsd')
    },

    requiredTitle(this: TechHubPage) {
        return this
            .waitForElementVisible('@titleName')
            .click('@titleName')
            .click('@draftCaption')
    },

    requiredCaption(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftCaption')
            .click('@draftCaption')
            .click('@titleName')
    },

    requiredDescription(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftDescriptionBox')
            .click('@draftDescriptionBox')
            .click('@draftBranch')
    },

    requiredBranchName(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftBranch')
            .click('@draftBranch')
            .click('@draftDescriptionBox')
    },

    requiredTags(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftTags')
            .click('@draftTags')
            .click('@draftDescriptionBox')
    },

    requiredCategory(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftCategory')
            .click('@draftCategory')
            .click('@draftDescriptionBox')
    },

    requiredBaseLanguage(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftBaseLanguage')
            .click('@draftBaseLanguage')
            .click('@draftDescriptionBox')
    },

    requiredCategoryAndLanguage(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftCategory')
            .click('@draftCategory')
            .click('@draftCategory')
            .waitForElementVisible('@draftOtherLanguage')
            .click('@draftOtherLanguage')
            .waitForElementVisible('@draftBaseLanguage')
            .click('@draftBaseLanguage')
            .click('@draftBaseLanguage')
            .waitForElementVisible('@draftOtherLanguage')
            .click('@draftOtherLanguage')
    },

    setTitleValue(this: TechHubPage) {
        return this
            .waitForElementVisible('@titleName')
            .setValue('@titleName', 'TestAutomationPurpose')
    },

    setCaptionValue(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftCaption')
            .setValue('@draftCaption', 'TestingCaptionForTemplate')
    },

    setDescriptionValue(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftDescriptionBox')
            .setValue('@draftDescriptionBox', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    },

    setBranchValue(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftBranch')
            .setValue('@draftBranch', 'main')
    },

    setTagsValue(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftTags')
            .setValue('@draftTags', 'tags')
    },

    setCategoryValue(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftCategory')
            .click('@draftCategory')
            .click("@chooseDraftCategory")
    },

    setBaseLanguageValue(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftBaseLanguage')
            .click('@draftBaseLanguage')
            .click('@chooseBaseLanguage')
    },

    setOtherLanguageValue(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftOtherLanguage')
            .setValue('@draftOtherLanguage', 'Akka')
    },

    setBlogUrlValue(this: TechHubPage) {
        return this
            .waitForElementVisible('@draftBlogUrl')
            .setValue('@draftBlogUrl', 'https://google.com')
    },
};

const techHubPage: PageObjectModel = {
    url: "https://nashtechglobal.qa.go1percent.com/my-dashboard",
    commands: [techHubCommands],
    elements: {
        emailInput: '#username',
        passwordInput: '#password',
        signIn: "#kc-login",
        settings: 'i[class="material-icons user-icon"]',
        profile: 'div[class = "d-flex py-1 mt-1"]',
        techHub: "li[class*='nav-item ']:nth-child(4)",
        allTechHubs: 'a[class="cursor-pointer newTabs"]',
        pending: 'a[class="cursor-pointer"]',
        templates: 'div[class="studio-member-card cursor-pointer my-4 px-2 py-3"]',
        requestRepoBranch: 'span.addRewardTxt',
        searchBar: 'input[class="ng-untouched ng-pristine ng-valid"]',
        submitButton: 'button[type="submit"]',
        repoName: 'input[formcontrolname="name"]',
        errorMessage: 'span[class = "errorMessage"]',
        submissionPopupAlert: "div[role='alert']",
        isNewBranchCheckBox: 'input[formcontrolname="isNewBranch"]',
        selectTechnology: "select[id='technology']",
        chooseTechnology: 'option:nth-child(22)',
        descriptionBox: 'textarea[formcontrolname="description"]',
        cancelButton: 'button[class="btn btn-primary button cancel-button mx-2"]',
        pendingButton: 'a[class="cursor-pointer"]',
        draftButton: 'h6[class="mb-0 rank status pendingStatus"]',
        titleName: 'input[formcontrolname="title"]',
        titleCharactersError: '.errorMessage',
        draftCaption: 'input[formcontrolname="caption"]',
        draftDescriptionBox: 'textarea[type = "text"]',
        draftDescriptionBoxErrormessage: 'div.form-group.mx-2 > span',
        draftCategory: 'select[id="category"]',
        draftOtherLanguage: 'input[formcontrolname="otherLanguages"]',
        draftBaseLanguage: 'select[formcontrolname="baseLanguage"]',
        descriptionBlankFieldError: "div[class='col form-group mb-4 mx-2'] span[class='errorMessage']",
        draftBranch: 'input[formcontrolname="branch"]',
        draftTags: 'input[formcontrolname="tags"]',
        chooseDraftCategory: "select[id='category'] option:nth-child(2)",
        chooseBaseLanguage: "select[id='baseLanguage'] option:nth-child(3)",
        draftBlogUrl: 'input[formcontrolname="infoUrl"]',
        isNewBranch: 'input[formcontrolname="isNewBranch"]',
        captionRequiredErrorMessage: {
            selector: "//span[contains(text(),'Caption is Required')]",
            locateStrategy: 'xpath'
        },
        branchBlankFieldErrorMessage: {
            selector: "//span[contains(text(),'Branch Name is Required')]",
            locateStrategy: 'xpath'
        },
        tagsBlankFieldErrorMessage: {
            selector: "//span[contains(text(),'Tags is Required')]",
            locateStrategy: 'xpath'
        },
        categoryRequiredErrorMessage: {
            selector: "//span[contains(text(),'Category is Required')]",
            locateStrategy: 'xpath'
        },
        baselanguageRequiredErrorMessage: {
            selector: "//span[contains(text(),'Base Language is Required')]",
            locateStrategy: 'xpath'
        }
    },
};

export default techHubPage;

export interface TechHubPage extends EnhancedPageObject<
    typeof techHubCommands,
    typeof techHubPage.elements> { }