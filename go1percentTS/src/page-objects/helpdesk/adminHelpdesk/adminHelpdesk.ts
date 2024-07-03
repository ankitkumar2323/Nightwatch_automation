import { assert, log } from 'console';
import { PageObjectModel, EnhancedPageObject } from 'nightwatch';
// import { admin } from '../../globals';

const commands = {

    selectAdminHelpdeskSection: function (this: AdminHelpdesk) {
        return this
            .click('@admin')
            .click("@helpDesk");
    },
    openTicketSection: function (this: AdminHelpdesk) {
        return this
            .click("@openTicket")
    },
    selectUnassignedTicketSection: function (this: AdminHelpdesk) {
        return this
            .click("@unassignedTicketSection")
    },
    selectClosedTicketSection: function (this: AdminHelpdesk) {
        return this
            .click("@closedTicketSection")
    },
    selectOverDueTicketsSection: function (this: AdminHelpdesk) {
        return this
            .click("@overDueTicketsSection")
    },

    getOpenTicketCount: async function (this: AdminHelpdesk): Promise<string> {
        return new Promise((resolve, reject) => {
            this
                .waitForElementVisible('@OpenTicketCount', 5000)
                .getText('@OpenTicketCount', function (result) {
                    const actualValue = result.value.toString();
                    resolve(actualValue);
                });
        });
    },

    getUnassignedTicketCount: async function (this: AdminHelpdesk): Promise<string> {
        return new Promise((resolve, reject) => {
            this
                .waitForElementVisible('@unassignedTicketsCount', 5000)
                .getText('@unassignedTicketsCount', function (result) {
                    const actualValue = result.value.toString();
                    resolve(actualValue);
                });
        });
    },

    getOverDueTicketsCount: async function (this: AdminHelpdesk): Promise<string> {
        return new Promise((resolve, reject) => {
            this
                .waitForElementVisible('@overDueTicketsCount', 5000)
                .getText('@overDueTicketsCount', function (result) {
                    const actualValue = result.value.toString();
                    resolve(actualValue);
                });
        });
    },
    getClosedTicketsCount: async function (this: AdminHelpdesk): Promise<string> {
        return new Promise((resolve, reject) => {
            this
                .waitForElementVisible('@closedTicketsCount', 5000)
                .getText('@closedTicketsCount', function (result) {
                    const actualValue = result.value.toString();
                    resolve(actualValue);
                });
        });
    },

    getTotalTicketsCount: async function (this: AdminHelpdesk): Promise<string> {
        return new Promise((resolve, reject) => {
            this
                .waitForElementVisible('@totalRecords', 5000)
                .getText('@totalRecords', function (totalValue) {
                    const actualValue: string = totalValue.value.toString();
                    const actualNumericValue = actualValue.match(/\d+/);
                    resolve(actualNumericValue ? actualNumericValue[0] : '');
                });
        });
    },

 
    selectDropDown: async function (this: AdminHelpdesk) {
        return this
          .click("@dropDown")           
       
    },


};


const adminHelpdesk: PageObjectModel = {
    url: "",
    commands: [commands],
    elements: {
        emailInput: '#username',
        passwordInput: '#password',
        signIn: "#kc-login",
        admin: {
            selector: "//h6[normalize-space()='ADMIN']",
            locateStrategy: 'xpath'
        },
        helpDesk: "a[href='/helpdesk/summary']",
        openTicket: {
            selector: "(//a[normalize-space()='Open Ticket']",
            locateStrategy: 'xpath'
        },
        OpenTicketCount: {
            selector: "(//*[@class='number-of-tickets'])[1]",
            locateStrategy: 'xpath'
        },
        unassignedTicketSection: {
            selector: "(//*[@class='cursor-pointer'])[1]",
            locateStrategy: 'xpath'
        },
        overDueTicketsSection: {
            selector: "(//*[@class='cursor-pointer'])[2]",
            locateStrategy: 'xpath'
        },
        closedTicketSection: {
            selector: "(//*[@class='cursor-pointer'])[3]",
            locateStrategy: 'xpath'
        },
        closedTicketsCount: {
            selector: "(//*[@class='number-of-tickets'])[3]",
            locateStrategy: 'xpath'
        },
        unassignedTicketsCount: {
            selector: "(//*[@class='number-of-tickets'])[2]",
            locateStrategy: 'xpath'
        },
        overDueTicketsCount: {
            selector: "(//*[@class='number-of-tickets'])[4]",
            locateStrategy: 'xpath'
        },

        totalRecords: ".ml-2",
        dropDown: ".ng-pristine.ng-valid.ng-touched"


    },

};

export default adminHelpdesk;

export interface AdminHelpdesk
    extends EnhancedPageObject<typeof commands,
        typeof adminHelpdesk.elements> { }