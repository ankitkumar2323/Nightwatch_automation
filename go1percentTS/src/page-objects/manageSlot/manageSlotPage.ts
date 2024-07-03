import { PageObjectModel, EnhancedPageObject, NightwatchAPI } from 'nightwatch';

const ManageslotCommands = {


    clickAdmin(this: ManageSlotPage) {
        return this
            .click('@adminLink')
    },
    waitForPageLoad(this: ManageSlotPage) {
        return this
            .waitForElementVisible('body', 20000)
    },

    clickAdminButton(this: ManageSlotPage) {
        return this.waitForElementVisible('@admin', 5000)
            .click('@admin')

    },

    clickKnolxButton(this: ManageSlotPage) {
        return this.waitForElementVisible('@knolxButton', 10000)
            .click('@knolxButton');

    },

    clickOnManageSlot(this: ManageSlotPage) {
        return this.waitForElementVisible('@manageSlots', 5000)
            .click('@manageSlots');

    },


    clickOnDateInCalendar(this: ManageSlotPage) {
        this.waitForElementVisible('@calendarDate', 5000);
        this.click('@calendarDate');
    },


    clickSlotTypeKnolx(this: ManageSlotPage) {
        return this.waitForElementVisible('@knolx', 5000)
            .click('@knolx');
    },

    createSlot(this: ManageSlotPage, slotTitle: string) {
        return this.waitForElementVisible('@slotTitleInput', 5000)
                   .setValue('@slotTitleInput', slotTitle);


    },

    clickSaveSlotButton(this: ManageSlotPage) {
        return this.waitForElementVisible('@saveSlotButton', 5000)
            .click('@saveSlotButton');
    },

    getSlotStartDateElement(this: ManageSlotPage) {
        return this.waitForElementVisible('@slotStartDateInput', 5000)
            .getAttribute('@slotStartDateInput', 'min');
    },

    getSlotStartTimeElement: function (this: ManageSlotPage) {
        return this.waitForElementVisible('@slotStartTimeInput', 5000)
            .getAttribute('@slotStartTimeInput', 'placeholder');
    },
    clickSlotStartTimeElement: function (this: ManageSlotPage) {
        return this.waitForElementVisible('@slotStartTimeInput', 5000)
            .click('@slotStartTimeInput');
    },

    SuccessfullyCreatedSlotMessage: function (this: ManageSlotPage) {
        return this.waitForElementVisible('@successfullyCreatedSlotMessage', 5000);
    },

    getSlotStartDate(this: ManageSlotPage) {
        return this.waitForElementVisible('@slotStartDateInput', 5000)
            .getAttribute('@slotStartDateInput', 'min');
    },

     getFormattedCurrentDate(): string {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();
    
        return `${year}-${month}-${day}`;
      },


    clickOnPresentDate(this: ManageSlotPage) {
        const currentDate = new Date();

        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(currentDate);

        const xpathSelector = `//a[contains(@aria-label, "${formattedDate}")]`;

        return this
            .useXpath()
            .waitForElementVisible(xpathSelector, 10000)
            .click(xpathSelector)
            .useCss();
    },

    clickOnCancelButton(this: ManageSlotPage) {
        return this.waitForElementVisible('@CancelButton', 5000)
            .click('@CancelButton');
    },

    clickOnDownArrow(this: ManageSlotPage) {
        return this.waitForElementVisible('@downArrow', 10000)
            .click('@downArrow');
    },

    clickOnUpArrow(this: ManageSlotPage) {
        return this.waitForElementVisible('@upArrow', 10000)
            .click('@upArrow');
    },

    clickOnErrorMessage(this: ManageSlotPage) {
        return this.waitForElementVisible('@errorMessage', 5000)
            .click('@errorMessage');
    },
    clickOnAutomateSlot(this: ManageSlotPage) {
        return this.waitForElementVisible('@automateSlot', 5000)
            .click('@automateSlot');
    },
    clickSelectSessionDropdown(this: ManageSlotPage) {
        return this.waitForElementVisible('@selectSessionDropdown', 5000)
            .click('@selectSessionDropdown');
    },
    clickOnDropDownValue(this: ManageSlotPage) {
        return this.waitForElementVisible('@dropDownValue', 5000)
            .click('@dropDownValue');
    },

    getAutomatedSlotMessage(this: ManageSlotPage) {
        return this.waitForElementVisible('@automateSlotCreationMessage', 5000)
    },

    clickSlotTypeWebinr(this: ManageSlotPage) {
        return this.waitForElementVisible('@webinr', 5000)
            .click('@webinr');
    },

    clickSlotTypeMeetup(this: ManageSlotPage) {
        return this.waitForElementVisible('@meetup', 5000)
            .click('@meetup');
    },

    clickSlotTypeKnolmeet(this: ManageSlotPage) {
        return this.waitForElementVisible('@knolmeet', 5000)
            .click('@knolmeet');
    },

    clickFreeSlot(this: ManageSlotPage) {
        return this.waitForElementVisible('@freeSlot', 5000)
            .click('@freeSlot');
    },

    clickFreeSlotToUpdate(this: ManageSlotPage) {
        return this.waitForElementVisible('@updatefreeSlot', 5000)
            .click('@updatefreeSlot');
    },
    clickDeleteFreeSlot(this: ManageSlotPage) {
        return this.waitForElementVisible('@deletefreeSlot', 5000)
            .click('@deletefreeSlot');
    },

    clickupdateButton(this: ManageSlotPage) {
        return this.waitForElementVisible('@updateButton', 5000)
            .click('@updateButton')
    },

    cancelButtonVisibility(this: ManageSlotPage) {
        return this.waitForElementVisible('@CancelButton', 5000)
    },
    deleteButton(this: ManageSlotPage) {
        return this.waitForElementVisible('@deleteButton', 10000)
            .click('@deleteButton');

    },

    deleteConfirmPopUpYesButton(this: ManageSlotPage) {
        return this.waitForElementVisible('@acceptPopUp', 5000)
            .click('@acceptPopUp');
    },

    SuccessfullyDeletedFreeSlotMessage: function (this: ManageSlotPage) {
        return this.waitForElementVisible('@successfullyDeletedMessage', 5000)
    },

    updateSlot(this: ManageSlotPage, updateslotTitle: string) {
        return this.waitForElementVisible('@updateFreeSlotTitle', 5000)
            .click('@updateFreeSlotTitle')
            .clearValue('@updateFreeSlotTitle')
            .setValue('@updateFreeSlotTitle', updateslotTitle)

    },
    SuccessfullyUpdatedFreeSlotMessage: function (this: ManageSlotPage) {
        return this.waitForElementVisible('@successfullyUpdateFreeSlot', 5000)
    },
    clickApproveKnolxSession(this: ManageSlotPage) {
        return this.waitForElementVisible('@knolxSession', 5000)
            .click('@knolxSession');
    },

    clickApproveButton(this: ManageSlotPage) {
        return this.waitForElementVisible('@approve', 5000)
            .click('@approve')
    },
};

const ManageSlot: PageObjectModel = {

    url: "https://nashtechglobal.qa.go1percent.com/my-dashboard",

    commands: [ManageslotCommands],

    elements: {

        admin: {
            selector: "//aside[@id='sidenav-main']//h6[contains(text(),'ADMIN')]",
            locateStrategy: 'xpath'
        },

        knolxButton: {
            selector: "//div[@role='button']//span[contains(text(),'Knolx')]",
            locateStrategy: 'xpath'
        },
        manageSlots: 'a.nav-link.text-white[href="/knolx/manage-slots"]',
        calendarDate: 'a[aria-label="November 30, 2023"]',
        knolx: {
            selector: "//label[contains(text(),'Knolx')]",
            locateStrategy: 'xpath',
        },
        slotTitleInput: 'input[formcontrolname="slotTitle"]',
        saveSlotButton: 'button[class="btn btn-primary button submit-button"]',
        slotStartDateInput: 'input[formcontrolname="date"]',
        successfullyCreatedSlotMessage: 'div[aria-label="Slot Created Successfully"]',
        errorMessage: {
            selector: "//span[contains(text(),'Please do not enter past time')]",
            locateStrategy: 'xpath',
        },
        downArrow:
        {
            selector: "(//div[@class='ngx-timepicker-control']//span[@class='ngx-timepicker-control__arrow'])[2]",
            locateStrategy: 'xpath'
        },
        upArrow:
        {
            selector: "(//div[@class='ngx-timepicker-control']//span[@class='ngx-timepicker-control__arrow'])[1]",
            locateStrategy: 'xpath'
        },
        automateSlot: {
            selector: "//button[text()='Automate Slot']",
            locateStrategy: 'xpath'
        },
        selectSessionDropdown: 'select[name="quarter"]',
        dropDownValue: 'option[value="4"]',
        automateSlotCreationMessage: 'p[class="modal-title spanText pull-left mt-4 mb-2"]',
        webinr: 'label[for="webinar"]',
        meetup: 'label[for="meetup"]',
        knolmeet: 'label[for="knolmeet"]',
        freeSlot: {
            selector: "//td//div[contains(text(),'09:49 pm')]",
            locateStrategy: 'xpath',
        },
        updateButton: 'button[class="btn btn-primary button submit-button"]',
        CancelButton: {
            selector: "//div//button[contains(text(),'Cancel')]",
            locateStrategy: 'xpath',
        },
        deleteButton: {
            selector: "//button[contains(text(),' Delete')]",
            locateStrategy: 'xpath',
        },
        deletefreeSlot: {
            selector: "//td//div[contains(text(),'10:40 am')]",
            locateStrategy: 'xpath',
        },
        acceptPopUp: 'button[class="btn btn-primary button submit-button"]',
        successfullyDeletedMessage: 'div[aria-label="Session Deleted Successfully"]',
        updatefreeSlot: {
            selector: "//td//div[contains(text(),'10:56 pm')]",
            locateStrategy: 'xpath',
        },
        updateFreeSlotTitle: 'input[formcontrolname="newSlotTitle"]',
        successfullyUpdateFreeSlot: 'div[aria-label="Session Updated Successfully"]',
        knolxSession: {
            selector: '//div[contains(text(),"test")]',
            locateStrategy: 'xpath',
        },
        approve: {
            selector: "//span[contains(text(),'Welcome')]",
            locateStrategy: 'xpath',

        },
    }
};

export default ManageSlot;

export interface ManageSlotPage
    extends EnhancedPageObject<typeof ManageslotCommands,
        typeof ManageSlot.elements> {
}