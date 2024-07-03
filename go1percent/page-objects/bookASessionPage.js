
module.exports = {
    url: "",
    elements: {
        knolxMenuOption: "[src='../../../assets/Icons/knolx.svg']",      
        bookASessionButton: ".nav-link.text-white[href='/knolx/book-a-session']",
        resetButton:'.btn.btn-primary.bg-cancel.text-black.ms-2',
        topicTileInput: "input[placeholder='Title of the Session']",
        sessionBrief:"textarea[placeholder='Write a short description about your session.']",
        errorMessage:".errorMessage.ng-star-inserted",        
        webinarLabel:"label[for='webinar']",        
        meetupLabel: "label[for='meetup']",
        coPresenterField:"input[placeholder='Search']",
        selectDateTime:"input[type='datetime-local']",
        categoryDropDown: "select[formcontrolname='category']",
        submitButton:"button[type='submit']",
        knolxLabel:"label[for='knolx']",     
        subCategoryDropDown: "select[formcontrolname='subCategory']",
        
        unAvailableDates: {
            selector: '//span[@class="bg-unavailable text-white ng-star-inserted"]',
            locateStrategy: 'xpath'
        },
        availableSlots: {
            selector: '//div[@class="d-flex flex-row card ps-3 py-2 mt-3 available slot-not-clicked ng-star-inserted"]',
            locateStrategy: 'xpath'
        },
        availableDates: {
            selector: '//span[@class="bg-unavailable text-white bg-available ng-star-inserted"]',
            locateStrategy: 'xpath'
        },
        lastAvailableDate: {
            selector: '(//span[@class="bg-unavailable text-white bg-available ng-star-inserted"])[last()]',
            locateStrategy: 'xpath'
        },
        testAutomationOption: {
            selector: "//option[contains(text(),'TEST AUTOMATION COMPETENCY ')]",
            locateStrategy: 'xpath',
        },
        cypressOption: {
            selector: "//option[contains(text(),' Cypress ')]",
            locateStrategy: 'xpath',
        },
        removeCoPresenter:{
            selector:"//delete-icon[@aria-label='Remove tag']//span//*[name()='svg']",
            locateStrategy:'xpath'
        },
    },
    commands: [{
        waitForPageLoad() {
            return this
                .waitForElementVisible('body', 10000);
        },

        clickOnElement(element) {
            return this
                .waitForElementVisible(element, 10000)
                .click(element)
                .waitForPageLoad();
        },

        clickOnKnolxButton() {
            return this
                .clickOnElement("@knolxMenuOption");
        },

        clickbookASessionButton() {
            return this
                .clickOnElement("@bookASessionButton");
        },

        clickOnUnavailableDates() {
            return this
                .clickOnElement("@unavailableDates");
        },

        checkForAvailableSlots: function () {
            this.api.execute(function () {
                window.scrollBy(0, 400);
            });
            return this;
        },

        clickUnAvailableDateAndCheckAvailability: function () {
            return this
                .waitForElementVisible('@unAvailableDates', 5000)
        },

        fillDetails(){
            return this
            .clickOnElement('@lastAvailableDate')
            .execute(function () {
              window.scrollBy(0, 400);
            })
            .clickOnElement('@availableSlots')
            .clickOnElement("@categoryDropDown")
            .clickOnElement("@testAutomationOption")
            .clickOnElement("@subCategoryDropDown")
            .clickOnElement("@cypressOption")
            .clickOnElement("@topicTileInput")
            .clearValue('@topicTileInput') 
            .setValue('@topicTileInput', 'Automation Test')
            .clearValue('@sessionBrief')
        },
        
        sessionType(){
            return this
            .clickOnElement('@lastAvailableDate')
            .clickOnElement('@availableSlots')     
        },
        
        validateDateTime() {
            return this
            .clickOnElement('@lastAvailableDate')
            .clickOnElement('@availableSlots')
        },

        validateDifferentSessions() {
            return this
              .clickOnElement('@lastAvailableDate')
              .clickOnElement('@availableSlots')
        },

          validateCoPresenterEntry() {
            return this
              .clickOnElement("@coPresenterField")
              .setValue('@coPresenterField', ['Mayank Verma', this.api.Keys.ENTER])
        },

          validateCoPresenterRemoval() {
            return this
              .clickOnElement("@removeCoPresenter")
        },   
          
        validateReset() {
            return this
            .setValue('@sessionBrief', 'This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test This is a Automation Test ')           
            .clickOnElement("@resetButton");
        },

          validateSubCategoryDropdown() {
            return this
              .clickOnElement('@lastAvailableDate')
              .clickOnElement('@availableSlots')
        },
          
        validateUnselect(){
            return this
            .clickOnElement('@lastAvailableDate')
            .clickOnElement('@availableSlots')
            .clickOnElement('@lastAvailableDate')
            .getText('input[type="datetime-local"]', (result) => {
                const expectedValue = "";
                this.assert.strictEqual(result.value.trim(), expectedValue, `No date is selected: ${result.value}`);
              });
        },

        verifyDropDown() {
            return this
            .clickOnElement('@lastAvailableDate')
            .execute(function () {
              window.scrollBy(0, 400);
            })
            .clickOnElement('@availableSlots')
            .clickOnElement("@categoryDropDown")
            .clickOnElement("@testAutomationOption")
            .click('@subCategoryDropDown') 
            .click('select[formcontrolname="subCategory"] option') 
        },
        
        verifyAvailableDatesGreenColor() {
            return this
                .waitForElementVisible('@availableDates', 10000)
                .clickOnElement("@availableDates")
        },
    }],
};
