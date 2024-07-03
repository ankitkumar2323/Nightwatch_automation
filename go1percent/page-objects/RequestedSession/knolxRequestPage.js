module.exports = {
    url: "",

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
        // descriptionInput not working with other selectors as it keeps changing
        descriptionInput: 'body > app-root > div > app-main > section > main > div > div > div > app-knolx > div > app-manage-session-detail > div.card.page-wrapper > div.row.manage-session-detail > div.col-xl-8.col-lg-8.col-md-7 > form > div.mb-2.mt-4.px-4 > div:nth-child(2) > textarea',
        slideInput: '.bg-transparent.spanText.text-sm.px-1.mr-2.session-input.div-item.ng-untouched.ng-pristine.ng-valid',
        slideEdit: {
            selector: "(//button[@class='btn btn-primary edit-session-button floatRight'][normalize-space()='Edit'])[2]",
            locateStrategy: 'xpath'
        },

        slideSave: '.btn.btn-primary.save-session-button.mx-2',
        dropdown: '.quarter-dropdown',
        feedbackUpdate: '.btn.btn-primary.save-session-button.save-session',
        remarks: "textarea[placeholder='Please add the reason for rejecting/declining the request.']",
        approveButton: '.btn.approve-btn.btns',
        rejectButton: '.btn.reject-btn.btns.mx-3',
    },

    commands: [{
        enterCredentials(email, password) {
            return this
                .setValue('@emailInput', email)
                .pause(1000)
                .setValue('@passwordInput', password)
                .pause(1000)
        },
        signIn() {
            return this
                .click("@signIn")
        },
        clickAdmin() {
            return this
                .click('@adminLink')
        },
        clickKnolx() {
            return this
                .click('@knolx')
        },
        clickmanageSession() {
            return this
                .click('@manageSessions')
        },
        clickRequested() {
            return this
                .click('@requested')
        },
        clickSession() {
            return this
                .click('@session')
        },
        clickEditButton() {
            return this
                .click('@titleEdit')
        },
        editTitle(text) {
            return this
                .clearValue('@inputTitle')
                .setValue('@inputTitle', text)
                .click('@inputTitle')
        },
        clickSaveButton() {
            return this
                .click('@saveButton');
        },
        addingTag(tag) {
            return this
                .click('@addTag')
                .setValue('@tagInput', tag)
        },
        saveTag() {
            return this
                .click('@saveTag')
        },
        RemovingTag() {
            return this
                .click('@removeTag')
        },
        clickEditDesc() {
            return this
                .click('@describeEdit')
        },
        DescriptionEdit(desctext) {
            return this
                .clearValue('@descriptionInput')
                .setValue('@descriptionInput', desctext)
        },
        SavingDescription() {
            return this
                .click('@descriptionSave')
        },
        clickSlideEdit() {
            return this
                .click('@slideEdit')
        },
        SlideEdit(slideText) {
            return this
                .clearValue('@slideInput')
                .setValue('@slideInput', slideText)
        },
        savingSlide() {
            return this
                .click('@slideSave')

        },
        clickDropdown(optionValue) {
            return this
                .click('@dropdown')
                .setValue('@dropdown', optionValue)
        },
        UpdatingFeedback() {
            return this
                .click('@feedbackUpdate')

        },

        ClickRemarks(retext) {
            return this
                .clearValue('@remarks')
                .setValue('@remarks', retext)
                .click('@remarks')

        },
        ApprovingSession() {
            return this
                .click('@approveButton')
        },
        RejectingingSession() {
            return this
                .click('@rejectButton')
        },

    }]
};

