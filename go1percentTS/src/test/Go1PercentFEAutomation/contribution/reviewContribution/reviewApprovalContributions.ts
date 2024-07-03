import { NightwatchBrowser } from "nightwatch";

describe('Go1Percent Review Contribution FE tests', () => {
    const contribution = browser.page.contribution.reviewContribution.approvals();

    before((browser: NightwatchBrowser) => {
        browser
            .window.maximize()
            .url('https://nashtechglobal.qa.go1percent.com/');

        const login = browser.page.contribution.login();
        login.navigate().enterCredentials('testadmin', 'testadmin');
        login.signIn();

        contribution.approvalsPage()
        contribution.openApprovalsContributionPage()
    });

    it('Verify Filter fields on Approvals Dashboard ', () => {
        contribution.verifyAllFields()
    });

    it('Approve a Contribution', () => {
        contribution.approvePendingContribution()
    });

    it('Reject a Contribution', () => {
        contribution.rejectPendingContribution()
    });

    it('Search a Nasher by name', () => {
        contribution.searchNasher();
    }),

    it('Filter contributions by all competency filter', () => {
        contribution.competencyFilter();
    });

    it('Filter by competency type', () => {
        contribution.contributionTypeFilter();
    });

});




