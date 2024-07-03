module.exports = {

    "Navigate to All Techhubs page": function (browser) {
        browser
        .page.techhub.AdminUser.techhub()
            .All_Techhubs_page(browser)
    },

    "Apply Approved status filter": function (browser) {
        browser
        .page.techhub.AdminUser.techhub()
            .Filter_AllStatus_Approved(browser)
            .assert.elementPresent("@Filter_AllStatus_Approved")
            .pause(2000)
    },

    "Apply Review status filter": function (browser) {
        browser
        .page.techhub.AdminUser.techhub()
            .Filter_AllStatus_Review(browser)
            .assert.elementPresent("@Filter_AllStatus_Review")
            .pause(2000)
    },

    "All competency filter": function (browser) {
        browser
        .page.techhub.AdminUser.techhub()
            .Filter_All_Competency(browser)
            .pause(2000)
    },

    "Apply any Competency filter and verify": function (browser) {
        browser
        .page.techhub.AdminUser.techhub()
            .Filter_FrontendCompetency(browser)
            .pause(2000)
            .assert.textEquals('@FilterName_AllCompetency_onRequest', 'Frontend Competency');
    },

    "Navigate to request detail page": function (browser) {
        browser
        .page.techhub.AdminUser.techhub()
            .Navigate_to_detailsPage(browser)
    },

    "Verify detail page": function (browser) {
        browser
        .page.techhub.AdminUser.techhub()
            .assert.textEquals('@Detail_Page', 'View TechHub');
    },

    "Approve techhub request and verify": function (browser) {
        browser
        .page.techhub.AdminUser.techhub_detail()
            .Approve_Request(browser)
            .assert.elementPresent('@Approve_Toast')
    },

    "Reject techhub request and verify": function (browser) {
        browser
        .page.techhub.AdminUser.techhub_detail()
            .Reject_Request(browser)
            .assert.elementPresent('@Approve_Toast')
    },

    "Reject Techhub request without Reviewer Comment and verify unsuccessful": function (browser) {
        browser
        .page.techhub.AdminUser.techhub_detail()
            .Reject_Request_Without_Reviewer_Comment(browser)
            .assert.textContains("@Reviewer_Comment_error_message", "If Rejected, above field is mandatory. *");
    },

    "Search a Nasher": function (browser) {
        browser
        .page.techhub.AdminUser.techhub()
            .Search_Nasher(browser)
            .pause(2000)
    },

    "Approve second request of same person on same day and check": function (browser) {
        browser
        .page.techhub.AdminUser.techhub_detail()
            .Approve_Request(browser)
            .assert.elementPresent('@Approve_Toast', 'Can approve two techhubs of a person on same day')
    },

    "Total_records": async function (browser) {
        const techhubPage = browser.page.techhub.AdminUser.techhub();

        await techhubPage.scrollToElement(browser);                                                                                      
        const cardElements = techhubPage.element.findAll('@Request_Cards');
        const elements = await cardElements;
        const totalRecordsString = 'Total Records: ' + elements.length;
        techhubPage
            .assert.textEquals('@Total_Records', totalRecordsString);
    },                                                                                                                                                                          

    "Navigate to Github URL and verify": async function (browser) {
        const url = await browser
        .page.techhub.AdminUser.techhub_detail()
            .element('@GitHub_Url')
            .getText()

        await browser
        .page.techhub.AdminUser.techhub_detail()
            .Navigate_to_GitHUb_URL(browser)

        browser.pause(3000);

        browser
            .perform(function (done) {
                browser.windowHandles(function (result) {
                    let handles = result.value;
                    let newHandle = handles[1]; // The handle of the new tab

                    browser.switchWindow(newHandle, function () {
                        done();
                    });
                });
            })
            // Perform actions in the new tab
            .assert.urlContains(url);
    }
};