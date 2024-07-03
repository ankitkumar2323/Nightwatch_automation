
import { NightwatchBrowser } from 'nightwatch';
describe('Add Contribution- Invalid details', () => {

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

     it('click to setting and profile',()=>
      { 
          
          
          dashboard
          .waitForElementVisible('@body', 1000)
          .click('@setting')
          .click("@profile")
      
      }),
  
     it( 'click to contribution and add contribution',()=>
      { 
           
              
            profile
              .click("@contribution")
              .click("@addcontribution")
  
      }),  
  
    
    it('Verify that user should not able to click on submit button without adding description',()=>{
    
        contribution
            .waitForElementVisible("@description", 5000) 
            .getValue("@description", function(result:any) 
            {
              var textareaValue = result.value;
              if(textareaValue == "")
              {
                contribution.Submitdisabled('disabled');
              }

            })

        contribution
          .sendKeys("@description", ['Entering description leass than 100 words'])
          .Submitdisabled('disabled');
    }),

    it('Verify that user should not able to click submit form with filling invalid url',()=>{
    
        contribution
           .sendKeys("@url", ['www.coursera'])
           .Submitdisabled('disabled');
    }),

   it('Verify that user should be able to select "Online Courses" from contribution',()=>{
    
        contribution
          .setValue('@contributiontype', 'Online Course')
    })

  

})