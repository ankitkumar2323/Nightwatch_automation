module.exports={
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
    commands:[{
        navigateToAdminHelpDesk(){
            this.click('@adminSection')
            .click('@adminHelpDesk')
            .assert.urlContains('/helpdesk/summary')
            return this;
        },
        updateTicket(status){
            var ticketid=""
            this.getText('@selectFirstTicket', function(result) {
                ticketid= result.value;
             })
             .click('@selectFirstTicket')
             .click(status)
             .assert.not.attributeEquals('@updateBtn', 'disabled', 'true', 'Button is not disabled')
             .click('@updateBtn')
             .waitForElementVisible('@successMessage')
             return ticketid;
        },
        verifyUpdatedTicketStatus(ticketNumber){
            browser.page.helpdesk.ticketRaised.logout().signOut()
            browser.page.login().enterCredentials('testemployee','testemployee').signIn()
            browser.page.helpdesk.ticketRaised.tickets().navigateToHelpDesk()
            .click('@closedTickets')
            .assert.textContains('@selectFirstTicket',ticketNumber)
        },
        switchToAdminHelpDesk(){
            browser.page.helpdesk.ticketRaised.logout().signOut()
            browser.page.login().enterCredentials('testadmin','testadmin').signIn()
            return this.navigateToAdminHelpDesk()
        },
        selectClosedTickets(){
           return this.click('@closedTicketSection')
        },
        verifyTicketIdInOpenTickets(ticketId){
            return this.click('@backbtn')
                   .assert.textContains('@selectFirstTicket',ticketId)
        }
    }]
}