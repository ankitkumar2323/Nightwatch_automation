import { PageObjectModel, EnhancedPageObject } from 'nightwatch';

const commands = [{
    enterCredentials(this: Login, email: string, password: string) {
        return this
            .setValue('@emailInput', email)
            .pause(1000)
            .setValue('@passwordInput', password)
            .pause(1000)
    },

    signIn(this: Login) {
        return this
            .click("@signIn")
    },
}]

const login: PageObjectModel = {
    commands: commands,

    url: "https://nashtechglobal.qa.go1percent.com/",


    elements: {
        emailInput: '#username',
        passwordInput: '#password',
        signIn: "#kc-login"

    },
    
};
export default login;

export interface Login
  extends EnhancedPageObject<typeof commands,
  typeof login.elements> { }
