import { PageObjectModel, EnhancedPageObject } from "nightwatch";

const dashboardCommands = {
    clickImage(this : goOneDashboardPage) {
        return this
        .waitForElementVisible('@adminProfilePic' , 10000)
        .click('@adminProfilePic')
    }
}

const goOneDashboard: PageObjectModel = {
    elements : {
        adminProfilePic : '.material-symbols-outlined.hex',
        badgeText : 'h6.badge-text'
    },

    commands: [dashboardCommands]
}

export default goOneDashboard;
export interface goOneDashboardPage extends EnhancedPageObject <typeof dashboardCommands, typeof goOneDashboard.elements> {}