module.exports = {
    before: function (browser) {
        browser
            .maximizeWindow()
            .page.login()
            .navigate()
            .enterCredentials('testadmin', 'testadmin')
            .signIn()
        pageObject = browser.page.contribution.reviewContribution.allContribution();
        pageObject.approvalsPage();
        pageObject.navigateToAllContributions();
    },

    'Verify fields': function (browser) {
        pageObject.verifyAllFields();
    },

    'Approve a contribution': function () {
        pageObject.approveContribution();
    },

    'Reject a contribution': function () {
        pageObject.rejectContribution();
    },

    'Filter a contribution by status': function (browser) {
        pageObject.allStatus();
    },

    'Search a Nasher': function (browser) {
        pageObject.searchNasher();
    },

    'Filter contributions by competency': function (browser) {
        pageObject.competencyFilter();
    },

    'Filter by comptency type': function (browser) {
        pageObject.contributionTypeFilter();
    },

    after: function (browser) {
        browser.end();
    },
};


