import { NightwatchBrowser } from 'nightwatch';

import { LoginPage } from '../../../page-objects/login';
import { ManageSlotPage } from '../../../page-objects/manageSlot/manageSlotPage'
let login: LoginPage;
let manageslotpage: ManageSlotPage;

describe("KNolx|Manage Slot Frontend Automation", () => {
    before(function () {
        login = browser.page.login() as LoginPage
        manageslotpage = browser.page.manageSlot.manageSlotPage() as ManageSlotPage

        browser.window.maximize()
        login.navigate()
            .enterCredentials(browser.globals.adminUserName, browser.globals.adminPassword)
            .signIn()
            .assert.urlContains("my-dashboard")
        manageslotpage.waitForPageLoad()
        manageslotpage.clickAdminButton()
            .clickKnolxButton()
            .clickOnManageSlot()
        browser.assert.urlContains("manage-slots");

    });

    it('Verify that admin should be able to create a slot', function (browser: NightwatchBrowser) {

        manageslotpage
            .pause(3000)
            .clickOnDateInCalendar()
        manageslotpage
            .clickSlotTypeKnolx()
            .createSlot('API Testing')
            .clickOnDownArrow()
        manageslotpage.clickSaveSlotButton()
        browser.pause(2000)
        manageslotpage.assert.textContains('@successfullyCreatedSlotMessage', 'Slot Created Successfully');
    }),


        it("Verify admin cannot select a past time to create a slot", function (browser: NightwatchBrowser) {
            manageslotpage
                .waitForPageLoad()
                .clickOnPresentDate()
                .clickSlotTypeKnolx()
                .createSlot('API Testing')
                .clickOnDownArrow()
                .clickSaveSlotButton()
                .waitForPageLoad()
                .assert.textContains('@errorMessage', 'Please do not enter past time')
                .clickOnCancelButton();
        }),

        it('Verify that create a slot popup should display current date and time', async function (browser: NightwatchBrowser) {
            manageslotpage
                .waitForPageLoad()
                .clickOnDateInCalendar();
                const formattedDate = manageslotpage.getFormattedCurrentDate();
                await manageslotpage.waitForPageLoad();
                const slotStartDate = await manageslotpage.getSlotStartDate()
                browser.assert.equal(slotStartDate, formattedDate);
            
            manageslotpage.clickOnCancelButton();
        }),

        it("Verify that admin should not be able to create a slot without adding title and type", function (browser: NightwatchBrowser) {
            manageslotpage
                .waitForPageLoad()
                .clickOnDateInCalendar()
            manageslotpage
                .assert.attributeEquals("@saveSlotButton", "disabled", "true")
                .clickOnCancelButton();
        }),

        it("Verify that date and time is selected upon creating a slot", function (browser: NightwatchBrowser) {
            manageslotpage
                .waitForPageLoad()
                .clickOnPresentDate()
                .assert.elementPresent('@slotStartDateInput')
                .assert.elementPresent('@slotStartTimeInput')
                .clickOnCancelButton();
        }),

        it("Verify that admin should be able to automate slot", function (browser: NightwatchBrowser) {

            manageslotpage
                .waitForPageLoad()
                .clickOnAutomateSlot()
                .clickSlotTypeKnolx()
                .clickSelectSessionDropdown()
                .clickOnDropDownValue()
                .clickSaveSlotButton()
                .assert.elementPresent("@automateSlotCreationMessage");
        }),
        
    it("Verify that admin can select any session type", function (browser: NightwatchBrowser) {

        manageslotpage
            .waitForPageLoad()
            .clickOnDateInCalendar()
        manageslotpage
            .clickSlotTypeKnolx()
            .clickSlotTypeWebinr()
            .clickSlotTypeMeetup()
            .clickSlotTypeKnolmeet()
            .assert.textContains('@knolx', 'Knolx')
            .assert.textContains('@webinr', 'Webinar')
            .assert.textContains('@meetup', 'Meetup')
            .assert.textContains('@knolmeet', 'Knolmeet')
            .clickOnCancelButton();
  
    }),
        
                it("Verify that update, delete, and cancel buttons are visible on a free slot", function (browser: NightwatchBrowser) {
                    manageslotpage
                        .waitForPageLoad()
                        .clickFreeSlot()
                        manageslotpage
                        .assert.elementPresent('@updateButton')
                        .assert.elementPresent('@CancelButton')
                        .assert.elementPresent('@deleteButton')
                        .clickOnCancelButton();
                }),
        
                it("Verify that admin can delete a free slot session", function (browser: NightwatchBrowser) {
                    manageslotpage
                        .waitForPageLoad()
                        .clickDeleteFreeSlot()
                        .deleteButton()
                        .deleteConfirmPopUpYesButton()
                        .pause(2000)
                        .assert.textContains('@successfullyDeletedMessage', 'Session Deleted Successfully');
        
                });
        
            it("Verify that admin can update free slot details", function (browser: NightwatchBrowser) {
                manageslotpage
                    .waitForPageLoad()
                    .clickFreeSlotToUpdate()
                    .clickSlotTypeWebinr()
                    .updateSlot('Automation Testing')
                    .clickOnDownArrow()
                    .clickOnUpArrow()
                    .clickupdateButton()
                    .pause(2000)
                    .assert.containsText('@successfullyUpdateFreeSlot', 'Session Updated Successfully');
        
            }),
        
                it('Verify that upon clicking on Knolx session, it navigates to the approve page', function (browser: NightwatchBrowser) {
                    manageslotpage.waitForPageLoad()
                        .clickApproveKnolxSession()
                        .assert.elementPresent('@approve');
        
                });
        after(function (browser: NightwatchBrowser) {
            browser.end();
        })



});