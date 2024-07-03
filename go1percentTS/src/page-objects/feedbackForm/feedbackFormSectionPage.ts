import { EnhancedPageObject, NightwatchBrowser, PageObjectModel } from "nightwatch";

const formSectionPageCommands = {

    clickOnFormDeleteButton(this:NightwatchBrowser) {
        this
            .waitForElementVisible('@heading',30000)
            .waitForElementVisible('@firstSearchResultCardTitle',30000)
            .waitForElementVisible('@firstSearchResultCardDeleteBtn',30000)
            .click('@firstSearchResultCardDeleteBtn')
        return this;
    },

    clickNoOnPopupMessage(this:NightwatchBrowser) {
        this
            .waitForElementVisible('@deleteDialogBox',30000)
            .click('@deleteDialogBox_NoButton')

        return this;
    },

    inputInSearchField(this:NightwatchBrowser,message:string) {

        const regex = new RegExp(message, "i");

        this
            .waitForElementVisible('@heading',30000)
            .waitForElementVisible('@feedbackFormCardTitle',30000)
            .waitForElementVisible('@searchField',30000,30000)
            .sendKeys('@searchField', message)
            .expect.element('@firstSearchResultCard').text.to.match(regex);
        return this;
    },

    clickOnFormEditButton(this:NightwatchBrowser) {
        this
            .waitForElementVisible('@heading',30000)
            .waitForElementVisible('@firstSearchResultCardTitle',30000)
            .click('@firstSearchResultCardEditBtn');

        return this;
    },

};

const createFormCommands = {

    clickOnCreateFormButton(this:NightwatchBrowser) {
        this
            .waitForElementVisible('@createANewFormButton',30000)
            .click('@createANewFormButton');

        return this;
    }
}



const feedbackFormSectionPage:PageObjectModel = {
    url: 'https://nashtechglobal.qa.go1percent.com/',

    commands: [
        formSectionPageCommands, createFormCommands
    ],

    elements: {
        heading: {
            selector: 'app-feedback-forms h5'
        },

        searchField: {
            selector: 'app-feedback-forms input[placeholder=" Search Form"]'
        },

        createANewFormButton: {
            selector: 'app-feedback-forms button'
        },

        firstSearchResultCard: {
            selector: 'app-feedback-forms div[class="row"]:nth-of-type(4) > div:nth-of-type(1)'
        },

        firstSearchResultCardEditBtn: {
            selector: 'app-feedback-forms div[class="row"]:nth-of-type(4) > div:nth-of-type(1) span[title="Edit"]'
        },

        firstSearchResultCardDeleteBtn: {
            selector: 'app-feedback-forms div[class="row"]:nth-of-type(4) > div:nth-of-type(1)  span[title="Delete"]'
        },

        firstSearchResultCardTitle: {
            selector: 'app-feedback-forms div[class="row"]:nth-of-type(4) > div:nth-of-type(1) p'
        },

        feedbackFormsRow: {
            selector: 'app-feedback-forms div[class="row"]:nth-of-type(4)'
        },

        feedbackFormCardContainer: {
            selector: 'app-feedback-forms div[class="row"]:nth-of-type(4) div:nth-of-type(1)'
        },
        
        feedbackFormCard: {
            selector: 'app-feedback-forms div[class="row"]:nth-of-type(4) div:nth-of-type(1) div'
        },


        feedbackFormCardBody: {
            selector: 'app-feedback-forms div[class="row"]:nth-of-type(4) div:nth-of-type(1) div div[class="card-body"]'
        },


        feedbackFormCardHeader: {
            selector: 'app-feedback-forms div[class="row"]:nth-of-type(4) div:nth-of-type(1) div div[class="cardHeader"]'
        },

        feedbackFormCardTitle: {
            selector: 'app-feedback-forms div[class="row"]:nth-of-type(4) div:nth-of-type(1) div div[class="cardHeader"] p'
        },

        deleteDialogBox: {
            selector: 'modal-container  div[class="modal-content"]'
        },

        deleteDialogBox_YesButton: {
            selector: 'modal-container  div[class="modal-content"] button:nth-of-type(1)'
        },

        deleteDialogBox_NoButton: {
            selector: 'modal-container  div[class="modal-content"] button:nth-of-type(2)'
        },

        deleteDialogBox_Message: {
            selector: 'modal-container  div[class="modal-content"] p:nth-of-type(2)'
        },

        deleteDialogBox_Title: {
            selector: 'modal-container  div[class="modal-content"] p:nth-of-type(1)'
        },

        feedbackFormAlert: {
            selector: '#toast-container'
        },

        sessionDialogBox: {
            selector: '[class="modal-content"]'
        },

        dialogBox: {
            selector: '*[class="modal-content"]'
        }


    }



};

export default feedbackFormSectionPage; 
export interface FeedbackFormSectionPage
    extends EnhancedPageObject<
        typeof createFormCommands,
        typeof formSectionPageCommands
    > { }