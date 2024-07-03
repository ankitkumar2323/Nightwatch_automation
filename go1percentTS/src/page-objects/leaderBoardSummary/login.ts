import { PageObjectModel, EnhancedPageObject } from 'nightwatch';

var loginCommands = {
  enterCredentials: function (this: LoginPage) {
    return this
      .setValue('@emailInput', 'testemployee')
      .pause(1000)
      .setValue('@passwordInput', 'testemployee')
      .pause(1000);
  },
  signIn: function (this: LoginPage) {
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

