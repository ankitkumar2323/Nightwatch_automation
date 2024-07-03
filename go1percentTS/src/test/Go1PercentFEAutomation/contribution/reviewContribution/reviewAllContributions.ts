import { NightwatchBrowser } from "nightwatch";

describe('Go1Percent Review Contribution FE tests', () => {
    const contribution = browser.page.contribution.reviewContribution.allContribution();
    before((browser: NightwatchBrowser) => {
        browser
            .window.maximize()
            .url('https://nashtechglobal.qa.go1percent.com/');

        const login = browser.page.contribution.login();
        login.navigate().enterCredentials('testadmin', 'testadmin');
        login.signIn();

        contribution.approvalsPage();
        contribution.navigateToAllContributions();
    });

        it('Verify Filter fields on All Contributions Dashboard', () => {
            contribution.verifyAllFields()
        }),

        it('Approve a Contribution', () => {
            contribution.approveContribution()
        }),

        it('Reject a Contribution', () => {
            contribution.rejectContribution()
        }),

        it('Filter a contribution by status', () => {
            contribution.allStatus();
        }),

        it('Search a Nasher by name', () => {
            contribution.searchNasher();
        }),

        it('Filter contributions by competency', () => {
            contribution.competencyFilter();
        }),

        it('Filter contributions by competency type', () => {
            contribution.contributionTypeFilter();
        })

});



