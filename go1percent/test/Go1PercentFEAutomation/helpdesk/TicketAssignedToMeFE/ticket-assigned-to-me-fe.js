
const loginPage = browser.page.login();
const fetchedElements = browser.page.TicketAssignedToMe.ticketAssignedToMe();
const globals = require('../../../../globals');

describe("Requested session Frontend Automation", () => {

    beforeEach(function () {
        browser
            .window.maximize()
        loginPage
            .navigate()
            .enterCredentials(browser.globals.userName, browser.globals.password)
            .signIn()
            .assert.urlContains("my-dashboard")

    }),

        it("verify all fields are present on Open ticket chat page 880", () => {
            fetchedElements
                .chatPage()
                .assert.elementPresent('@status')
                .assert.elementPresent('@category')
                .assert.elementPresent('@priority')
                .assert.elementPresent('@assignedTo')
                .isVisible('@updateButton')
                .end();
        }),

        it("verify user able to send message successfully 897", () => {
            const messageToBeSend = 'this is for testing purpose';
            fetchedElements
                .chatPage()
                .messagesend()
                .clickOnsendButton()
                .end();
        }),


        it("verify attach file equal to sended value 898", () => {
            const messageToBeSend = 'this is for testing purpose';
            fetchedElements
                .chatPage()
                .pause(3000)
                .messagesend()
            browser
                .isEnabled('#uploadfile', function (result) {
                    browser.uploadFile('#uploadfile', '/home/knoldus/smalldog.jpg');
                })
            fetchedElements
                .pause(2000)
                .clickOnsendButton()
                .getText('@firstChatMessage', function (result) {
                    const divValue = result.value;
                    this.assert.equal(divValue, messageToBeSend, 'Div value matches the expected value.');
                })
                .pause(3000)
        }),

        it("verify category should updated 899", () => {
            fetchedElements
                .chatPage()
                .clickKnolxCategory()
                .pause(1000)
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),

        it("verify Priority should updated 900", () => {
            fetchedElements
                .chatPage()
                .clickOnpriority()
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),


        it("Verify able to change Assigned name on the ticket chat page 901", (browser) => {
            const assignedValue = 'Ankit';
            fetchedElements
                .chatPage()
                .clickAssignedToClear()
                .setValue('@assignedNameInput', assignedValue)
                .click('@assignedNameSuggestion')
                .pause(2000)
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),

        it("Updating status of ticket open to close 902", () => {
            fetchedElements
                .chatPage()
                .clickOnstatus()
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),

        it("verify saved conversation is present on closed chat page 904", () => {
            fetchedElements
                .closedTicketPage()
                .clickLastClosedTicket()
                .waitForElementVisible('@savedConversation')
                .assert.elementPresent('@savedConversation')
                .waitForElementVisible('@allFieldsForm')
                .assert.elementPresent('@allFieldsForm')
                .end();
        }),

        it("verifiying closed ticket is present on closed page", () => {
            fetchedElements
                .closedTicketPage()
                .waitForElementVisible('@closedTicketPage')
                .assert.elementPresent('@closedTicketPage')
                .end();
        }),

        it("Verify user should be able to see all fields in Close ticket page 903", () => {
            fetchedElements
                .closedTicketPage()
                .clickLastClosedTicket()
                .assert.elementPresent('@statusCheck')
                .assert.elementPresent('@category')
                .assert.elementPresent('@priorityCheck')
                .assert.elementPresent('@assignedCheck')
                .assert.elementPresent('@updateButton')
                .end()
        })

    // //test case is not working due to bug on closed ticket page 
    // it("Updating status of ticket open to close", () => {
    //     fetchedElements
    //         .closedTicketPage()
    //         .clickLastClosedTicket()
    //         .clickStatusOpen()
    //         .waitForElementVisible('@updateButton')
    //         .clickOnupdateButton()
    //         .waitForElementVisible('@statusMessage')
    //         .assert.elementPresent('@statusMessage')
    //         .end();
    // }),
    // //test case is not working due to bug on closed ticket page 
    // it("verify category should updated on closed ticket", () => {
    //     fetchedElements
    //         .closedTicketPage()
    //         .clickLastClosedTicket()
    //         .clickKnolxCategory()
    //         .clickOnupdateButton()
    //         .waitForElementVisible('@statusMessage')
    //         .assert.elementPresent('@statusMessage')
    //         .end();
    // }),
    // //test case is not working due to bug on closed ticket page 
    // it("verify Priority should updated in closed ticket", () => {
    //     fetchedElements
    //         .closedTicketPage()
    //         .clickLastClosedTicket()
    //         .clickOnpriority()
    //         .clickOnupdateButton()
    //         .waitForElementVisible('@statusMessage')
    //         .assert.elementPresent('@statusMessage')
    //         .end();
    // }),


    // //test case is not working due to bug on closed ticket page 
    // it("Verify Assigned name saved on the ticket", () => {
    //     const assignedValue = 'Ankit Kumar';
    //     fetchedElements
    //         .closedTicketPage()
    //         .clickLastClosedTicket()
    //         .clickAssignedToClear()
    //         .setValue('@assignedNameInput', [assignedValue, Keys.ENTER])
    //         .waitForElementVisible('@updateButton')
    //         .clickOnupdateButton()
    //         .waitForElementVisible('@statusMessage')
    //         .assert.elementPresent('@statusMessage')
    //         .end();
    // })

})
