import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import { TechhubPage } from '../../../../page-objects/techhub/AdminUser/techhub';
import { TechhubDetailPage } from '../../../../page-objects/techhub/AdminUser/techhubDetail';




    export function NavigateToAllTechhubsPage(browser: NightwatchBrowser):void {
        browser
            .page.techhub.AdminUser.techhub()
            .All_Techhubs_page(browser)
    }

    export function ApplyApprovedStatusFilter(browser: NightwatchBrowser):void {
        browser
            .page.techhub.AdminUser.techhub()
            .Filter_AllStatus_Approved(browser)
            .assert.elementPresent("@Filter_AllStatus_Approved")
            .pause(2000)
    }

    export function ApplyReviewStatusFilter(browser: NightwatchBrowser):void {
        browser
            .page.techhub.AdminUser.techhub()
            .Filter_AllStatus_Review(browser)
            .assert.elementPresent("@Filter_AllStatus_Review")
            .pause(2000)
    }

    export function AllCompetencyFilter(browser: NightwatchBrowser):void {
        browser
            .page.techhub.AdminUser.techhub()
            .Filter_All_Competency(browser)
            .pause(2000)
    }

    export function ApplyAnyCompetencyFilterAndVerify(browser: NightwatchBrowser):void {
        browser
            .page.techhub.AdminUser.techhub()
            .Filter_FrontendCompetency(browser)
            .pause(2000)
            .assert.textEquals('@FilterName_AllCompetency_onRequest', 'Frontend Competency');
    }

    export function NavigateToRequestDetailPage(browser: NightwatchBrowser):void {
        browser
            .page.techhub.AdminUser.techhub()
            .Navigate_to_detailsPage(browser)
    }

    export function VerifyDetailPage(browser: NightwatchBrowser):void {
        browser
            .page.techhub.AdminUser.techhub()
            .assert.textEquals('@Detail_Page', 'View TechHub');
    }

    export function ApproveTechhubRequestAndVerify(browser: NightwatchBrowser):void{
        browser
            .page.techhub.AdminUser.techhubDetail()
            .Approve_Request(browser)
            .assert.elementPresent('@Approve_Toast')
    }

    export function RejectTechhubRequestAndVerify(browser: NightwatchBrowser):void{
        browser
            .page.techhub.AdminUser.techhubDetail()
            .Reject_Request(browser)
            .assert.elementPresent('@Approve_Toast')
    }

    export function RejectTechhubRequestWithoutReviewerCommentAndVerifyUnsuccessful(browser: NightwatchBrowser):void{
        browser
            .page.techhub.AdminUser.techhubDetail()
            .Reject_Request_Without_Reviewer_Comment(browser)
            .assert.textContains("@Reviewer_Comment_error_message", "If Rejected, above field is mandatory. *");
    }

    export function SearchNasher(browser: NightwatchBrowser):void{
        browser
            .page.techhub.AdminUser.techhub()
            .Search_Nasher(browser)
            .pause(2000)
    }

    export function ApproveSecondRequestOfSamePersonOnSameDayAndCheck(browser: NightwatchBrowser):void{
        browser
            .page.techhub.AdminUser.techhubDetail()
            .Approve_Request(browser)
            .assert.elementPresent('@Approve_Toast', 'Can approve two techhubs of a person on same day')
    }

    export async function TotalRecords(browser: NightwatchBrowser):Promise<void>{
        const techhubPage = browser.page.techhub.AdminUser.techhub();

        await techhubPage.scrollToElement(browser);
        const cardElements = techhubPage.element.findAll('@Request_Cards');
        const elements = await cardElements;
        const totalRecordsString = 'Total Records: ' + elements.length;
        techhubPage
            .assert.textEquals('@Total_Records', totalRecordsString);
    }

    export async function NavigateToGithubURLAndVerify(browser: NightwatchBrowser):Promise<void>{
        const url = await browser
            .page.techhub.AdminUser.techhubDetail()
            .element('@GitHub_Url')
            .getText()

        await browser
            .page.techhub.AdminUser.techhubDetail()
            .Navigate_to_GitHUb_URL(browser)

        browser.pause(3000);
        browser
            .windowHandles(async function (result) {
                const windowHandles = await browser.windowHandles() as string[];
                await browser.switchToWindow(windowHandles[1]);
            })
    
            .assert.urlContains(url);
    }
