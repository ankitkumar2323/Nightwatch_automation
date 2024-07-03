const { expect } = require('chai');
const { url, elements, commands } = require('../../page-objects/Manage_upcoming_sessions/manage_upcoming_sessions_page.js');
const loginPage = browser.page.manage_upcoming_sessiona_page();
const allure = require('nightwatch-allure');


describe('Test Automation', () => {
  before(() => {
    browser.url(url);
    browser.maximizeWindow();
  });

  it('should enter credentials', () => {
    const email = 'testadmin';
    const password = 'testadmin';
    loginPage
      .enterCredentials(email, password)
      .signIn()
      .assert.urlContains("my-dashboard")
  });

  it('Verify that admin should able to see the available upcoming sessions ', () => {
    loginPage
      .clickAdmin()
      .waitForElementVisible('@adminLink')
      .clickKnolx()
      .waitForElementVisible('@knolx')
      .clickmanageSession()
      .waitForElementVisible('@manageSessions')
      .clickUpcoming()
      .waitForElementVisible('@upcoming')
      .assert.visible('@totalrecords')
      .assert.urlContains("requested-sessions")
  });

  it('Verify that admin should able to update the title', () => {
    loginPage
      .clickEditTitleButton()
      .waitForElementVisible('@titleupdate')
      .clickTitleupdate();
    const newTitle = 'testing Title';
    loginPage
      .updateTitle(newTitle)
      .waitForElementVisible('@savetitle')
      .clickSaveTitle()
      .expect.element("@titlecheck").text.to.equal(newTitle);
  });

  it('Verify that admin should not able to approve the session without title', () => {
    loginPage.clickTitleupdate();
    const newTitle = '';
    loginPage
      .updateTitle(newTitle)
      .expect.element('@savetitle').to.have.attribute('disabled');
  });

  it('verify that admin should able to add tags', () => {
    loginPage.clickEditTagButton();
    const newTag = 'testing Tag';
    loginPage
      .TagUpdate(newTag)
      .waitForElementVisible('@savetag')
      .clickSaveTag()
      .expect.element('@tagcheck').text.to.equal(newTag);
  });

  it(' verify that admin should able to update the description', () => {
    loginPage.clickEditdescriptionButton();
    const newDescription = "The error message indicates that the property 'topic' is not present in the response body, which is why the assertion is failing. This could be due to the structure of the response body or the way the API is handling the request. Please ensure that the API response structure matches the expected response format.";
    loginPage
      .DescriptionUpdate(newDescription)
      .waitForElementVisible('@savedescription')
      .clickSavedesciption()
      .expect.element('@descriptioncheck').text.to.equal(newDescription);
  });

  it(' Verify that admin should not able to save the session without description', () => {
    loginPage.clickEditdescriptionButton();
    const newDescription = "";
    loginPage
      .DescriptionUpdate(newDescription)
      .expect.element('@savedescription').to.have.attribute('disabled');
  });


  it(' Verify that admin should able to update the slide URL', () => {
    loginPage.clickEditSliderUrlButton();
    browser.pause(2000);
    const newSliderUrl = 'https://new-slider-url.com';
    loginPage
      .SliderUrlUpdate(newSliderUrl)
      .clickSaveSliderUrl()
      .expect.element("@sliderurlcheck").text.to.equal(newSliderUrl);
  });

  it('verify that youtube URL should not be added or updated in the upcoming session', () => {
    loginPage.clickEditYoutubeUrlButton();
    browser.pause(2000);
    const newYoutubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    loginPage
      .YoutubeUrlUpdate(newYoutubeUrl)
      .clickSaveYoutubeUrl()
      .expect.element('@turlcheck').text.to.equal(null);
  });

  it('verify that admin should able to report the session only if the approve button is enabled', () => {
    loginPage.clickEditsessioncancelButton();
    const comment = 'Session canceled due to unforeseen circumstances.';
    loginPage
      .SessionreportUpdate(comment)
      .waitForElementVisible('@report')
      .assert.visible('@report')
      .clickReport();
  });

  it('verify that Admin should be able to change & update the feedback form', () => {
    loginPage.clickEditfeedbackformButton('Knolx - Share Your Experience');
    browser.pause(2000);
    loginPage.clickUpdateform();
    browser.pause(2000);
    loginPage.expect.element("@formcheck").value.to.equal("Knolx - Share Your Experience");
  });


  it('verify that admin should not able to report the session with out comment', () => {
    loginPage.clickReportsession();
    const comment = '';
    loginPage
    .SessionreportUpdate(comment)
    .assert.visible('@report')
    .expect.element('@report').to.have.attribute('disabled');
  });

  it('verify that admin should able to click on send instructions', () => {
    loginPage.clicksendinstructions();
    browser.pause(2000);
  });
  
});