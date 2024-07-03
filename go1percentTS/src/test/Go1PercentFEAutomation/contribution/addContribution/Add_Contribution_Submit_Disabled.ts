
import { NightwatchBrowser } from 'nightwatch';

describe('Add Contribution- Submit button is Disabled', () => {
  const Login = require('../../../../helpers/Go1PercentFEAutomation/contribution/addContribution/go1Percentloging');
  const dashboard = browser.page.contribution.addContribution.Dashboard();
  const profile = browser.page.contribution.addContribution.Profile();
  const contribution = browser.page.contribution.addContribution.Contribution(); 

  before(function (browser:NightwatchBrowser)
  {
     Login.beforeEach(browser);
   }),
  

   after(function (browser:NightwatchBrowser) 
   {
     Login.after(browser);
   }),
    
    it('User should able to view profile page',()=>{
            
        dashboard
        .waitForElementVisible('@body', 1000)
        .click('@setting')
        .click("@profile")
        .assert.urlContains("my-profile")
    
    }),

   it('Verify that user should be able to click on contribution button to add contribution',()=>{
  
        profile
        .waitForElementVisible('@body', 1000)
        .click("@contribution")
        contribution
            .Buttontext()
        profile
        .click("@addcontribution")

          
    }),
   
    it('Verify that user should not able to submit form without filling mandatory fields',()=>{
    
        contribution
            .Submitdisabled('disabled');
          
    }),
   it('Verify that user should not able to click on submit button with adding title',()=>{
    
        contribution
           .sendKeys("@title", ['Nightwatchjs']);
         contribution
           .Submitdisabled('disabled');
          
    })
})