import { NightwatchBrowser } from 'nightwatch';
module.exports = {
    beforeEach: function (browser:NightwatchBrowser) {
        browser
            .page.contribution.addContribution.login()
            .navigate()
            .enterCredentials(browser.globals.userName, browser.globals.password)
            .signIn();
        // browser.pause(30000)
    },
    after: function (browser:NightwatchBrowser) {
        browser.end();
    },
    "landing on dashboard page": function (browser:NightwatchBrowser) {
        browser.assert.urlContains("my-dashboard");
    }
};