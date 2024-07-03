module.exports = {
    beforeEach: function(browser) {
        browser
            .maximizeWindow()
            .page.techhub.AdminUser.login()
            .navigate()
            .enterCredentials(browser.globals.adminUserName, browser.globals.adminPassword)
            .signIn()
        //browser.pause(30000)
    },
    after: function(browser) {
        browser.end();
    },
    "landing on dashboard page": function(browser) {
        browser.assert.urlContains("my-dashboard");
    }
};