import { PageObjectModel, EnhancedPageObject } from "nightwatch";

const loginElements = 
{
    emailInput: '#username',
    passwordInput: '#password',
    signIn: "#kc-login"

}

const loginCommands = 
{
    enterCredentials(this: EnhancedPageObject, email: string, password: string) {
        return this
            .setValue('@emailInput', email)
            .pause(1000)
            .setValue('@passwordInput', password)
            .pause(1000)
    },
    signIn(this: EnhancedPageObject) {
        return this
            .click("@signIn")
    },
}


const loginPage: PageObjectModel= {

    url: "https://nashtechglobal.qa.go1percent.com/",

    elements: loginElements,
    commands: [loginCommands]
};

export default loginPage;
export interface LoginPage
    extends EnhancedPageObject<
        typeof loginCommands,
        typeof loginElements
    > { }