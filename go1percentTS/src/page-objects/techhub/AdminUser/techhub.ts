import { PageObjectModel, EnhancedPageObject } from "nightwatch";

const techhubElements = {
    Approvals: ".cursor-pointer.newTabs",
    Approvals_tab: ".filter-left-section .nav .nav-item:first-child",
    All_techhubs: ".filter-left-section .nav .nav-item:nth-child(2)",
    Request: ".card:first-child",
    Filter_AllCompetency: ".form-control.cursor-pointer",
    Filter_AllStatus: ".filter-tab .select-status+select.form-control",
    AllStatus_Approved: '.filter-tab .select-status+select.form-control option:nth-child(2)',
    AllStatus_Review: '.filter-tab .select-status+select.form-control option:nth-child(3)',
    Filter_AllStatus_Approved: '.filter-tab .approvedStatus+select.form-control ',
    Filter_AllStatus_Review: '.filter-tab .pendingStatus+select.form-control',
    Filter_AllCompetency_Frontend: '.approv .filterDiv .form-control option:nth-child(9)',
    Approved_Request: '.report-card .card:first-child .row',
    Detail_Page: '.modal-dialog .modal-header .modal-title',
    Search: '.search',
    Total_Records: '.pager>span',
    FilterName_AllCompetency_onRequest: '.report-card .card:first-child .row .user-icon + div > small',
    Request_Container: '.report-card div[infinitescroll]',
    Request_Cards: '.report-card div[infinitescroll] .card',
    Request_Cards_Last_Child: '.report-card div[infinitescroll] .card:last-child',
};

const techhubCommands = {
    All_Techhubs_page(this: TechhubPage) {
        return this
            .waitForElementPresent('@All_techhubs')
            .click("@All_techhubs")
    },

    Filter_AllStatus_Approved(this: TechhubPage) {
        return this
            .click("@Filter_AllStatus")
            .click('@AllStatus_Approved')
    },

    Filter_AllStatus_Review(this: TechhubPage) {
        return this
            .click("@Filter_AllStatus")
            .click('@AllStatus_Review')
    },

    Filter_All_Competency(this: TechhubPage) {
        return this
            .click("@Filter_AllCompetency")
    },

    Filter_FrontendCompetency(this: TechhubPage) {
        return this
            .click("@Filter_AllCompetency_Frontend")
    },

    Navigate_to_detailsPage(this: TechhubPage) {
        return this
            .click('@Approved_Request')
    },

    Search_Nasher(this: TechhubPage) {
        return this
            .setValue('@Search', 'Test Employee')
    },

    async scrollToElement(this: TechhubPage) {
        this.waitForElementPresent('@Total_Records', 10000)
        this.getText('@Total_Records', result => {
            const str = result.value as string;
            const matches = str.match(/\d+/) || [''];
            const record = parseInt(matches[0], 10);
            const pages = Math.ceil(record / 10);
            this.pause(5000);
            for (let count = 0; count < pages; count++) {
                this.pause(2000);
                const el = this.element.find('@Request_Container');
                this.getLocationInView(el.getLastElementChild());
            }
        })
        return this;
    },
};

const techhubPage: PageObjectModel = {
    elements: techhubElements,
    commands: [techhubCommands]
};

export default techhubPage;
export interface TechhubPage
    extends EnhancedPageObject<
        typeof techhubCommands,
        typeof techhubElements
    > { }