import { NightwatchTests,NightwatchBrowser } from "nightwatch";


describe('Go 1 Percent TicketRaised BY Me Module', () => {
    
    before((browser:NightwatchBrowser)=>{
        browser
            .window.maximize()   
            .page.helpdesk.ticketRaised.login()
            .navigate()
            .enterCredentials('testemployee','testemployee')
            .signIn()
            
    }),
    it('should be able to Chat on OpenTicketPage',function(){
        const ticket =browser.page.helpdesk.ticketRaised.ticket();
        ticket
        .navigateToHelpDesk().waitForElementVisible('@selectFirstTicket',10000)
        .click('@selectFirstTicket') 
        .assert.containsText('@ticketStatus','OPEN')
        .enterMessage('sending')
        .sendMessage()
        .pause(6000)
        .assertMessage()
    }), 
    it('should be able to send file on OpenTicketPage',function(){
        const ticket =browser.page.helpdesk.ticketRaised.ticket();
        ticket
        .waitForElementVisible('@commentBox')
        .waitForElementVisible('@messageSection')
        .enterMessage('sending with file')
        .attachFile()
        .sendMessage().pause(5000)
        .assertFileSentSuccessfully()
    }),
    it('should be able to See on OpenTicketPage', function(){ 
        const ticket =browser.page.helpdesk.ticketRaised.ticket();
        ticket.assert.visible('@messageSection')

    })
});