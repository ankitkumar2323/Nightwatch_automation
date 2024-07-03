//UI Test cases 
import { NightwatchBrowser } from "nightwatch";
const fetchElements = browser.page.helpdesk.ticketAssignedToMe.ticketPage();

describe("TicketAssignedToMe Frontend Automation", () => {
    beforeEach((browser: NightwatchBrowser) => {
        fetchElements
            .maximizeWindow()
            .navigate()
            .enterCredentials()
            .signInButton()
            .assert.urlContains("my-dashboard");
    })

    /**
    * @function viewAllFieldsPresentOnOpenTicketPage
    * @description Verify all fields are present on Open ticket chat page.
    */
    it("verify all fields are present on Open ticket chat page 880", () => {
        fetchElements
            .chatPage()
            .assert.elementPresent("@status")
            .assert.elementPresent("@category")
            .assert.elementPresent("@priority")
            .assert.elementPresent("@assignedTo")
            .isVisible("@updateButton")
            .end();
    }),

        /**
         * @function userShouldAbleToSendMessage
         * @description Verify user should be able to send message on Open ticket chat page.
         */
        it("verify user able to send message successfully 897", () => {
            fetchElements
                .chatPage()
                .MessageSend()
                .clickOnsendButton()
                .end();
        }),

        /**
         * @function userShouldAbleToAttachFile
         * @description Verify user should attach file and send successfully.
         */
        it("verify attach file equal to sended value 898", () => {
            const messageToBeSend = 'this is for testing purpose';
            fetchElements
                .chatPage()
                .pause(3000)
                .MessageSend()
                .attachFile()
                .pause(2000)
                .clickOnsendButton()
                .getText('@firstChatMessage', (result: { value: string; }) => {
                    browser.assert.equal(result.value, messageToBeSend, 'Div value matches the expected value.');
                })
                .end();
        }),

        /**
         * @function userShouldAbleToChangeCategory
         * @description Verify user should be able to change category on Open ticket chat page.
         */
        it("verify category should updated 899", () => {
            fetchElements
                .chatPage()
                .pause(1000)
                .clickKnolxCategory()
                .pause(1000)
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),

        /**
         * @function userShouldAbleToChangePriority
         * @description Verify user should able to change priority on Open ticket chat page.
         */
        it("verify Priority should updated 900", () => {
            fetchElements
                .chatPage()
                .clickOnPriority()
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),

        /**
         * @function userShouldAbleToChangeAssignedName
         * @description Verify user should able to change assigned name on Open ticket chat page.
         */
        it("Verify user able to change Assigned name on the ticket chat page 901", () => {
            const assignedValue = 'Ankit';
            fetchElements
                .chatPage()
                .clickAssignedToClear()
                .pause(1000)
                .setValue('@assignedNameInput', assignedValue)
                .click('@assignedNameSuggestion')
                .isVisible('@updateButton')
                .waitForElementVisible('@updateButton')
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),

        /**
         * @function userShouldAbleToChangeStatus
         * @description Verify user should able to change status of ticket on Open ticket chat page.
         */
        it("Updating status of ticket open to close 902", () => {
            fetchElements
                .chatPage()
                .clickOnstatus()
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),

        /**
         * @function userShouldAbleToSeeSavedConversation
         * @description Verify saved conversations are present on Closed ticket chat page.
         */
        it("verify saved conversation is present on closed chat page 904", () => {
            fetchElements
                .closedTicketPage()
                .clickLastClosedTicket()
                .waitForElementVisible('@savedConversation')
                .assert.elementPresent('@savedConversation')
                .waitForElementVisible('@allFieldsForm')
                .assert.elementPresent('@allFieldsForm')
                .end();
        }),

        /**
         * @function userShouldAbleToSeeClosedTicket
         * @description Verify closed ticket is  present on closed ticket page.
         */
        it("verifying closed ticket is present on closed page", () => {
            fetchElements
                .closedTicketPage()
                .waitForElementVisible('@closedTicketPage')
                .assert.elementPresent('@closedTicketPage')
                .end();
        }),

        /**
         * @function viewAllFieldsPresentOnClosedTicketPage
         * @description Verify all fields are present on Closed ticket chat page.
         */
        it("Verify user should be able to see all fields in Close ticket page 903", () => {
            fetchElements
                .closedTicketPage()
                .clickLastClosedTicket()
                .assert.elementPresent('@statusCheck')
                .assert.elementPresent('@category')
                .assert.elementPresent('@priorityCheck')
                .assert.elementPresent('@assignedCheck')
                .assert.elementPresent('@updateButton')
                .end()
        }),

        /**
         * @function userShouldAbleToReopenClosedTicket
         * @description Verify user should able to reopen  closed ticket.
         */
        // test case is not working due to bug on closed ticket page 
        it("Updating status of ticket close to open", () => {
            fetchElements
                .closedTicketPage()
                .clickLastClosedTicket()
                .clickStatusOpen()
                .waitForElementVisible('@updateButton')
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),

        /**
         * @function userShouldAbleToChangeCategoryOnClosedTicket
         * @description Verify user should able to change category of closed ticket.
         */
        //test case is not working due to bug on closed ticket page 
        it("verify category should updated on closed ticket", () => {
            fetchElements
                .closedTicketPage()
                .clickLastClosedTicket()
                .clickKnolxCategory()
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),

        /**
         * @function userShouldAbleToChangePriorityOnClosedTicket
         * @description Verify user should able to change priority on closed ticket.
         */
        // //test case is not working due to bug on closed ticket page 
        it("verify Priority should updated in closed ticket", () => {
            fetchElements
                .closedTicketPage()
                .clickLastClosedTicket()
                .clickOnPriority()
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        }),

        /**
     * @function userShouldAbleToChangeAssignedNameOnClosedTicket
     * @description Verify user should able to change assigned name on closed ticket page.
     */
        //test case is not working due to bug on closed ticket page 
        it("Verify Assigned name saved on the ticket", () => {
            const assignedValue = 'Ankit';
            fetchElements
                .closedTicketPage()
                .clickLastClosedTicket()
                .clickAssignedToClear()
                .setValue('@assignedNameInput', assignedValue)
                .click('@assignedNameSuggestion')
                .pause(2000)
                .clickOnupdateButton()
                .waitForElementVisible('@statusMessage')
                .assert.elementPresent('@statusMessage')
                .end();
        })

});

