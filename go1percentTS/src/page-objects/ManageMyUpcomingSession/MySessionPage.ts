import { PageObjectModel, EnhancedPageObject } from 'nightwatch';


const DashboardCommands = {

    ClickOnKnolx(this: Dashboard) {
        return this
            .waitForElementVisible('@Knolx', 3000)
            .click('@Knolx')

    },

    ClickOnMySession(this: Dashboard) {
        return this
            .waitForElementVisible('@MySession', 5000)
            .click('@MySession')
    },



}
const DashboardManageSessionPage: PageObjectModel = {


    commands: [DashboardCommands],
    elements: {
        Knolx: {

            selector: '(//div[@role="button"])[4]',
            locateStrategy: 'xpath',
        },
        MySession: {

            locateStrategy: 'xpath',
            selector: '//a[@href="/knolx/my-sessions/my-upcoming-sessions"]',

        },
    }

}



export default DashboardManageSessionPage;
export interface Dashboard
    extends EnhancedPageObject<typeof DashboardCommands,
        typeof DashboardManageSessionPage.elements> { }
