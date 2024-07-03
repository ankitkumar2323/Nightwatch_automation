//POM
import { PageObjectModel, EnhancedPageObject } from 'nightwatch';
const message = 'this is for testing purpose';

const commands = {
    enterCredentials(this: LoginPage) {
        return this
            .setValue('@emailInput', 'testemployee')
            .pause(1000)
            .setValue('@passwordInput', 'testemployee')
            .pause(1000)

    },

    signInButton(this: LoginPage) {
        return this
            .click('@signIn')
    },

    helpDeskButton(this: LoginPage) {
        return this
            .click('@helpdesk')
    },

    Ticketassignedtome(this: LoginPage) {
        return this
            .click('@Ticketassignedtome')
    },
    OpenTicket(this: LoginPage) {
        return this
            .click('@openTicket')
    },
    clickOnHelpdesk(this: LoginPage) {
        return this
            .click('@helpdesk')
    },
    clickOnTicketassignedtome(this: LoginPage) {
        return this
            // .waitForElementVisible('@Ticketassignedtome')
            .click('@Ticketassignedtome')
    },
    openTicket(this: LoginPage) {
        return this
            .click('@openTicket')
    },
    OnparticularTicket(this: LoginPage) {
        return this
            .click("@particularTicket")
    },
    clickOntextBox(this: LoginPage) {
        return this
            .click("@textBox")
    },
    MessageSend(this: LoginPage) {
        return this
            .click("@textBox")
            .setValue('@textBox', message);
    },
    clickOnsendButton(this: LoginPage) {
        return this
            .click('@sendButton')
    },
    clickOnstatus(this: LoginPage) {
        return this
            .click('@status')
    },
    clickAssignedToClear(this: LoginPage) {
        return this
            .click('@assignedTo')
    },
    clickOncategory(this: LoginPage) {
        return this
            .click('@category')
    },
    clickKnolxCategory(this: LoginPage) {
        return this
            .click('@knolxCategory')
    },
    clickOnPriority(this: LoginPage) {
        return this
            .click('@priority')
    },
    clickOnupdateButton(this: LoginPage) {
        return this
            .click('@updateButton')
    },
    clickOncloseTicketButton(this: LoginPage) {
        return this
            .click('@closeTicketButton')
    },
    chatPage(this: LoginPage) {
        return this
            .click('@helpDesk')
            .click('@Ticketassignedtome')
            .click('@openTicket')
            .click("@particularTicket")
    },

    closedTicketPage(this: LoginPage) {
        return this
            .click('@helpDesk')
            .click('@Ticketassignedtome')
            .click('@closeTicketButton')
    },

    clickLastClosedTicket(this: LoginPage) {
        return this
            .click('@lastClosed')
    },

    clickCategoryOpen(this: LoginPage) {
        return this
            .click('@categoryOpen')
    },
    clickStatusOpen(this: LoginPage) {
        return this
            .click('@statusOpen')
    },
    attachFile(this: EnhancedPageObject) {
        const path = require('path')
        browser.execute(function () {
            var element = document.querySelector('#uploadfile');
            if (element) {
                element.scrollIntoView();
            }
        })
            .uploadFile('#uploadfile', path
                .resolve(__dirname, '..', '..', '..', '..', 'src/helpers/Go1PercentFEAutomation/helpdesk/ticketassignedtome/smalldog.jpg')).pause(5000)
        return this;
    },
};

const loginPage: PageObjectModel = {
    url: "https://nashtechglobal.qa.go1percent.com/",
    commands: [commands],
    elements: {
        emailInput: '#username',
        passwordInput: '#password',
        signIn: "#kc-login",
        helpDesk: {
            selector: "//h6[normalize-space()='HelpDesk']",
            locateStrategy: 'xpath'
        },
        Ticketassignedtome: {
            selector: "a[href='/helpdesk/assigned-tickets']"
        },
        openTicket: {
            selector: ".cursor-pointer.newTabs"
        },

        particularTicket: {
            selector: 'datatable-body datatable-selection datatable-row-wrapper:nth-child(1)'
        },
        attachfile: '#uploadfile',

        textBox: {
            selector: "textarea[placeholder='Enter you text']"
        },

        sendButton: {
            selector: '.send-button.bg-gradient-info'
        },

        closedTicketPage: {
            selector: '.card.me-3.p-4.mt-3'
        },

        assignedNameSuggestion: {
            selector: "span[class='ng-star-inserted']"
        },

        status: {
            selector: "select[id='status'] option:nth-child(2)"
        },
        statusCheck: {
            selector: '#status'
        },

        statusOpen: {
            selector: "select[id='status'] option:nth-child(1)"
        },

        category: {
            selector: '#category'
        },

        priority: {
            selector: "select[id='priority'] option:nth-child(1)"
        },
        priorityCheck: {
            selector: '#priority'
        },
        updateButton: {
            selector: '.Update-button.btn.btn-primary'
        },

        statusMessage: {
            selector: '#toast-container'
        },

        savedConversation: {
            selector: ".card.tab-bar.border-0.mt-4.pr-2.pb-3.p-4"
        },

        assignedNameInput: {
            selector: 'input[formcontrolname="item"]'
        },
        firstChatMessage: {
            selector: "div[class='msg-section']"
        },

        closeTicketButton: {
            selector: "a[class='cursor-pointer']"
        },

        knolxCategory: {
            selector: "option[value='Knolx']"
        },
        assignedTo: {
            selector: "(//*[name()='path'])[1]",
            locateStrategy: 'xpath'
        },
        lastClosed: {
            selector: "datatable-body datatable-selection datatable-row-wrapper:nth-child(1)"
        },
        categoryOpen: {
            selector: "select[id='status'] option:nth-child(1)"
        },
        allFieldsForm: {
            selector: 'form[class="w-100 ng-untouched ng-pristine ng-valid"] div[class="card tab-bar mt-4 p-4"]'
        },
        assignedCheck: {
            selector: 'div[class="row mb-4 ng-star-inserted"] tag-input[formcontrolname="assignedTo"]'
        }
    },

};

export default loginPage;

export interface LoginPage
    extends EnhancedPageObject<typeof commands,
        typeof loginPage.elements> { }
