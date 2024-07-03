module.exports={
    elements:{
        settings: '#navbar app-dropdown-wrapper li > a > div > i',
        logout: {
            selector:'(//a[@class="dropdown-item border-radius-md"])[2]',
            locateStrategy:'xpath'
    }
    },
    commands:[{
        signOut(){
            this
            .click("@settings")
            .click('@logout')
            .waitForElementVisible('#kc-page-title')
            return this;
        }
    }]
}