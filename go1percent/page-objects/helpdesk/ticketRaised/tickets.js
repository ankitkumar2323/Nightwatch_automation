const customcommands = {
    isElementVisible: function (element) {
        return this.isVisible(element, function (result) {
            this.assert.equal(result.value, true, "[element is visible]");
        })
    },
    verifyAllElementsAreVisible() {
        this.isElementVisible('@ticketid')
        this.isElementVisible('@priority')
        this.isElementVisible('@createdOn')
        this.isElementVisible('@category')
        this.isElementVisible('@assignedTo')
        this.isElementVisible('@status')
    },

    navigateToHelpDesk() {
        return this.waitForElementVisible('@helpdeskSection',10000)
            .click('@helpdeskSection')
            .click('@ticketRaisedByMeSelector')

    },
    assertSubmitButtonNotEnabled() {
        return this.click('@newTicketBtn')
            .assert.containsText('@modalTitle', 'Raise a Ticket')
            .click('@selectcategory')
            .click('@selectpriority')
            .setValue('@inputTitle', '')
            .setValue('@description', 'testing purpose')
            .isEnabled('@submitbtn', function (result) {
                this.assert.equal(result.value, false);
            })
            .click('@cancelbtn')
    },
    fillAllFields() {
        return this.click('@newTicketBtn')
            .assert.containsText('@modalTitle', 'Raise a Ticket')
            .click('@selectcategory')
            .click('@selectpriority')
            .setValue('@inputTitle', 'testing')
            .setValue('@description', 'testing purpose')
    },
    attachFile() {
        const path = require('path')
        return  this.execute(function() {
                    var element = document.querySelector('@attachfile');
                    if (element) {
                        element.scrollIntoView();
                    }
                })
                    .uploadFile('@attachfile',path
                    .resolve(__dirname ,'..','..','..','helpers/Go1PercentFEAutomation/TicketRaised/files','Nightwatch.jpg')).pause(5000)
    },
    submitAndVerifySuccess() {
        return this.click('@submitbtn')
            .waitForElementVisible('@successMessage')
    },

    selectClosedTickets() {
        return this.click('@closedTickets')
            .assert.containsText('@closedTickets', 'Close Ticket')
    },
    verifyUpdatedTicketStatus(ticketNumber, ticketStatus) {
        browser.page.helpdesk.ticketRaised.logout().signOut()
        browser.page.login().enterCredentials('testemployee', 'testemployee').signIn()
        return this.navigateToHelpDesk()
            .click(ticketStatus)
            .assert.textContains('@selectFirstTicket', ticketNumber)
    },
    verifyStatusOfReoepenedTicket() {
        return this.assert.textContains('app-my-tickets .datatable-body-cell:nth-child(7) span', 'OPEN')
    },
    assertNoUpdateElementPresent() {
        return this.expect.element('@updateBtn').to.not.be.present;
    },
    enterMessage(msg){
        return this
        .click('@commentBox')
        .setValue('@commentBox',msg)
    },
    sendMessage(){
        return this.click('@sendBtn')
       
    },
    assertMessage(){
       return browser.elements('xpath',this.elements.messageSection.selector, function (result) {
            const lastElementIndex = result.value.length - 1;         
            const lastElement = result.value[lastElementIndex];
            browser.getText('css selector',lastElement,function(result){
                this.assert.equal(result.value,'sending','message send successfully')
            })

        })
    },
    assertFileSentSuccessfully(){
        browser.elements('xpath',this.elements.attachedFile.selector, function (result) {
            const lastElementIndex = result.value.length - 1;         
            const lastElement = result.value[lastElementIndex];
            browser.getText('css selector',lastElement,function(result){
                console.log(result.value)
                let resultFinalValue = result.value;
                browser.assert.ok(resultFinalValue.includes('attach_file'), 'Expected text "attached_file" is present in the element.');
            })
        })
    },
    hasTicketId(reopenedTicketId){
        if(!reopenedTicketId){
            this.assert.fail('unable to find reopened ticket id')
        }
    }

}
module.exports = {
    elements: {
        helpdeskSection: {
            selector: '(//div[@class="nav-link ps-0 text-white collapsed"])[3]',
            locateStrategy: 'xpath'
        },

        messageSection : {
           selector: '//div[@class="d-flex justify-content-end"]//div[@class="msg-section"]',
           locateStrategy: 'xpath'

        },
        attachedFile:{
            selector: '//div[@class="d-flex justify-content-end"] //div[@class="d-flex flex-row"]',
            locateStrategy:'xpath'
        },

        ticketRaisedByMeSelector: '.show > ul > li:first-child > a:first-child',
        ticketnumber: '.datatable-header-cell > div > span > span',
        ticketid: '.datatable-header-cell:nth-child(2) > div > span > span',
        priority: '.datatable-header-cell:nth-child(3) > div > span > span',
        createdOn: '.datatable-header-cell:nth-child(4) > div > span > span',
        category: '.datatable-header-cell:nth-child(5) > div > span > span',
        assignedTo: '.datatable-header-cell:nth-child(6) > div > span > span',
        status: '.datatable-header-cell:nth-child(7) > div > span > span',

        openedTickets: 'li.mt-1:nth-child(1) > a',
        closedTickets: 'li.mt-1:nth-child(2) > a',

        newTicketBtn: 'button[class="btn btn-primary p-2"]',
        modalTitle: 'h5[class="modal-title pull-left ms-2"]',
        selectcategory: '#category > option:nth-child(2)',
        selectpriority: '#priority > option:nth-child(2)',
        inputTitle: 'input[placeholder="Enter the Title"]',
        description: 'textarea[placeholder="Enter the Description"]',
        attachfile: '#uploadfile',
        submitbtn: 'button[class="btn btn-primary text-white mx-2"]',
        cancelbtn: 'button[class="btn bg-cancel text-black mx-2"]',
        successMessage: {
            selector:'//div[contains(text(), "Submitted Successfully")]',
            locateStrategy:'xpath'
        },

        ticketPage: 'div[class="card me-3 p-4 mt-3"]',
        selectFirstTicket: 'app-helpdesk .datatable-body-row:nth-child(1) .datatable-body-cell:nth-child(1) div',
        ticketStatus: 'div.text-center:nth-child(1)',
        commentBox: 'textarea[placeholder="Enter you text"]',
        sendBtn: 'button[class="send-button bg-gradient-info"]',
        updateBtn: 'button[class="Update-button btn btn-primary"]',

   
    },
    commands: [customcommands]
}