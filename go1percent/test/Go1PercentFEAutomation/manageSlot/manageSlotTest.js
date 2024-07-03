const globalsData = require('../../../globals');
const ManageSlotPages= browser.page.MANAGESLOT.ManageSlotPages();

//const ManageSlotPages=require('../page-objects/MANAGESLOT/ManageSlotPages.js');
//const login = browser.page.login();
//const ManageSlotPages= browser.page.ManageSlotPages()

describe("KNolx|Manage Slot Frontend Automation", () => {
before(async function (done) {
await browser
.window.maximize()
.page.login()
.navigate()
.enterCredentials(browser.globals.adminUserName, browser.globals.adminPassword)
.signIn()
ManageSlotPages.waitForPageLoad()
//.page.ManageSlotPages().waitForPageLoad()
.assert.urlContains("my-dashboard")
await ManageSlotPages.waitForPageLoad()
try {
await ManageSlotPages.clickAdminButton();
await ManageSlotPages.clickKnolxButton();
await ManageSlotPages.clickOnManageSlot();
await ManageSlotPages.assert.urlContains("manage-slots");
} catch (error) {
done.fail(error);
return;
}
}),

it ('Verify that admin should be able to create a slot ', function () { 

ManageSlotPages
.pause(3000)
.clickOnDateInCalendar()
ManageSlotPages.clickSlotTypeKnolx();
ManageSlotPages.createSlot('API Testing')
.clickOnDownArrow();
ManageSlotPages.clickSaveSlotButton();
ManageSlotPages.pause(2000)
.assert.containsText('@successfullyCreatedSlotMessage','Slot Created Successfully');

}),

it("Verify admin cannot select a past time to create a slot",  function () {
    ManageSlotPages
    .waitForPageLoad()
    .clickOnPresentDate()
    .clickSlotTypeKnolx()
    .createSlot('API Testing')
    .clickOnDownArrow()
    .clickSaveSlotButton()
    .waitForPageLoad()
    .assert.containsText('@errorMessage','Please do not enter past time')
    .clickOnCancelButton();
    }),

it('Verify that create a slot popup should display current date and time', async function() {
ManageSlotPages
.waitForPageLoad()
.clickOnDateInCalendar();
const currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
const year = currentDate.getFullYear();

const formattedDate = `${year}-${month}-${day}`;
await ManageSlotPages.waitForPageLoad();
const slotStartDateElement = await ManageSlotPages.getSlotStartDateElement();
const slotStartTimeElement = await ManageSlotPages.getSlotStartTimeElement();
ManageSlotPages.assert.equal(slotStartDateElement, formattedDate)
ManageSlotPages.clickOnCancelButton();
}),

it("Verify that admin should not be able to create a slot without adding title and type", function () {
ManageSlotPages
.waitForPageLoad()
.clickOnDateInCalendar()
ManageSlotPages
.assert.attributeEquals("@saveSlotButton", "disabled", "true")
.clickOnCancelButton();
}),

it("Verify that date and time is selected upon creating a slot",  function () {
ManageSlotPages
.waitForPageLoad()
.clickOnPresentDate()
//ManageSlotPages 
.assert.elementPresent('@slotStartDateInput')
.assert.elementPresent('@slotStartTimeInput') 
.clickOnCancelButton();
}),

it("Verify that admin should be able to automate slot",  function () {

ManageSlotPages
.waitForPageLoad()
//.pause(3000)
.clickOnAutomateSlot()
.clickSlotTypeKnolx()
.clickSelectSessionDropdown()
.clickOnDropDownValue()
.clickSaveSlotButton()
.assert.elementPresent("@automateSlotCreationMessage");
}),

it("Verify that admin can select any session type", function () {

ManageSlotPages
.waitForPageLoad()
.clickOnDateInCalendar()
ManageSlotPages
.clickSlotTypeKnolx()
.clickSlotTypeWebinr()
.clickSlotTypeMeetup()
.clickSlotTypeKnolmeet()
.assert.containsText('@knolx', 'Knolx')
.assert.containsText('@webinr', 'Webinar')
.assert.containsText('@meetup', 'Meetup')
.assert.containsText('@knolmeet', 'Knolmeet')
.clickOnCancelButton();

}),

it("Verify that update, delete, and cancel buttons are visible on a free slot", function () {
ManageSlotPages
.waitForPageLoad()
.clickFreeSlot()
.assert.elementPresent('@updateButton')
.assert.elementPresent('@cancelButton')
.assert.elementPresent('@deleteButton')
.clickOnCancelButton();
}),

it("Verify that admin can delete a free slot session", function () {
ManageSlotPages
.waitForPageLoad()
.clickDeleteFreeSlot()
.deleteButton()
.deleteConfirmPopUpYesButton()
.pause(2000)
.assert.containsText('@successfullyDeletedMessage','Session Deleted Successfully');

});

it("Verify that admin can update free slot details", function () {
ManageSlotPages
.waitForPageLoad()
.clickFreeSlotToUpdate()
.clickSlotTypeWebinr()
.updateSlot('Automation Testing')
.clickOnDownArrow()
.clickOnUpArrow()
.clickupdateButton()
.pause(2000)
.assert.containsText('@successfullyUpdateFreeSlot','Session Updated Successfully');

}),

it('Verify that upon clicking on Knolx session, it navigates to the approve page', function () {
ManageSlotPages
.waitForPageLoad()
.clickApproveKnolxSession()
.assert.elementPresent('@approve');

});

after(function (done) {
browser.end(); 
done; 
})

});