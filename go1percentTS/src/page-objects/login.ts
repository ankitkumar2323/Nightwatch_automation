import { PageObjectModel, EnhancedPageObject } from 'nightwatch';
var loginCommands = {
    enterCredentials:function(this:LoginPage,username: string,password: string) {
        return this
            .setValue('@emailInput', username)
            .pause(1000)
            .setValue('@passwordInput', password)
            .pause(1000);
    },
    signIn:function(this:LoginPage) {
        return this
            .click("@signIn");
    }

};

const loginPage: PageObjectModel = {
    url: "https://nashtechglobal.qa.go1percent.com/",
  commands: [loginCommands],
  elements: {
    emailInput: '#username',
    passwordInput: '#password',
    signIn: "#kc-login"
  },
};


export default loginPage;

export interface LoginPage
  extends EnhancedPageObject<typeof loginCommands,
  typeof loginPage.elements> { }
