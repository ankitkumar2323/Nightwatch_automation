module.exports = {
    /*
        perform login ang go in TechHub Page through the profile
     */
    beforeEach: function (browser) {
        browser
            .windowMaximize()
            .url("https://nashtechglobal.qa.go1percent.com/my-dashboard")

        var techHub = browser.page.techhub.EmployeeUser.techHubPage1();
        techHub
            .enterCredentials('testemployee', 'testemployee')
            .signIn()
            .elementClick('@settings')
            .elementClick('@profile')
            .elementClick('@techHub')
    },

    /**
        check all techHubs button , pending button, request/Repo branch button and search bar are displayed
     */

    'verify all the fields in techhub page': function (browser) {
        var fields = browser.page.techhub.EmployeeUser.techHubPage1();
        fields
            .displayAllTechHub()
            .assert.textContains('@allTechHubs', 'All TechHubs')
            .displayPendingpage()
            .assert.textContains('@pending', 'Pending')
            .displayTemplatePage()
            .isVisible('@requestRepoBranch')
            .assert.textContains('@requestRepoBranch', 'Request A Repo/Branch')
            .isVisible('@searchBar')
            .end()
    },

    /**
     * Disable submit button without filling mandatory fields
     */

    'Verify user should not be able to Request a Repo or Branch without filling mandatory field': function (browser) {
        var submitButtonDisable = browser.page.techhub.EmployeeUser.techHubPage1();
        submitButtonDisable
            .disableSubmitButtonInRequestRepo()
            .assert.attributeEquals('@submitButton', 'disabled', 'true') // to verify that the button is disabled
            .end()
    },

    /**
     * able to see required characters and repo name error
     */

    'Verify user should be able to see the minimum 15 characters required error': function (browser) {
        var repoNameError = browser.page.techhub.EmployeeUser.techHubPage1();
        repoNameError
            .requiredNameInRepo()
            .assert.textContains('@errorMessage', 'Repo name is Required')
            .requiredCharactersInRepo()
            .assert.textContains('@errorMessage', 'Minimum 15 characters required !')
            .end()
    },

    /**
     * able to see the required technology error
     */

    'Verify user should be able to see the Technology is required error': function (browser) {
        var technologyError = browser.page.techhub.EmployeeUser.techHubPage1();
        technologyError
            .technologyRequiredError()
            .assert.textContains('@errorMessage', 'Technology is Required')
            .end()
    },

    /**
     * able to submit Request Repo branch successfully with filled all mandatory fields
     */

    'Verify user should be able to Request a Repo or Branch successfully': async function (browser) {
        var enableSubmitButton = browser.page.techhub.EmployeeUser.techHubPage1();
        enableSubmitButton
            .requestRepoBranchSubmission()
            .assert.textContains("@submissionPopupAlert", 'Submitted Successfully')
            .end()
    },

    /**
     * able to submit new branch from existing repo
     */

    'Verify user should be able to Request a Repo or Branch and New Branch from existing repo': function (browser) {
        var checkBox = browser.page.techhub.EmployeeUser.techHubPage1();
        checkBox
        .newBranchFromExistingRepo()
        .enableSubmitButton()
        .assert.textContains("@submissionPopupAlert", 'Submitted Successfully')
        .end()
},

    /**
     *  able to click cancel button 
     */

    'Verify user should be able to click cancel button on Request Repo or Branch page' : function(browser) {
        var cancelButton = browser.page.techhub.EmployeeUser.techHubPage1();
        cancelButton
            .clickCancelButton()
            .end()
    },

/**
 * submit button disable without filling mandatory fields in draft template
 */

'Verify user should not be able to submit the draft without filling mandatory fields' : function(browser) {
    var draftFields = browser.page.techhub.EmployeeUser.techHubPage1();
    draftFields
        .draftAndPendingButton()
        .draftSubmitButtonDisable()
        .assert.attributeEquals('@submitButton', 'disabled', 'true')
        .end()
},

/**
 * able to see required characters error for title and caption
 */

'Verify user should be able to see minimum requirement error messages for Title, Caption' : function(browser) {
    var titleCaptionErrorMessage = browser.page.techhub.EmployeeUser.techHubPage1();
    titleCaptionErrorMessage
        .draftAndPendingButton()
        .requiredCharactersForDescription()
        .assert.textContains('@draftDescriptionBoxErrormessage', 'Minimum 100 characters required !')
        .requirementCharactersForTitle()
        .assert.textContains('@titleCharactersError', 'Minimum 15 characters required !')
        .requiredCharactersForCaption()
        .assert.textContains('@titleCharactersError', 'Minimum 15 characters required !')
        .end()
},

/**
 * blank field error messages for all the fields in draft template
 */

'Verify user should be able to see blank fields error messages' : function(browser) {
    var blankFields = browser.page.techhub.EmployeeUser.techHubPage1();
    blankFields
        .draftAndPendingButton()
        .requiredTitle()
        .assert.textContains('@errorMessage', 'Title is Required')
        .requiredCaption()
        .assert.textContains('@captionRequiredErrorMessage', 'Caption is Required')
        .execute(function() {
            document.querySelector('textarea[formcontrolname="description"]').scrollIntoView();
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
        .end()
},

/**
 *  error messages for required category and language
 */

'Verify user should be able to see Category and Language is required error message' : function(browser) {
    var categoryAndLanguageError = browser.page.techhub.EmployeeUser.techHubPage1();
    categoryAndLanguageError
        .draftAndPendingButton()
        .requiredCategoryAndLanguage()
        .assert.textContains('@categoryRequiredErrorMessage', 'Category is Required')
        .assert.textContains('@baselanguageRequiredErrorMessage', 'Base Language is Required')
        .end()
},

/**
 * enable submit button with filled mandatory fields in draft template,
 */

'Verify user should be able to submit the draft by filling mandatory fields only' : function(browser) {
    var fields = browser.page.techhub.EmployeeUser.techHubPage1();
    fields
        .draftAndPendingButton()
        .setBranchValue()
        .setTagsValue()
        .setCategoryValue()
        .setBaseLanguageValue()
        .setTitleValue()
        .setCaptionValue()
        .setDescriptionValue()
        .enableSubmitButton()
        .assert.textContains("@submissionPopupAlert", 'Template successfully submitted, please wait for your studio head to review it.')
        .end()
},

/**
 * enable submit button with filling all the fields in draft template
 */

'Verify user should be able to submit the draft by filling all fields ': function(browser) {
    var allFields = browser.page.techhub.EmployeeUser.techHubPage1();
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
        .enableSubmitButton()
        .assert.textContains("@submissionPopupAlert", 'Template successfully submitted, please wait for your studio head to review it.')
        .end()
    }
  }