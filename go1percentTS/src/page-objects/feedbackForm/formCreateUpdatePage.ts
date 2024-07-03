import { EnhancedPageObject, NightwatchBrowser, PageObjectModel } from "nightwatch";

const formCreateCommands = {
    setFormTitle(this:NightwatchBrowser,formTitle:string) {
        this
            .waitForElementVisible('@newForm',30000)
            .sendKeys('@newFormTitleInput', formTitle)

        return this;
    },


    addNewQuestion(this:NightwatchBrowser) {
        this
            .waitForElementVisible('@addQuestionButton',30000)
            .click('@addQuestionButton');

        return this;
    },


    // setting type of question
    setMCQQuestion(this:NightwatchBrowser) {
        this
            .waitForElementVisible('@questionDefaultMCQ',30000)
            .click('@questionDefaultMCQ')

            .waitForElementVisible('@questionDefaultTitle',30000)
            .sendKeys('@questionDefaultTitle', 'Default MCQ Question')

            .waitForElementVisible('@questionDefaultOption1',30000)
            .sendKeys('@questionDefaultOption1', 'Yes')

        return this;

    },
    setParagraphQuestion(this:NightwatchBrowser) {

        this
            .waitForElementVisible('@questionTwoParagraph',30000)
            .click('@questionTwoParagraph')
            .waitForElementVisible('@newFormQuestionTitle',30000)
            .setValue('@questionTwoTitle', 'Paragraph Question')

        return this;
    },

    setNPSQuestion(this:NightwatchBrowser) {

        this
            .waitForElementVisible('@newFormQuestionTitle',30000)
            .click('@questionOneNPS')
            .setValue('@questionOneTitle', 'NPS Question')

        return this;

    },

    saveForm(this:NightwatchBrowser) {
        this
            .waitForElementVisible('@newFormSaveFormButton',30000)
            .click('@newFormSaveFormButton')

        return this;
    },

    // assertions

    assertPopUpMessageContains(this:NightwatchBrowser,message:string) {
        this
            .waitForElementVisible('@addNPSModal',30000)
            .assert.textContains('@addNPSModal', message);

        return this;
    },

    assertTitleValidationIsShown(this:NightwatchBrowser, message:string) {
        this
            .waitForElementVisible('@formEmptyTitleValidationMessage',30000)
            .assert.textContains('@formEmptyTitleValidationMessage', message);

        return this;
    },

    assertQuestionValidationIsShown(this:NightwatchBrowser, message:string) {
        this
            .waitForElementVisible('@formEmptyQuestionValidationMessage',30000)
            .assert.textContains('@formEmptyQuestionValidationMessage', message);

        return this;

    },

    clickDeleteOnUpdateForm(this:NightwatchBrowser) {
        this
            .waitForElementVisible('@formUpdate_deleteButton',30000)
            .click('@formUpdate_deleteButton')

        return this;
    }

}

const updateFormCommands = {

    clickAddQuestion(this:NightwatchBrowser) {
        this
            .findElement('@formUpdate_addQuestionButton')  // add question selctor
            .waitForElementVisible('@formUpdate_addQuestionButton',30000)
            .click('@formUpdate_addQuestionButton');

        return this;

    },

    setParagaphQuestion(this:NightwatchBrowser) {
        return this
            .waitForElementVisible('@formUpdate_newQuestionFormField',30000)
            .sendKeys('@formUpdate_newQuestionTitle', "New Question id Added")  //question title
            .click('@formUpdate_selectParagraph')  //select question type
        // save button

    },

    saveUpdatedForm(this:NightwatchBrowser) {
        return this
            .click('@formUpdate_saveFormButton');

    }
}


const formCreateUpdatePage:PageObjectModel = {

    commands: [
        formCreateCommands, updateFormCommands
    ],

    elements: {
        newForm: {
            selector: 'app-create-feedback-form form'
        },

        newFormTitleInput: {
            selector: 'app-create-feedback-form form  input[formcontrolname="formTitle"]'
        },

        addQuestionButton: {
            selector: 'app-create-feedback-form form  div[formarrayname="feedbackQuestions"] button'
        },

        newFormSaveFormButton: {
            selector: 'app-create-feedback-form div[class="buttons-div feedback"] button'
        },

        newFormQuestionArray: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li'
        },

        // add last of delete
        formsQuestionDeleteButtonArray: {
            selector: 'app-create-feedback-form form  div[formarrayname="feedbackQuestions"]  div[class="delete-container delete-cover"]'
        },

        newFormQuestionTitle: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:last-of-type input[formcontrolname="questionTitle"]'
        },

        newFormQuestionType: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:last-of-type select[formcontrolname="questionType"]'
        },


        selectQuestionTypeParagraph: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:last-of-type select[formcontrolname="questionType"] option[value="COMMENT"]'
        },

        selectQuestionTypeNPS: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:last-of-type select[formcontrolname="questionType"] option[value="NPS"]'
        },


        addNPSModal: {
            selector: 'modal-container  div[role="document"]'
        },

        formEmptyTitleValidationMessage: {
            selector: 'app-create-feedback-form form > div:nth-of-type(1) span'
        },

        formEmptyQuestionValidationMessage: {
            selector: 'app-create-feedback-form form  div[formarrayname="feedbackQuestions"]  li > div > div > span'
        },

        // questions
        questionDefaultMCQ: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:nth-of-type(1) select[formcontrolname="questionType"] option[value="MCQ"]'
        },

        questionDefaultTitle: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:nth-of-type(1) input[formcontrolname="questionTitle"]'
        },

        questionDefaultOption1: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:nth-of-type(1)  ul[formarrayname="options"] input:nth-of-type(1)'
        },

        questionDefaultOption2: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:nth-of-type(1)  ul[formarrayname="options"] input:nth-of-type(2)'
        },

        createNewOption: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:nth-of-type(1)  div[formgroupname="questionGroup"]  div:nth-of-type(1) div:nth-of-type(1) p'
        },

        questionOneNPS: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:nth-of-type(2) select[formcontrolname="questionType"] option[value="NPS"]'
        },

        questionOneTitle: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:nth-of-type(2) input[formcontrolname="questionTitle"]'
        },

        questionTwoParagraph: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:nth-of-type(3) select[formcontrolname="questionType"] option[value="COMMENT"]'
        },

        questionTwoTitle: {
            selector: 'app-create-feedback-form  div[formarrayname="feedbackQuestions"] ol > li:nth-of-type(3) input[formcontrolname="questionTitle"]'
        },

        formSavedSuccessfullyAlert: {
            selector: '#toast-container'
        },


        // ==============================UPDATE FORM=================
        formUpdate: {
            selector: 'app-update-feedback-form'
        },

        formUpdate_deleteButton: {
            selector: 'app-update-feedback-form div[class="feedback row"] div button:nth-of-type(2)'
        },

        formUpdate_dialogBox: {
            selector: 'modal-container div[class="modal-content"]'
        },

        previewButton: {
            selector: 'app-update-feedback-form div[class="feedback row"] div:nth-of-type(2) button'
        },

        formUpdate_addQuestionButton: 'app-update-feedback-form div[formarrayname="feedbackQuestions"] button',

        formUpdate_newQuestionFormField: 'app-update-feedback-form [class="card p-5"] form',

        formUpdate_newQuestionTitle: 'app-update-feedback-form [class="card p-5"] form input[formcontrolname="questionTitle"]',

        formUpdate_selectParagraph: 'app-update-feedback-form [class="card p-5"] form select[name="questionType"] option[value="COMMENT"]',

        formUpdate_saveFormButton: 'app-update-feedback-form [class="card p-5"]  div[class="feedback row"] div:nth-of-type(1) button:nth-of-type(1)',

        alertOfFormUpdated: 'div[role="alert"]',

        // ==============PREVIEW FORM=============
        
        previewForm: {
            selector:   'app-preview-form',
        },
    }

};

export default formCreateUpdatePage;
export interface FormCreateUpdatePage
    extends EnhancedPageObject<
        typeof formCreateUpdatePage,
        typeof formCreateCommands
    > { }