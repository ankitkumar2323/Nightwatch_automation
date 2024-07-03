import { PageObjectModel, EnhancedPageObject } from 'nightwatch';

const Go1Commands = {

    enterCredentials(this: knolxRequestPage, email: string, password: string) {
        return this
            .setValue('@emailInput', email)
            .pause(1000)
            .setValue('@passwordInput', password)
            .pause(1000)
    },
    signIn(this: knolxRequestPage) {
        return this
            .click("@signIn")
    },
    clickAdmin(this: knolxRequestPage) {
        return this
            .click('@adminLink')
    },
    clickKnolx(this: knolxRequestPage) {
        return this
            .click('@knolx')
    },
    clickmanageSession(this: knolxRequestPage) {
        return this
            .click('@manageSessions')
    },
    clickRequested(this: knolxRequestPage) {
        return this
            .click('@requested')
    },
    clickSession(this: knolxRequestPage) {
        return this
            .click('@session')
    },
    clickEditButton(this: knolxRequestPage) {
        return this
            .click('@titleEdit')
    },
    editTitle(this: knolxRequestPage, text: string) {
        return this
            .clearValue('@inputTitle')
            .setValue('@inputTitle', text)
            .click('@inputTitle')
    },
    clickSaveButton(this: knolxRequestPage) {
        return this
            .click('@saveButton');
    },
    addingTag(this: knolxRequestPage, tag: string) {
        return this
            .click('@addTag')
            .setValue('@tagInput', tag)
    },
    saveTag(this: knolxRequestPage) {
        return this
            .click('@saveTag')
    },
    RemovingTag(this: knolxRequestPage) {
        return this
            .click('@removeTag')
    },
    clickEditDesc(this: knolxRequestPage) {
        return this
            .click('@describeEdit')
    },
    DescriptionEdit(this: knolxRequestPage, desctext: string) {
        return this
            .clearValue('@descriptionInput')
            .setValue('@descriptionInput', desctext)
    },
    SavingDescription(this: knolxRequestPage) {
        return this
            .click('@descriptionSave')
    },
    clickSlideEdit(this: knolxRequestPage) {
        return this
            .click('@slideEdit')
    },
    SlideEdit(this: knolxRequestPage, slideText: string) {
        return this
            .clearValue('@slideInput')
            .setValue('@slideInput', slideText)
    },
    savingSlide(this: knolxRequestPage) {
        return this
            .click('@slideSave')

    },
    clickDropdown(this: knolxRequestPage, optionValue: string) {
        return this
            .click('@dropdown')
            .setValue('@dropdown', optionValue)
    },
    UpdatingFeedback(this: knolxRequestPage) {
        return this
            .click('@feedbackUpdate')

    },

    ClickRemarks(this: knolxRequestPage, retext: string) {
        return this
            .clearValue('@remarks')
            .setValue('@remarks', retext)
            .click('@remarks')

    },
    ApprovingSession(this: knolxRequestPage) {
        return this
            .click('@approveButton')
    },
    RejectingingSession(this: knolxRequestPage) {
        return this
            .click('@rejectButton')
    },

};

const knolxRequestPage: PageObjectModel = {
    
    url: "https://nashtechglobal.qa.go1percent.com/my-dashboard",
    
    commands: [Go1Commands],

    elements: {
        emailInput: '#username',
        passwordInput: '#password',
        signIn: "#kc-login",
        adminLink: {
            selector: "//h6[normalize-space()='ADMIN']",
            locateStrategy: 'xpath'
        },
        knolx: {
            selector: "//span[normalize-space()='Knolx']",
            locateStrategy: 'xpath'
        },
        manageSessions: {
            selector: "//a[@href='/knolx/requested-sessions']",
            locateStrategy: 'xpath'
        },
        requested: {
            selector: "//a[normalize-space()='Requested']",
            locateStrategy: 'xpath'
        },
        totalrecords: '.ml-2',
        session: ".cell-name.session.session-title",
        titleEdit: "div[class='mt-2 d-flex justify-content-end'] button[class='btn btn-primary edit-session-button floatRight']",
        inputTitle: "input[type='text']",
        saveButton: '.btn.btn-primary.save-session-button.mx-2',
        titleMessage: "div[aria-label='Successfully Updated']",
        addTag: "a[role='button']",
        tagInput: {
            selector: "//input[@aria-expanded='false']",
            locateStrategy: 'xpath'
        },
        saveTag: 'button.mx-2:nth-child(1)',
        removeTag: 'i.fa:nth-child(1)',
        describeEdit: '.btn.edit',
        descriptionSave: '.btn.btn-primary.saveBtn.mx-2.mt-2',
        descriptionInput: 'div.mb-2.mt-4.px-4 > div:nth-child(2) textarea',
        slideInput: 'div.w-100 textarea.session-input[formcontrolname="slideURL"]',
        slideEdit: '.slide-url-button-div > button.btn.btn-primary.edit-session-button.floatRight',
        slideSave: '.btn.btn-primary.save-session-button.mx-2',
        dropdown: '.quarter-dropdown',
        feedbackUpdate: '.btn.btn-primary.save-session-button.save-session',
        remarks: "textarea[placeholder='Please add the reason for rejecting/declining the request.']",
        approveButton: '.btn.approve-btn.btns',
        rejectButton: '.btn.reject-btn.btns.mx-3',
    },
    
};

export default knolxRequestPage;

export interface knolxRequestPage
    extends EnhancedPageObject<typeof Go1Commands,
        typeof knolxRequestPage.elements> { }