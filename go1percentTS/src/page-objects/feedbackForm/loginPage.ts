import { EnhancedPageObject, NightwatchBrowser, PageObjectModel } from "nightwatch";

const loginPageCommands = {
    inputUsername(this:NightwatchBrowser, username:string) {
        this
            .waitForElementVisible('@usernameField',30000)
            .setValue('@usernameField', username);

        return this;
    },

    inputPassword(this:NightwatchBrowser, password:string) {
        this
            .waitForElementVisible('@passwordField',30000)
            .setValue('@passwordField', password);

        return this;
    },

    login(this:NightwatchBrowser) {
        this

            .waitForElementVisible('@loginButton',30000)
            .click('@loginButton');

        return this;

    },

    goToFeedbackFormSection(this:NightwatchBrowser) {
        this
            .waitForElementVisible("@navbar",30000)
            .click('@admins_link')

            .waitForElementVisible("@admin_options",30000)
            .click('@knolx_link')

            .waitForElementVisible('@knolx_options',30000)
            .click('@feedback_form_link');


        return this; // for command-chaining
    },

};


const loginPage:PageObjectModel = {
    
    url: 'https://nashtechglobal.qa.go1percent.com/',

    commands: [
        loginPageCommands
    ],

    elements: {
        usernameField: {
            selector: '#username'
        },
        passwordField: {
            selector: '#password'
        },
        loginButton: {
            selector: '#kc-login'
        },
        navbar: {
            selector: '#sidenav-main'
        },

        admins_link: {
            selector: 'ul[class="navbar-nav"] li:nth-of-type(8)'
        },

        admin_options: {
            selector: "ul[class='navbar-nav'] li:nth-of-type(8) [class='nav subMenu']"
        },

        knolx_link: {
            selector: "ul[class='navbar-nav'] li:nth-of-type(8) li:nth-of-type(3)"
        },

        knolx_options: {
            selector: "ul[class='navbar-nav'] li:nth-of-type(8) li:nth-of-type(3)  li:nth-of-type(3)"
        },

        feedback_form_link: {
            selector: "ul[class='navbar-nav'] li:nth-of-type(8) li:nth-of-type(3)  li:nth-of-type(3)"
        }

    }



};

export default loginPage;
export interface LoginPage
    extends EnhancedPageObject<
        typeof loginPageCommands
    > { }