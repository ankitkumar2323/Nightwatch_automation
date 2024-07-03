import { PageObjectModel, EnhancedPageObject } from 'nightwatch';

var rewardCommands = {

  signIn: function (this: RewardPage) {
    return this
    .assert.urlContains('go1percent', 'Go1percent website is opened')
    //sign in
    .sendKeys('@usernameField', 'testadmin')
    .sendKeys('@passwordField', 'testadmin')
    .click('@signInButton') 
    .assert.urlContains('my-dashboard', 'Dashboard is opened');
    },

    goToRewards: function (this: RewardPage) {
        return this
        .click('@dropDownButton')
        .click('@rewardsOption')
    }
    };
 
const rewardPage: PageObjectModel = {
    url: 'https://nashtechglobal.qa.go1percent.com',
   
    commands: [rewardCommands],
    elements: {
        usernameField: {
            selector: '#username'
        },
        passwordField: {
            selector: '#password'
        },
        signInButton: {
            selector: '#kc-login'
        },
        rewardsOption: {
            selector: 'a.nav-link[href="/rewards/list"]',
        },
        dropDownButton: {
            selector: 'li:nth-child(3) > div.collapsed',
        }

    }
};
 
export default rewardPage;
 
export interface RewardPage
  extends EnhancedPageObject<typeof rewardCommands,
  typeof rewardPage.elements> { }
