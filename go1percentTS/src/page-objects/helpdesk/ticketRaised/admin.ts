import { PageObjectModel, EnhancedPageObject } from 'nightwatch';
const adminCommands={
    navigateToAdminHelpDesk(this:EnhancedPageObject){
        this.click('@adminSection')
        .click('@adminHelpDesk')
        .assert.urlContains('/helpdesk/summary')
        return this;
    },
    updateTicket(this:EnhancedPageObject,status:string){
        var ticketid:string=""
        this.getText('@selectFirstTicket', function(result:any) {
            ticketid= result.value;
         })
         .click('@selectFirstTicket')
         .click(status)
         .assert.not.attributeEquals('@updateBtn', 'disabled', 'true', 'Button is not disabled')
         .click('@updateBtn')
         .waitForElementVisible('@successMessage')
         return ticketid;
    },
    verifyUpdatedTicketStatus(this:EnhancedPageObject,ticketId:string){
        browser.page.helpdesk.ticketRaised.logout().signOut()
        browser.page.helpdesk.ticketRaised.login().enterCredentials('testemployee','testemployee').signIn()
        browser.page.helpdesk.ticketRaised.ticket().navigateToHelpDesk()
        .click('@closedTickets')
        .assert.textContains('@selectFirstTicket',ticketId)
    },
    switchToAdminHelpDesk(this:EnhancedPageObject){
        browser.page.helpdesk.ticketRaised.logout().signOut()
        browser.page.helpdesk.ticketRaised.login().enterCredentials('testadmin','testadmin').signIn()
        return browser.page.helpdesk.ticketRaised.admin().navigateToAdminHelpDesk()
    },
    selectClosedTickets(this:EnhancedPageObject){
       return this.click('@closedTicketSection')
    },
    verifyTicketIdInOpenTickets(this:EnhancedPageObject,ticketId:string){
        return this.click('@backbtn')
               .assert.textContains('@selectFirstTicket',ticketId)
    }
}
const adminPage:PageObjectModel={
    elements:{
        adminSection:'#sidenav-collapse-main > ul > li:nth-child(8) > div.collapsed',
        adminHelpDesk:'a[href="/helpdesk/summary"]',
        selectFirstTicket:'app-helpdesk .datatable-body-row:nth-child(1) .datatable-body-cell:nth-child(1) div',
        setStatusClose:'#status > option:nth-child(2)',
        setStatusOpen:'#status > option:nth-child(1)',
        updateBtn:'button[class="Update-button btn btn-primary"]',
        successMessage: {
            selector:'//div[contains(text(), "Ticket Updated Successfully!")]',
            locateStrategy:'xpath'
        },
        closedTicketSection:'app-helpdesk app-summary ul > li:nth-child(4) > a',
        backbtn:'button[class="btn backBtn overall-txt-color card addIcon"]'
    },
    commands:[adminCommands]
}
export default adminPage;
export interface AdminPage
  extends EnhancedPageObject<typeof adminCommands,
  typeof adminPage.elements>{ }
