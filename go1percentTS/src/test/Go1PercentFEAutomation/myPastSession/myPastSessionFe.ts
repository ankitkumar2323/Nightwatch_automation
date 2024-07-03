import { NightwatchTests, NightwatchBrowser } from "nightwatch";
const pastSession = browser.page.myPastSession.myPastSession();
 
  describe("MyPastSession Frontend Automation", () => {
    before((browser: NightwatchBrowser) => {
    pastSession
      .maximizeWindow()
      .navigate()
      .enterCredentials()
      .signInButton()
      .assert.urlContains("my-dashboard");
      
  }),
 
   it("knolx page ", () => {
    pastSession
    .clickOnKnolxButton()
    .waitForElementVisible('@knolxButton')
    .clickOnMysession()
    .waitForElementVisible('@mysession')
    .assert.urlContains("/knolx/my-sessions/my-upcoming-sessions");
   
  }),
 
   it("mypastSession page", () => {
    pastSession
    .clickOnMyPastSession()
    .waitForElementVisible('@Mypastsession')
    .assert.urlContains("/knolx/my-sessions/my-past-sessions");
 
  }),
  
  it("selective page", () => {
    pastSession
    .clickOnSelectiveSession()
    .assert.urlContains("knolx/my-sessions/my-past-sessions/65364ed48555d37c0a4f8dc7");
  }),
 
  it("back Button ", () => {
    pastSession
       .clickOnBackButton()
       .assert.urlContains("/knolx/my-sessions/my-past-sessions");
 
  }),
  
   it("Feedback Button ", () => {
    pastSession
       .clickOnSelectiveSession()
       .clickOnFeedbackButton()
       .assert.urlContains("knolx/feedback-report?id=65364ed48555d37c0a4f8dc7")
       .clickOnViewFeedbackButton()
  }),
 
   it("View Attendance Button ", () => {
    pastSession
       
       .clickOnSelectiveSession()
       .clickOnViewAttandenceButton()
       .assert.urlContains("knolx/spotlight-knolder?id=65364ed48555d37c0a4f8dc7")
       .clickOnCompletedSessionButton()
       .assert.urlContains("/knolx/my-sessions/my-past-sessions?id=65364ed48555d37c0a4f8dc7")
  })
 
 
});
  
 
 