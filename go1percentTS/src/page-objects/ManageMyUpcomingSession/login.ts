import { PageObjectModel, EnhancedPageObject } from 'nightwatch';




const WebPageElements = {
    emailInput: '#username',
    passwordInput: '#password',
    signIn: "#kc-login"

}
const WebPageCommands = {
    enterCredentials(this: OpeningWebsite, email: any, password: any) {
        return this
            .setValue('@emailInput', email)
            .pause(1000)
            .setValue('@passwordInput', password)
            .pause(1000)
    },
    signIn(this: OpeningWebsite) {
        return this
            .click("@signIn")
    },
}


const LoginPage: PageObjectModel = {

    url: "https://nashtechglobal.qa.go1percent.com/",
    commands: [WebPageCommands],
    elements: WebPageElements

};



export default LoginPage;
export interface OpeningWebsite
    extends EnhancedPageObject<typeof WebPageCommands,
        typeof WebPageElements> { }



