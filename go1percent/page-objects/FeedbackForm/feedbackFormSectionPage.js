const cmd = {

    clickOnFormDeleteButton() {
        this
            .waitForElementVisible('@heading')
            .waitForElementVisible('@firstSearchResultCardTitle')
            .waitForElementVisible('@firstSearchResultCardDeleteBtn')
            .click('@firstSearchResultCardDeleteBtn')
        return this;
    },

    clickNoOnPopupMessage() {
        this
            .waitForElementVisible('@deleteDialogBox')
            .click('@deleteDialogBox_NoButton')

        return this;
    },

    inputInSearchField(message) {

        const regex = new RegExp(message, "i");

        this
            .waitForElementVisible('@heading')
            .waitForElementVisible('@feedbackFormCardTitle')
            .waitForElementVisible('@searchField')
            .sendKeys('@searchField', message)
            .expect.element('@firstSearchResultCard').text.to.match(regex);
        return this;
    },

    clickOnFormEditButton() {
        this
            .waitForElementVisible('@heading')
            .waitForElementVisible('@firstSearchResultCardTitle')
            .click('@firstSearchResultCardEditBtn');

        return this;
    },

};

const createFormCommands = {

    clickOnCreateFormButton() {
        this
            .waitForElementVisible('@createANewFormButton')
            .click('@createANewFormButton');

        return this;
    }
}



module.exports = {
    url: 'https://nashtechglobal.qa.go1percent.com/',
    feedbackUrl: 'https://nashtechglobal.qa.go1percent.com/knolx/feedback-forms',

    commands: [
        cmd, createFormCommands
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
        // app-feedback-forms div[class="row"]:nth-of-type(4) div:nth-of-type(1) div div[class="card-body"]  span[title="Delete"]

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