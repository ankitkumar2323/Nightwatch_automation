import {NightwatchBrowser} from 'nightwatch';
import { TechHubPage } from '../../../../page-objects/techhub/EmployeeUser/techHubPage';

describe('Go1 Percent Frontend Test cases', () => {

    //perform login ang go in TechHub Page through the profile
    beforeEach((browser: NightwatchBrowser) => {
        browser
            .window.maximize() 
            .page.techhub.EmployeeUser.techHubPage()
            .navigate()
            .enterCredentials()
            .signIn()
            .elementClick('@settings')
            .elementClick('@profile')
            .pause(5000)
            .elementClick('@techHub')
    });

    //end each and evry test case
    afterEach((browser: NightwatchBrowser) => {
        browser.end()
    });

    //check all techHubs button , pending button, request/Repo branch button and search bar are displayed
    it('verify all the fields in techhub page',() => {
        var fields = browser.page.techhub.EmployeeUser.techHubPage();
        fields
            .displayAllTechHub()
            .assert.textContains('@allTechHubs', 'All TechHubs')
            .displayPendingpage()
            .assert.textContains('@pending', 'Pending')
            .displayTemplatePage()
            .isVisible('@requestRepoBranch')
            .assert.textContains('@requestRepoBranch', 'Request A Repo/Branch')
            .isVisible('@searchBar')
    });

    //Disable submit button without filling mandatory fields
    it('Verify user should not be able to Request a Repo or Branch without filling mandatory field', () => {
        var submitButtonDisable = browser.page.techhub.EmployeeUser.techHubPage();
        submitButtonDisable
            .disableSubmitButtonInRequestRepo()
            .assert.attributeEquals('@submitButton','disabled', 'true')
    });

    //able to see required characters and repo name error
    it('Verify user should be able to see the minimum 15 characters required error', () => {
        var repoNameError = browser.page.techhub.EmployeeUser.techHubPage();
        repoNameError
            .requiredNameInRepo()
            .assert.textContains('@errorMessage','Repo name is Required')
            .requiredCharactersInRepo()
            .assert.textContains('@errorMessage','Minimum 15 characters required !')
    });

    //able to see the required technology error
    it('Verify user should be able to see the Technology is required error', () => {
        var technologyError = browser.page.techhub.EmployeeUser.techHubPage();
        technologyError
        .technologyRequiredError()
        .assert.textContains('@errorMessage','Technology is Required')
    });

    //able to submit Request Repo branch successfully with filled all mandatory fields
    it('Verify user should be able to Request a Repo or Branch successfully' , () => {
        var enableSubmitButton = browser.page.techhub.EmployeeUser.techHubPage();
        enableSubmitButton
        .requestRepoBranchSubmission()
        .assert.textContains("@submissionPopupAlert", 'Submitted Successfully')
    });

    //able to submit new branch from existing repo
    it('Verify user should be able to Request a Repo or Branch and New Branch from existing repo', (browser : NightwatchBrowser) => {
        var checkBox = browser.page.techhub.EmployeeUser.techHubPage();
        checkBox
        .newBranchFromExistingRepo()
        .execute(function () {
            document.querySelector('input[formcontrolname="isNewBranch"]')?.scrollIntoView()
        })
        .waitForElementVisible('@isNewBranch')
        .click('@isNewBranch')
        .enableSubmitButton()
        .assert.textContains("@submissionPopupAlert", 'Submitted Successfully')
        .end()
    });

    //able to click cancel button
    it('Verify user should be able to click cancel button on Request Repo or Branch page', () => {
        var cancelButton = browser.page.techhub.EmployeeUser.techHubPage();
        cancelButton
        .clickCancelButton()
    });

    //submit button disable without filling mandatory fields in draft template
    it('Verify user should not be able to submit the draft without filling mandatory fields', () => {
        var draftFields = browser.page.techhub.EmployeeUser.techHubPage();
        draftFields
        .draftAndPendingButton()
        .draftSubmitButtonDisable()
        .assert.attributeEquals('@submitButton', 'disabled', 'true')
    });

    //able to see required characters error for title and caption
    it('Verify user should be able to see minimum requirement error messages for Title, Caption', () => {
        var titleCaptionErrorMessage = browser.page.techhub.EmployeeUser.techHubPage();
        titleCaptionErrorMessage
        .draftAndPendingButton()
        .requiredCharactersForDescription()
        .assert.textContains('@draftDescriptionBoxErrormessage', 'Minimum 100 characters required !')
        .requirementCharactersForTitle()
        .assert.textContains('@titleCharactersError', 'Minimum 15 characters required !')
        .requiredCharactersForCaption()
        .assert.textContains('@titleCharactersError', 'Minimum 15 characters required !')
    });

    //blank field error messages for all the fields in draft template
    it('Verify user should be able to see blank fields error messages', () => {
        var blankFields = browser.page.techhub.EmployeeUser.techHubPage();
        blankFields
        .draftAndPendingButton()
        .requiredTitle()
        .assert.textContains('@errorMessage', 'Title is Required')
        .requiredCaption()
        .assert.textContains('@captionRequiredErrorMessage', 'Caption is Required')
        .execute(function() {
            document.querySelector('textarea[formcontrolname="description"]')?.scrollIntoView();
        })
        .requiredDescription()
        .assert.textContains('@descriptionBlankFieldError', 'Description is Required')
        .requiredBranchName()
        .assert.textContains("@branchBlankFieldErrorMessage", 'Branch Name is Required')
        .requiredTags()
        .assert.textContains('@tagsBlankFieldErrorMessage', 'Tags is Required')
        .requiredCategory()
        .assert.textContains('@categoryRequiredErrorMessage', 'Category is Required')
        .requiredBaseLanguage()
        .assert.textContains('@baselanguageRequiredErrorMessage', 'Base Language is Required')
    });

    //error messages for required category and language
    it('Verify user should be able to see Category and Language is required error message', () => {
        var categoryAndLanguageError = browser.page.techhub.EmployeeUser.techHubPage();
        categoryAndLanguageError
        .draftAndPendingButton()
        .execute(function () {
            document.querySelector('select[id="category"]')?.scrollIntoView();
        })
        .requiredCategoryAndLanguage()
        .assert.textContains('@categoryRequiredErrorMessage', 'Category is Required')
        .assert.textContains('@baselanguageRequiredErrorMessage', 'Base Language is Required')
    });

    //enable submit button with filled mandatory fields in draft template
    it('Verify user should be able to submit the draft by filling mandatory fields only', () => {
        var fields = browser.page.techhub.EmployeeUser.techHubPage();
        fields
            .draftAndPendingButton()
            .setBranchValue()
            .setTagsValue()
            .setCategoryValue()
            .setBaseLanguageValue()
            .setTitleValue()
            .setCaptionValue()
            .setDescriptionValue()
            .pause(5000)
            .enableSubmitButton()
            .assert.textContains("@submissionPopupAlert", 'Template successfully submitted, please wait for your studio head to review it.')
    });

    //enable submit button with filled mandatory fields in draft template
    it('Verify user should be able to submit the draft by filling all fields', () => {
        var allFields = browser.page.techhub.EmployeeUser.techHubPage();
        allFields
        .waitForElementVisible('@pendingButton', 10000)
        .draftAndPendingButton()
        .setBranchValue()
        .setTagsValue()
        .setCategoryValue()
        .setBaseLanguageValue()
        .setOtherLanguageValue()
        .setBlogUrlValue()
        .setTitleValue()
        .setCaptionValue()
        .setDescriptionValue()
        .pause(5000)
        .enableSubmitButton()
        .assert.textContains("@submissionPopupAlert", 'Template successfully submitted, please wait for your studio head to review it.')
    });
})