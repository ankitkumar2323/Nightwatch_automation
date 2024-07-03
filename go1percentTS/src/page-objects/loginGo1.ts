import { PageObjectModel, EnhancedPageObject } from "nightwatch";

const loginCommands = {
    enterCredentials(this: LoginGo1Page, email: string, password: string) {
        return this
            .waitForElementPresent('@emailInput', 30000)
            .setValue('@emailInput', email)
            .setValue('@passwordInput', password);
    },
    signIn(this: LoginGo1Page) {
        return this
            .click('@signIn');
    }
};

const loginGo1: PageObjectModel = {
    url: "https://nashtechglobal.qa.go1percent.com/",
    elements: {
        emailInput: '#username',
        passwordInput: '#password',
        signIn: "#kc-login"
    },
    commands: [loginCommands]
};

export default loginGo1;

export interface LoginGo1Page extends EnhancedPageObject<typeof loginCommands, typeof loginGo1.elements> {}