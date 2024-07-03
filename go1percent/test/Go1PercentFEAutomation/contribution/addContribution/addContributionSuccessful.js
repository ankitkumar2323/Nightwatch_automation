const randomString = Math.random().toString(36).substring(7);
const Login = require('../../../../helpers/Go1PercentFEAutomation/contribution/addContribution/go1Percentloging');
const globals = require('../../../../globals')
const dashboard = browser.page.contribution.addContribution.dashboard();
const profile = browser.page.contribution.addContribution.profile();
const contribution = browser.page.contribution.addContribution.contribution(); 

module.exports = 
{

    before: function (browser)
     {
        Login.beforeEach(browser);
      },
     

      after: function (browser) 
      {
        Login.after(browser);
      },
    
      'click to setting and profile' : function (browser) 
      { 
          
          
          dashboard
          .waitForElementVisible('@body', 1000)
          .click('@setting')
          .click("@profile")
      
      },
  
      'Adding contribution and applying assertions' : function (browser) 
      { 
           
              
            profile
              .click("@contribution")
              .click("@addcontribution")
  
      },  
    'Verify that user should be able to add details for adding contribution':function (browser) 
    { 

        contribution
          .sendKeys("@title", ['Nightwatchjs test script'])
          .setValue('@contributiontype', 'Online Course')
          .sendKeys("@description", ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to'])
          .sendKeys("@videourl", ["www."+ randomString+".com"])
          .click("@submit")
       contribution
          .Textcontain('successfully');
    }
}


 