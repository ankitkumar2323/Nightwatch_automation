import { PageObjectModel, EnhancedPageObject } from 'nightwatch';
const ticketCommands={
   
    verifyAllElementsAreVisible(this:EnhancedPageObject) {
        this.assert.visible('@ticketid')
        this.assert.visible('@priority')
        this.assert.visible('@createdOn')
        this.assert.visible('@category')
        this.assert.visible('@assignedTo')
        this.assert.visible('@status')
        return this;
    },
    navigateToHelpDesk(this:EnhancedPageObject) {
        return this.waitForElementVisible('@helpdeskSection',10000)
            .click('@helpdeskSection')
            .click('@ticketRaisedByMeSelector')

    },
    assertSubmitButtonNotEnabled(this:EnhancedPageObject) {
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
        fillAllFields(this:EnhancedPageObject) {
            return this.click('@newTicketBtn')
                .assert.containsText('@modalTitle', 'Raise a Ticket')
                .click('@selectcategory')
                .click('@selectpriority')
                .setValue('@inputTitle', 'testing')
                .setValue('@description', 'testing purpose')
        },
        attachFile(this:EnhancedPageObject) {
            const path = require('path')
              browser.execute(function() {
                        var element = document.querySelector('#uploadfile');
                        if (element) {
                            element.scrollIntoView();
                        }
                    })
                        .uploadFile('#uploadfile',path
                        .resolve(__dirname ,'..','..','..','..','..','src/helpers/Go1PercentFEAutomation/helpdesk/ticketRaised/files/Nightwatch.jpg')).pause(5000)
            return this;
        },
        submitAndVerifySuccess(this:EnhancedPageObject) {
            return this.click('@submitbtn')
                .waitForElementVisible('@successMessage',10000)
        },
        selectClosedTickets(this:EnhancedPageObject) {
            return this.click('@closedTickets')
                .assert.containsText('@closedTickets', 'Close Ticket')
        },
        verifyUpdatedTicketStatus(this:EnhancedPageObject,ticketNumber:string, ticketStatus:string) {
            browser.page.helpdesk.ticketRaised.logout().signOut()
            browser.page.helpdesk.ticketRaised.login().enterCredentials('testemployee', 'testemployee').signIn()
            return this .waitForElementVisible('@helpdeskSection',10000)
                        .click('@helpdeskSection')
                        .click('@ticketRaisedByMeSelector')
                .click(ticketStatus)
                .assert.textContains('@selectFirstTicket', ticketNumber)
        },
        verifyStatusOfReoepenedTicket(this:EnhancedPageObject) {
            return this.assert.textContains('app-my-tickets .datatable-body-cell:nth-child(7) span', 'OPEN')
        },
        assertNoUpdateElementPresent(this:EnhancedPageObject) {
            return this.expect.element('@updateBtn').to.not.be.present;
        },
        enterMessage(this:EnhancedPageObject,msg:string){
            return this
            .click('@commentBox')
            .setValue('@commentBox',msg)
        },
        sendMessage(this:EnhancedPageObject){
            return this.click('@sendBtn')
           
        },
        assertMessage(this:EnhancedPageObject){
            browser.elements('xpath','//div[@class="d-flex justify-content-end"]//div[@class="msg-section"]', function (result:any) {
                //const elements=result.value as any[];
                const lastElementIndex = result.value.length - 1 as number;         
                const lastElement = result.value[lastElementIndex] as any;
                browser.getText('css selector',lastElement,function(result){
                    this.assert.equal(result.value,'sending','message send successfully')
                })
    
            })
            return this;
        },
        assertFileSentSuccessfully(this:EnhancedPageObject){
            browser.elements('xpath','//div[@class="d-flex justify-content-end"] //div[@class="d-flex flex-row"]', function (result:any) {
                // const lastElementIndex = ;         
                const lastElement = result.value[result.value.length - 1] as any;
                browser.getText('css selector',lastElement,function(result){
                    console.log(result.value)
                    let resultFinalValue: string = String(result.value);
                    browser.assert.ok(resultFinalValue.includes('attach_file'), 'Expected text "attached_file" is present in the element.');
                })
            })
        },
        hasTicketId(this:EnhancedPageObject,reopenedTicketId:string){
            if(!reopenedTicketId){
                this.assert.fail('unable to find reopened ticket id')
            }
        }
    }
const ticketPage:PageObjectModel={
elements:{
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
    submitbtn: 'button[type="submit"]',
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
commands:[ticketCommands]
}
export default ticketPage;
export interface TicketPage
  extends EnhancedPageObject<typeof ticketCommands,
  typeof ticketPage.elements>{ }
