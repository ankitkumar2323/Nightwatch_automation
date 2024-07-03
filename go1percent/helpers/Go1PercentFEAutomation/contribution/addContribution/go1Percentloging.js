module.exports = {
    beforeEach: function(browser) {
        browser
            .maximizeWindow()
            .page.login()
            .navigate()
            .enterCredentials(browser.globals.userName, browser.globals.password)
            .signIn()
       // browser.pause(30000)
    },
    after: function(browser) {
        browser.end();
    },
    "landing on dashboard page": function(browser) {
        browser.assert.urlContains("my-dashboard");
    }
};