/**
 * Automated testing script for Approvals and Contributions page.
 * This script performs various actions on the page using Nightwatch.js.
 */

module.exports = {
    /**
     * Before all test cases, perform setup actions:
     * @param {Object} browser - Nightwatch.js browser object
     */

    before: function (browser) {
        browser
            .maximizeWindow()
            .page.login()
            .navigate()
            .enterCredentials('testadmin', 'testadmin')
            .signIn()
        pageObject = browser.page.contribution.reviewContribution.approvals()
        pageObject.approvalsPage()
        pageObject.openApprovalsContributionPage();
    },

    'Verify Filter fields': function (browser) {
        pageObject.verifyAllFields();
    },

    'Approve a Contribution': function (browser) {
        pageObject.approvePendingContribution();
    },

    'Reject a Contribution': function (browser) {
        pageObject.rejectPendingContribution();
    },

    'Search a Nasher': function (browser) {
        pageObject.searchNasher();
    },

    'All competency filter': function (browser) {
        pageObject.competencyFilter();
    },

    'Filter by competency type': function (browser) {
        pageObject.contributionTypeFilter();
    },

    after: function (browser) {
        browser.end();
    },
};
