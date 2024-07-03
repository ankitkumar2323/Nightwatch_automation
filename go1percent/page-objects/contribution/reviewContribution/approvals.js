module.exports = {
    url: 'https://nashtechglobal.qa.go1percent.com/my-dashboard',
    elements: {
        approvals: {
            selector: '#sidenav-collapse-main > ul > li:nth-child(4)',
        },

        dashboard: {
            selector: 'a.nav-link.ps-0.active[href="/my-dashboard"]',
        },

        allContributionsPage: {
            selector: 'li.nav-item a.cursor-pointer.newTabs',
        },

        allContributionsPage: {
            selector: 'li.nav-item a.cursor-pointer.newTabs',
        },

        contribution: {
            selector: 'a.nav-link.text-white[href="/contribution/view"]',
        },

        approvalsPage: {
            selector: 'a.cursor-pointer.newTabs',
        },

        approve: {
            selector: '#icon-grid > div > div.col-xxl-2.col-xl-2.col-lg-2.d-flex.justify-content-sm-center > img.ms-n2',
        },

        writeComment: {
            selector: 'textarea[placeholder="Please write the reason"]',
        },

        approveButton: {
            selector: 'button.btn.btn-sm.success-color.text-white.btn-margin',
        },

        reject: {
            selector: '#icon-grid > div > div.col-xxl-2.col-xl-2.col-lg-2.d-flex.justify-content-sm-center > img.ms-2',
        },

        rejectButton: {
            selector: 'button.btn.btn-sm.btn-danger.text-white',
        },

        filterSection: {
            selector: 'div.filter-right-section'
        },

        filterText: {
            selector: 'h6.fiterText'
        },

        allFilterFields: {
            selector: 'select.form-control.cursor-pointer'
        },

        search: {
            selector: '#Search',
        },

        searchedNasher: {
            selector: 'div.search-names',
        },

        frontendCompetency: {
            selector: 'app-contribution select option:nth-child(9)'
        },

        contributionOnlineCourseType: {
            selector: 'div.filter-right-section > div > div:nth-child(2) > select > option:nth-child(12)'
        },

        onlineCourse: {
            selector: '#icon-grid > div > div.col-xxl-5.col-xl-5.col-lg-5.d-flex > div > small'
        },

        contributionDetails: {
            selector: 'small[class="font-weight-bold"]'
        },

        approveRejectTag: {
            selector: 'h5.modal-title.pull-left'
        },

        rejectSucess: {
            selector: 'div[aria-label="Successfully Rejected"]'
        },

        approveSuccess: {
            selector: 'div[aria-label="Successfully Approved"]'
        }

    },

    commands: {

        approvalsPage: function () {
            return this
                .navigate()
                .assert.urlEquals('https://nashtechglobal.qa.go1percent.com/my-dashboard')
                .waitForElementVisible('@dashboard')
                .waitForElementVisible('@approvals')
                .click('@approvals')
                .waitForElementVisible('@contribution')
                .click('@contribution')
        },

        openApprovalsContributionPage: function () {
            return this
                .assert.urlEquals('https://nashtechglobal.qa.go1percent.com/contribution/view')
                .click('@allContributionsPage')
                .waitForElementVisible('@approvalsPage')
                .click('@approvalsPage')
                .pause(5000)

        },

        verifyAllFields: function () {
            return this
                .waitForElementVisible('@filterSection')
                .waitForElementPresent('@filterText')
                .waitForElementPresent('@allFilterFields')
                .assert.visible('@filterSection')
                .assert.visible('@filterText')
                .assert.visible('@allFilterFields')

        },

        approvePendingContribution: function () {
            return this
                .pause(3000)
                .waitForElementVisible('@approve')
                .click('@approve')
                .pause(4000)
                .assert.containsText('@approveRejectTag', 'Approve/Reject Contribution')
                .waitForElementVisible('@writeComment')
                .click('@writeComment')
                .setValue('@writeComment', 'Testing purpose')
                .click('@approveButton')
                .waitForElementVisible('@approveSuccess')
        },


        rejectPendingContribution: function () {
            return this
                .waitForElementVisible('@reject')
                .click('@reject')
                .pause(4000)
                .assert.containsText('@approveRejectTag', 'Approve/Reject Contribution')
                .waitForElementVisible('@writeComment')
                .click('@writeComment')
                .setValue('@writeComment', 'Testing purpose')
                .click('@rejectButton')
                .waitForElementVisible('@rejectSucess')
        },

        searchNasher: function () {
            return this
                .waitForElementVisible('@search')
                .click('@search')
                .setValue('@search', 'test employee')
                .waitForElementVisible('@searchedNasher')
        },

        competencyFilter: function () {
            return this
                .assert.visible('@frontendCompetency')
                .click('@frontendCompetency')
                .getText('@contributionDetails', function (result) {
                    let resultFinal = result.value;
                    if (resultFinal !== null && resultFinal.includes('Frontend Competency')) {
                        this.assert.equal(result.value, 'Frontend Competency');
                    } else {
                        this.assert.notEqual(result.value, 'Frontend Competency');
                    }
                });
        },

        contributionTypeFilter: function () {
            return this
                .pause(3000)
                .click('@contributionOnlineCourseType')
                .getText('@onlineCourse', function (result) {
                    let filteredResult = result.value;
                    if (filteredResult !== null && filteredResult.includes('Online Course')) {
                        this.assert.equal(result.value, 'Online Course');
                    } else {
                        this.assert.notEqual(result.value, 'Online Course');
                    }
                });
        }
    }
};