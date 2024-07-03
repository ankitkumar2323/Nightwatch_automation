import { NightwatchBrowser, NightwatchTests } from "nightwatch";
let reopenedTicketId: string
let ticket=browser.page.helpdesk.ticketRaised.ticket()

describe('Go1Percent Ticket Raised By Me Module',()=>{
    before((browser:NightwatchBrowser)=>{
        browser
            .window.maximize()   
            .page.helpdesk.ticketRaised.login()
            .navigate()
            .enterCredentials('testemployee','testemployee')
            .signIn()
            
    }),
    
    it('submit button should not be Enable without filling all fields',() => {
        
        ticket.navigateToHelpDesk().assertSubmitButtonNotEnabled();
    }),
    it('should be able to see all fields in Open ticket page',() => {
        
        ticket.verifyAllElementsAreVisible();
    }),
    it('should create a new ticket with attached file',() => {
        
        ticket
            .fillAllFields()
            .attachFile()
            .submitAndVerifySuccess()
    }),
    it('should create a new ticket without attached file',() => {
        
        ticket
            .fillAllFields()
            .submitAndVerifySuccess();
    }),
    it('should be able to see all closed tickets', ()=>{
        
        ticket
            .selectClosedTickets()
            .verifyAllElementsAreVisible();
    }),
    it('verify user created ticket should be closed by admin', ()=> {
        var admin = browser.page.helpdesk.ticketRaised.admin();
        ticket.fillAllFields().submitAndVerifySuccess();
        admin.switchToAdminHelpDesk();
        var ticketId = admin.updateTicket('@setStatusClose');
        ticket.verifyUpdatedTicketStatus(ticketId, '@closedTickets');
    }),
    /**
     * @function verifyAdminCanReopenClosedTickets
     * @description Verifies that the admin can reopen closed tickets.
     */
    it('verify admin should be able to reopen closed tickets', function () {
        var admin = browser.page.helpdesk.ticketRaised.admin();
        admin
            .switchToAdminHelpDesk()
            .selectClosedTickets();
        reopenedTicketId = admin.updateTicket('@setStatusOpen');
        admin.verifyTicketIdInOpenTickets(reopenedTicketId);
    }),

    /**
     * @function viewReopenedTicketDetails
     * @description Verifies that the user can view details of a reopened ticket.
     */
    it('user views reopened ticket details', function () {
        ticket
            .hasTicketId(reopenedTicketId)
            .verifyUpdatedTicketStatus(reopenedTicketId, '@openedTickets')
            .assert.textContains('@selectFirstTicket', reopenedTicketId)
            .verifyStatusOfReopenedTicket();
    }),

    /**
     * @function userCannotCloseReopenedTicket
     * @description Verifies that the user cannot close a reopened ticket.
     */
    it('user should not be able to close reopened tickets', function () {
        ticket.assertNoUpdateElementPresent();
    }),

    /**
     * @function userAttachesFileToReopenedTicket
     * @description Verifies that the user can attach a file to a reopened ticket.
     */
    it('user attaches a file to reopened ticket',function () {
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
    })
});