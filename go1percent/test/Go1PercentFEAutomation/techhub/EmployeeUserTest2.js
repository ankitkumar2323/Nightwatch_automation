describe('Go1percent techHub FE Testing', () => {

    // Setup: Before each test, open the specified URL, maximize the window, and perform initial page setup.
    beforeEach((browser) => {
        browser
        .url("https://nashtechglobal.qa.go1percent.com")
        .window.maximize()
        pageObject = browser.page.techhub.EmployeeUser.techhub2();

        // Initialize the page object and perform login, sign-in, and navigation actions.
        pageObject
        .loginGo1('testemployee', 'testemployee')
        .signIn()
        .navigateToSettings()
        .navigateToProfile()
        .navigateToTechhub()
    });

    // Teardown: After each test, end the browser session.
    afterEach((browser) => {
        browser.end();
    });

    // Search for requests and verify results on the Pending request page
    it('Verify user should be able to Search Request on Pending request page', () => {
        pageObject
        .navigateToPendingTechHubSearch()
        .searchForPendingTechhub()
        .assert.textContains('@searchResultInPendingTab', "Test")
    });

    // Verify that draft and In review techhubs are present in the Pending page
    it('Verify user should be able to see all fields in Pending page in TechHub', () => {
        pageObject
        .navigateToPendingTechHub()
        .allFieldsPendingPage()
        .isVisible('@draftTab')
        .isVisible('@inReviewTab')
        .assert.textContains('@draftTab', "Draft")
        .assert.textContains('@inReviewTab', "In Review")
    });

    // Verify the error message when description is less than 100 characters
    it('Verify user should be able to see the minimum 100 characters required error', () => {
        pageObject
        .navigateToRequestARepoOrBranch()
        .setSmallDescriptionValue()
        .getText('@errorMessage', function errorMessage(text) {
            expect(text.value).to.equal("Minimum 100 characters required !")
        })
        .setLargeDescriptionValue()
        .getText('@errorMessage', function errorMessage(text){
            expect(text.value).to.equal("Exceeded the maxlength!")
        })
        .closeRequestARepoOrBranch()
    });

    // Search for requests and verify results on the All TechHubs list
    it('Verify user should be able to search Requests from All TechHubs list', () => {
        pageObject
        .navigateToSearchInAllTechHub()
        .searchInAllTechhub()
        .assert.textContains('@searchResultInAllTechhubTab', "TestingTechHub")
        .clearSearch()
    });

    // Navigate to a URL mentioned in a request and verify if the mentioned url opens
    it('Verify user should be able to navigate to mentioned URL on Request', (browser) => {
        // Navigate to a URL mentioned in a request
        pageObject
        .navigateToAllTechhub()
        .navigateToGithubUrl()

        // Switch to the new tab
        browser.window.getAllHandles(function (result) {
            var handle = result.value[1];
            browser.window.switch(handle);
        })

        // Verify the GitHub title on new tab
        pageObject
        .verifyGithubTitle()

        // Switch back to the original tab
        browser.window.getAllHandles(function (result) {
            var handle = result.value[0];
            browser.window.switch(handle);
        })

        // Close the techhub
        pageObject 
        .closeApprovedTechHub()
    });

    // Verify details on the Request page
    it('Verify user should be able to see the Request details', (browser) => {
        pageObject
        .navigateToRequestARepoOrBranch()
        .waitForElementPresent('@repoName')
        .waitForElementPresent('@repoTechnology')
        .waitForElementPresent('@repoDescription')
        .closeRequestARepoOrBranch()
    });

    // Scrolling Issue in Submitting Techhub
    it.only('Verify that user should be able to submit only one techhub a day', (browser) => {
        pageObject
        // Submitting First Techhub
        .navigateToPendingTechHubSearch()
        .searchForPendingTechhub()
        .navigateToTechhubInDraft()
        .setBaseLanguage()
        .setCategory()
        .setTitleValue()
        .setCaptionValue()
        .setDescriptionValue()
        .setBranchValue()
        .setTagsValue()
        .clickSubmitButton()
        .waitForElementVisible('@submissionPopupAlert', 10000)
        .assert.textContains("@submissionPopupAlert",'Template successfully submitted, please wait for your studio head to review it.')
        .navigateToTechhubInDraft()
        .setBaseLanguage()
        .setCategory()
        .setTitleValue()
        .setCaptionValue()
        .setDescriptionValue()
        .setBranchValue()
        .setTagsValue()
        .clickSubmitButton()
        // Submitting Second Techhub
        .waitForElementVisible('@submissionPopupAlert', 10000)
        .assert.textContains("@submissionPopupAlert",'Template successfully submitted, please wait for your studio head to review it.')
    });

    // Verify that only approved techhubs are displayed
    it('verify that in all techhub we can only see the approved techhub', (browser) => {
        pageObject
        .navigateToAllTechhub()
        browser
        .elements('css selector', 'div.studio-member-card.cursor-pointer.my-4.px-2.py-3', function(result) {
            expect(result.value.length).to.be.greaterThan(0);
            totalRecords = result.value.length;
            browser.expect.element('h6.mb-0.rank.status.approvedStatus').text.to.contain('Approved');
        });
    });

    // Verify that the user cannot open a techhub in review
    it('verify that user should not able to open the techhub which is in review', (browser) => {
        pageObject
        .navigateToPendingTechHub()
        .searchForTechhubInReview()
        .waitForElementNotPresent('@viewTechhub')
    });

    // Verify that the user can open the detail page of an approved techhub
    it('verify that user should be able to open the detail page of approved techhub', () => {
        pageObject
        .openDetailsofApprovedTechHub()
        .clickOnapprovedTab()
        .waitForElementPresent('@viewTechhub')
        .waitForElementPresent('@approvedStatusInTechhub')
        .closeApprovedTechHub()
    });

    // Verify that the user can submit a techhub in draft
    it('verify that user should be able to submit the techhub which is in draft', (browser) => {
        pageObject
        .navigateToPendingTechHub()
        .navigateToPendingTechHubSearch()
        .searchForPendingTechhub()
        .navigateToTechhubInDraft()
        .setBaseLanguage()
        .setCategory()
        .setTitleValue()
        .setCaptionValue()
        .setDescriptionValue()
        .setBranchValue()
        .setTagsValue()
        .clickSubmitButton()
        .waitForElementVisible('@submissionPopupAlert', 5000)
        .assert.textContains("@submissionPopupAlert",'Template successfully submitted, please wait for your studio head to review it.')
    });

    // Verify that the submitted techhub is in review
    it('verify that the submitted techhub will go into in review', () => {
        pageObject
        .verifyTechHubTitle()
        .verifyTechHubDate()
    });

});
