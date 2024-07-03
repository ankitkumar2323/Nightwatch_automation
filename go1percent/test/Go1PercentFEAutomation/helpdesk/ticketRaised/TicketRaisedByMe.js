module.exports ={
    before: function(browser){
        browser
            .windowMaximize()
            .page.login()
            .navigate()
            .enterCredentials('testemployee','testemployee')
            .signIn()
            ticket =browser.page.helpdesk.ticketRaised.tickets()
            ticket.navigateToHelpDesk()
            
    }, 
    /**
     * @function shouldSeeAllFieldsInOpenTicketPage
     * @description Verifies the visibility of all fields in the Open Ticket page.
     */
    'should be able to see all fields in Open ticket page': function () {
        ticket.verifyAllElementsAreVisible();
    },

    /**
     * @function submitButtonNotEnabledWithoutAllFieldsFilled
     * @description Verifies that the submit button is disabled without filling all fields.
     */
    'submit button should not be Enable without filling all fields': function () {
        ticket.assertSubmitButtonNotEnabled();
    },

    /**
     * @function createNewTicketWithAttachedFile
     * @description Verifies the creation of a new ticket with an attached file.
     */
    'should create a new ticket with attached file': function () {
        ticket
            .fillAllFields()
            .attachFile()
            .submitAndVerifySuccess();
    },

    /**
     * @function createNewTicketWithoutAttachedFile
     * @description Verifies the creation of a new ticket without an attached file.
     */
    'should create a new ticket without attached file': function () {
        ticket
            .fillAllFields()
            .submitAndVerifySuccess();
    },

    /**
     * @function seeAllClosedTickets
     * @description Verifies the visibility of all closed tickets.
     */
    'should be able to see all closed tickets': function () {
        ticket
            .selectClosedTickets()
            .verifyAllElementsAreVisible();
    },

    /**
     * @function verifyUserCreatedTicketClosedByAdmin
     * @description Verifies that a ticket created by the user is closed by the admin.
     */
    'verify user created ticket should be closed by admin': function () {
        var admin = browser.page.helpdesk.ticketRaised.admin();
        ticket.fillAllFields().submitAndVerifySuccess();
        admin.switchToAdminHelpDesk();
        var ticketId = admin.updateTicket('@setStatusClose');
        ticket.verifyUpdatedTicketStatus(ticketId, '@closedTickets');
    },

    /**
     * @function verifyAdminCanReopenClosedTickets
     * @description Verifies that the admin can reopen closed tickets.
     */
    'verify admin should be able to reopen closed tickets': function () {
        var admin = browser.page.helpdesk.ticketRaised.admin();
        admin
            .switchToAdminHelpDesk()
            .selectClosedTickets();
        reopenedTicketId = admin.updateTicket('@setStatusOpen');
        admin.verifyTicketIdInOpenTickets(reopenedTicketId);
    },

    /**
     * @function viewReopenedTicketDetails
     * @description Verifies that the user can view details of a reopened ticket.
     */
    'user views reopened ticket details': function () {
        ticket
            .hasTicketId(reopenedTicketId)
            .verifyUpdatedTicketStatus(reopenedTicketId, '@openedTickets')
            .assert.textContains('@selectFirstTicket', reopenedTicketId)
            .verifyStatusOfReopenedTicket();
    },

    /**
     * @function userCannotCloseReopenedTicket
     * @description Verifies that the user cannot close a reopened ticket.
     */
    'user should not be able to close reopened tickets': function () {
        ticket.assertNoUpdateElementPresent();
    },

    /**
     * @function userAttachesFileToReopenedTicket
     * @description Verifies that the user can attach a file to a reopened ticket.
     */
    'user attaches a file to reopened ticket': function () {
        ticket
            .hasTicketId(reopenedTicketId)
            .assert.textContains('@selectFirstTicket', reopenedTicketId)
            .click('@selectFirstTicket')
            .waitForElementVisible('@commentBox')
            .waitForElementVisible('@messageSection')
            .enterMessage('sending test message')
            .attachFile()
            .sendMessage().pause(5000)
            .assertFileSentSuccessfully();
        }
}