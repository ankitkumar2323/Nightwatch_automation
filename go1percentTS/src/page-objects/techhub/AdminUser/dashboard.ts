import { PageObjectModel, EnhancedPageObject } from "nightwatch";

const dashboardElements = {
    Approvals: ".navbar-nav .nav-item:nth-child(4) h6",
    TechHub: 'a[href="/tech-hub/view"]',
};

const dashboardCommands = {
    Navigate_To_TechHub(this: DashboardPage) {
        return this
            .click("@Approvals")
            .click("@TechHub")
    },
};

const dashboardPage: PageObjectModel = {
    elements: dashboardElements,
    commands: [dashboardCommands]
};

export default dashboardPage;
export interface DashboardPage
    extends EnhancedPageObject<
        typeof dashboardCommands,
        typeof dashboardElements
    > { }