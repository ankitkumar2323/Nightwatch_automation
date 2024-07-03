module.exports = {


    elements: {

        UpcomingSession: {

            selector: '.tabs.newTabs.active',

        },

        ListPresent: {
            selector: '.pending-badge'
            

        },

        ApprovedTemplate: {

            selector: '.approved-badge'
        },

        ApprovedPageTitle: {

            selector: '.pb-2.pt-3.mb-n2.page-title'
        },

        ApprovedDescription: {

            selector: 'div[class="mt-5"] h4'

        },

        ApprovedSlideURL: {

            selector: '.pb-3.mt-2.slideContent'
        },

       
        SessionTypeAndSessionTime: {

            selector: '.text-end',
           
        },

        SessionTitle: {
            selector: 'div.topic',
        
        },

        SessionStatus: {
            selector: 'span.badge'
        },
        EditButton: {

            selector: '.btn.btn-primary.title',

        },

        TextBox: {

            selector: 'textarea[type="text"]',


        },

        SaveButton: {

            selector: '.btn.btn-primary.saveBtn.mt-3',

        },

        ToastMessage: {

            selector: 'div[aria-label="Successfully Updated"]'
        },

        Tags: {

            selector: 'a[role="button"]'
        },

        AddTagTextBox: {

            selector: 'input[type="text"]',

        },

        SaveNewTag: {

            selector: 'button[type="submit"]',
        },

        RemoveTag: {

            selector: '.fa.fa-times',

        },

        DescriptionEditButton: {

            selector: '.btn.btn-primary.edit',

        },

        DescriptionTextBox: {

            selector: 'textarea[type="text"]',

        },

        DescriptionSaveButton: {

            selector: '.btn.btn-primary.saveBtn.m-2',


        },

        ValidationErrorMessage: {

            selector: '.error-message.mt-1'
            //Description should contain atleast 250 characters

        },

        ErrorMessageExceedLength: {

            selector: '.error-message.mt-1'
            //Exceeded the maxlength
        },

        SlideURlBox: {

            selector: '.py-1.px-2.slide.studio-logo'

        },

        URLSaveButton: {

            selector: '.btn.btn-primary.ms-2.save'
        },

        InvalidURlMessage: {

            selector: '.error-message'

        },

        AfterClickingURLBox: {


            selector: 'textarea[type="text"]'
        },

        BackButton: {

            selector: '.btn.backBtn.overall-txt-color.card.addIcon'
        },

        
    },

    commands: [{

        ClickOnListedSession() {

            this
                .waitForElementVisible('@ListPresent', 10000)
                .execute(function () {
                    const g = document.querySelector('.pending-badge');
                    if (g.textContent.trim() === 'Pending for Approval') {
                        g.click();
                    }
                });

            return this
        },

        ClickOnUpcomingSession() {
            return this
                .waitForElementVisible('@UpcomingSession', 10000)
                .click('@UpcomingSession')
                .waitForElementVisible('@ListPresent', 10000)
        },

        ClickOnApprovedSession() {
            Title = '';
            return this
                .waitForElementVisible('@UpcomingSession', 10000)
                .click('@UpcomingSession')
                .waitForElementVisible('@ListPresent', 10000)
                .click('@ApprovedTemplate')
                .getText('@ApprovedPageTitle', function (result) {
                    let Title = result.value;
                   
                })

        },

        SessionWithMultipleData() {

            return this
                .waitForElementVisible('@UpcomingSession', 10000)
                .click('@UpcomingSession')
                .waitForElementVisible('@ListPresent', 10000)
               
        },

        ClickOnAnySession(NewTitle) {

            return this

                .waitForElementVisible('@EditButton', 5000)
                .click('@EditButton')
                .waitForElementPresent('@TextBox', 10000)
                .click('@TextBox')
                .setValue('@TextBox', NewTitle)
                .waitForElementPresent('@SaveButton', 10000)
                .click('@SaveButton')
                .waitForElementVisible('@ToastMessage', 10000)

        },

        WithoutTitle() {

            return this

                .waitForElementVisible('@EditButton', 10000)
                .click('@EditButton')
                .waitForElementPresent('@TextBox', 10000)
                .click('@TextBox')
                .sendKeys('@TextBox', [browser.Keys.CONTROL, 'a'])
                .sendKeys('@TextBox', browser.Keys.BACK_SPACE)


        },

        AddNewTag() {

            return this

                .waitForElementPresent('@Tags', 10000)
                .click('@Tags')
                .waitForElementVisible('@AddTagTextBox', 10000)
                .pause(3000)
                .setValue('@AddTagTextBox', 'Python')
                .click('@SaveNewTag')
                .pause(3000)

        },

        RemoveNewTag() {

            return this

                .waitForElementPresent('@RemoveTag', 10000)
                .pause(5000)
                .click('@RemoveTag')

        },

        UpdateDescriptionBox() {

            return this

                .waitForElementPresent('@DescriptionEditButton', 10000)
                .click('@DescriptionEditButton')
                .waitForElementVisible('@DescriptionTextBox', 10000)
                .getAttribute('@DescriptionTextBox', 'value', function (result) {
                    var attributeValue = result.value;
                    this.setValue('textarea[type="text"]', attributeValue + 'NashTech')
                })
                .waitForElementPresent('@DescriptionSaveButton', 10000)
                .click('@DescriptionSaveButton')


        },

        UnableToUpdateDescription() {
            return this

                .waitForElementPresent('@DescriptionEditButton', 10000)
                .click('@DescriptionEditButton')
                .waitForElementVisible('@DescriptionTextBox', 10000)
                .click('@DescriptionTextBox')
                .setValue('@DescriptionTextBox', 'Hii EveryOne')

        },

        ExceedDescriptionLength() {
            const MAX_DESCRIPTION_LENGTH = 1000; 0
            const INVALID_DESCRIPTION = 'Hi To All I Am Here'.repeat(MAX_DESCRIPTION_LENGTH + 1);

            return this

                .waitForElementPresent('@DescriptionEditButton', 10000)
                .click('@DescriptionEditButton')
                .waitForElementVisible('@DescriptionTextBox', 10000)
                .click('@DescriptionTextBox')
                .setValue('@DescriptionTextBox', INVALID_DESCRIPTION)

        },

        DisableDiscriptionTextBox() {

            return this

                .waitForElementPresent('@DescriptionEditButton', 10000)
                .click('@DescriptionEditButton')
                .waitForElementVisible('@DescriptionTextBox', 10000)
                .click('@DescriptionTextBox')
                .sendKeys('@DescriptionTextBox', [browser.Keys.CONTROL, 'a'])
                .sendKeys('@DescriptionTextBox', browser.Keys.BACK_SPACE)

        },

        UpdateSlideURLField(newvalue) {

            return this

                .waitForElementVisible('@SlideURlBox', 10000)
                .click('@SlideURlBox')
                .setValue('@AfterClickingURLBox', newvalue)
                .waitForElementVisible('@URLSaveButton', 10000)
                .click('@URLSaveButton')

        },

        NotUpdateSlideURL() {

            return this

                .waitForElementVisible('@SlideURlBox', 10000)
                .click('@SlideURlBox')
                .pause(3000)
                .click('@AfterClickingURLBox')
                .sendKeys('@AfterClickingURLBox', [browser.Keys.CONTROL, 'a'])
                .sendKeys('@AfterClickingURLBox', browser.Keys.BACK_SPACE)
                .pause(4000)


           
        },

        InvalideSlideURL(entervalue) {

            return this

                .waitForElementVisible('@SlideURlBox', 10000)
                .click('@SlideURlBox')
                .setValue('@AfterClickingURLBox', entervalue)
                .waitForElementVisible('@URLSaveButton', 10000)
                .click('@URLSaveButton')
        },

        BackButtonEnable() {

            return this
                .waitForElementVisible('@BackButton', 10000)
                .click('@BackButton')

        }



    }]



}