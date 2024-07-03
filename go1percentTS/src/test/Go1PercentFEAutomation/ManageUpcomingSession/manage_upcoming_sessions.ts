import { NightwatchBrowser } from "nightwatch";

const sessionsPage = browser.page.ManageUpcomingSession.manage_upcoming_sessions_page();;
describe('Test Automation', () => {

  it('should enter credentials', () => {
    const email: string = 'testadmin';
    const password: string = 'testadmin';
    sessionsPage
      .maximizeWindow()
      .navigate()
      .enterCredentials(email, password)
      .signIn()
      .assert.urlContains("my-dashboard");
  });

  it('Verify that admin should able to see the available upcoming sessions ', () => {
    sessionsPage
      .clickAdmin()
      .waitForElementVisible('@adminLink')
      .clickKnolx()
      .waitForElementVisible('@knolx')
      .clickmanageSession()
      .waitForElementVisible('@manageSessions')
      .clickUpcoming()
      .waitForElementVisible('@upcoming')
      .assert.visible('@totalrecords')
      .assert.urlContains("requested-sessions");
  });

  it('Verify that admin should able to update the title', () => {
    sessionsPage
      .clickEditTitleButton()
      .waitForElementVisible('@titleupdate')
      .clickTitleupdate();
    const newTitle: string = 'testing Title';
    sessionsPage
      .updateTitle(newTitle)
      .waitForElementVisible('@savetitle')
      .clickSaveTitle()
      .assert.element("@titlecheck").text.to.equal(newTitle);
  });

  it('Verify that admin should not able to approve the session without title', () => {
    sessionsPage.clickTitleupdate();
    const newTitle: string = '';
    sessionsPage
      .updateTitle(newTitle)
      .assert.element('@savetitle').to.have.attribute('disabled');
  });

  it('verify that admin should able to add tags', () => {
    sessionsPage.clickEditTagButton();
    const newTag: string = 'testing Tag';
    sessionsPage
      .TagUpdate(newTag)
      .waitForElementVisible('@savetag')
      .clickSaveTag()
      .assert.element('@tagcheck').text.to.equal(newTag);
  });

  it(' verify that admin should able to update the description', () => {
    sessionsPage.clickEditdescriptionButton();
    const newDescription: string = "The error message indicates that the property 'topic' is not present in the response body, which is why the assertion is failing. This could be due to the structure of the response body or the way the API is handling the request. Please ensure that the API response structure matches the expected response format.";
    sessionsPage
      .DescriptionUpdate(newDescription)
      .waitForElementVisible('@savedescription')
      .clickSavedesciption()
      .assert.element('@descriptioncheck').text.to.equal(newDescription);
  });

  it(' Verify that admin should not able to save the session without description', () => {
    sessionsPage.clickEditdescriptionButton();
    const newDescription: string = "";
    sessionsPage
      .DescriptionUpdate(newDescription)
      .assert.element('@savedescription').to.have.attribute('disabled');
  });


  it(' Verify that admin should able to update the slide URL', () => {
    sessionsPage.clickEditSliderUrlButton();
    browser.pause(2000);
    const newSliderUrl: string = 'https://new-slider-url.com';
    sessionsPage
      .SliderUrlUpdate(newSliderUrl)
      .clickSaveSliderUrl()
      .assert.element("@sliderurlcheck").text.to.equal(newSliderUrl);
  });

  it('verify that youtube URL should not be added or updated in the upcoming session', () => {
    sessionsPage.clickEditYoutubeUrlButton();
    browser.pause(2000);
    const newYoutubeUrl: string = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    sessionsPage
      .YoutubeUrlUpdate(newYoutubeUrl)
      .clickSaveYoutubeUrl()
      .assert.element('@turlcheck').text.to.equal(null);
  });

  it('verify that admin should able to report the session only if the approve button is enabled', () => {
    sessionsPage.clickEditsessioncancelButton();
    const comment: string = 'Session canceled due to unforeseen circumstances.';
    sessionsPage
      .SessionreportUpdate(comment)
      .waitForElementVisible('@report')
      .assert.visible('@report')
      .clickReport();
  });

  it('verify that Admin should be able to change & update the feedback form', () => {
    sessionsPage.clickEditfeedbackformButton('Knolx - Share Your Experience');
    browser.pause(2000);
    sessionsPage.clickUpdateform();
    browser.pause(2000);
    sessionsPage.expect.element("@formcheck").value.to.equal("Knolx - Share Your Experience");
  });


  it('verify that admin should not able to report the session with out comment', () => {
    sessionsPage.clickReportsession();
    const comment: string = '';
    sessionsPage
      .SessionreportUpdate(comment)
      .assert.visible('@report')
      .assert.element('@report').to.have.attribute('disabled');
  });

  it('verify that admin should able to click on send instructions', () => {
    sessionsPage.clicksendinstructions();
    browser.pause(2000);
  });
});