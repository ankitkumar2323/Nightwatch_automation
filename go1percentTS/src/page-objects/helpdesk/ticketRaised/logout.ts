import { PageObjectModel, EnhancedPageObject } from 'nightwatch';
const logoutCommands={
    signOut(this:EnhancedPageObject){
        this
        .click("@settings")
        .click('@logout')
        .waitForElementVisible('#kc-page-title')
        return this;
    }
}
const logoutPage:PageObjectModel={
    elements:{
        settings: '#navbar app-dropdown-wrapper li > a > div > i',
        logout: {
            selector:'(//a[@class="dropdown-item border-radius-md"])[2]',
            locateStrategy:'xpath'
    }
    },
    commands:[logoutCommands]
    
}
export default logoutPage;
export interface LogoutPage
  extends EnhancedPageObject<typeof logoutCommands,
  typeof logoutPage.elements>{ }