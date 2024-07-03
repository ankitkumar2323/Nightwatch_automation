import { PageObjectModel, EnhancedPageObject } from 'nightwatch';
const customCommands={
    enterCredentials(this:EnhancedPageObject,email:string, password:string) {
        return this
            .setValue('@emailInput', email)
            .pause(1000)
            .setValue('@passwordInput', password)
            .pause(1000)
    },
    signIn(this:EnhancedPageObject) {
        return this
            .click("@signIn")
    },  
}
const loginPage:PageObjectModel={
    url: "https://nashtechglobal.qa.go1percent.com/",

    elements: {
        emailInput: '#username',
        passwordInput: '#password',
        signIn: "#kc-login"

    },
    commands:[customCommands]
}
export default loginPage;
export interface LoginPage
  extends EnhancedPageObject<typeof customCommands,
  typeof loginPage.elements>{ }
