const requestPage = browser.page.knolxRequestPage();

describe("Requested session Frontend Automation", () => {

  before(function () {
    browser
      .window.maximize()
    requestPage
      .navigate()
      .enterCredentials('testadmin', 'testadmin')
      .signIn()
      .assert.urlContains("my-dashboard")

  }),

    it("Should be able to see the available requested sessions", () => {
      requestPage
        .clickAdmin()
        .waitForElementVisible('@adminLink')
        .clickKnolx()
        .waitForElementVisible('@knolx')
        .clickmanageSession()
        .waitForElementVisible('@manageSessions')
        .clickRequested()
        .waitForElementVisible('@requested')
        .pause(500)
        .assert.visible('@totalrecords')
        .assert.urlContains("requested-sessions")

    }),

    it("Should be able to update the title", () => {
      requestPage
        .clickSession()
        .waitForElementVisible('@titleEdit')

        .clickEditButton()
        .waitForElementVisible('@inputTitle')

        .editTitle('Sample Text Title Update')
        .waitForElementVisible('@saveButton')

        .clickSaveButton()
        .waitForElementVisible('@titleEdit')
        .assert.containsText('@titleMessage', 'Successfully Updated')
        .pause(500)
    }),

    it("Should be able to add tags", () => {
      requestPage
        .addingTag('new tag')
        .waitForElementVisible('@tagInput')

        .saveTag()
        .pause(500)
        .assert.visible('@addTag')

    }),

    it("Should be able to remove tags", () => {
      requestPage
        .RemovingTag()
        .pause(200)
        .assert.visible('@addTag')

    }),


    it("Should be able to update description", () => {
      requestPage
        .clickEditDesc()
        .waitForElementVisible('@descriptionInput')

        .DescriptionEdit("Description update")
        .waitForElementVisible('@descriptionSave')

        .SavingDescription()
        .waitForElementVisible('@titleEdit')
        .pause(500)
        .assert.visible('@describeEdit')
    }),

    it("Add or update SlideURL", () => {

        requestPage
        .clickSlideEdit()
        .waitForElementVisible('@slideInput')

        .SlideEdit('www.google.com')
        .waitForElementVisible('@slideSave')

        .savingSlide()
        .pause(500)

    }),

    it("Should be able to update Feedback form", () => {

      requestPage
        .clickDropdown('Knolx - Share Your Experience')
        .waitForElementVisible('@feedbackUpdate')

        .UpdatingFeedback()
        .pause(300)
        .assert.containsText('@dropdown', 'Knolx - Share Your Experience')
    }),

    it("Should be able to approve session ", () => {
      requestPage
        .ClickRemarks('Approving the session remarks')
        .waitForElementVisible('@approveButton')

        .ApprovingSession()
        .pause(300)

    }),

    it("Should be able to reject session ", () => {

      requestPage
        .ClickRemarks('Rejecting the session remarks')
        .waitForElementVisible('@rejectButton')

        .RejectingingSession()
        .pause(300)
    }),
    

    after(function (browser) {
      browser.end();
    })
})




