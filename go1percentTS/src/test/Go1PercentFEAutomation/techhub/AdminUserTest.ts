import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import *as login from '../../../helpers/Go1PercentFEAutomation/techhub/AdminUser/go1Percentloging';
import *as dashboard from '../../../helpers/Go1PercentFEAutomation/techhub/AdminUser/go1PercentDashboard';
import *as techhub from'../../../helpers/Go1PercentFEAutomation/techhub/AdminUser/go1PercentTechhub';

describe('Go1percent techHub FE Testing', () => {

    beforeEach((browser) =>{
        login.beforeEach(browser);
        login['landingOnDashboardPage'](browser);
        dashboard['navigateToTechhubPage'](browser);
        browser.pause(2000);       
    }),

    afterEach((browser)=> {
        login.after(browser);
    }),

     //DCTGO1-1245 : Verify user should be able to approve a TechHub request on TechHub details page (TC-397)
     it("Approve a TechHub request on TechHub details page", (browser)=> {
        techhub['NavigateToRequestDetailPage'](browser);
        techhub['ApproveTechhubRequestAndVerify'](browser);
    }),
    
    //DCTGO1-1247 : Verify user should be able to reject a TechHub request on TechHub details page (TC-399)
     it("Reject a TechHub request on TechHub details page",(browser)=>{
        techhub['NavigateToRequestDetailPage'](browser);
        techhub['RejectTechhubRequestAndVerify'](browser);
     }),

     //DCTGO1-1248 : Verify That user should be able to filter through any Competency name on TechHub Approvals (TC-400)
    it("Filter through any Competency name on TechHub Approvals ", (browser)=> {       
        techhub['ApplyAnyCompetencyFilterAndVerify'](browser);
    }),

    //DCTGO1-1249 : Verify User should not be able to reject a TechHub without reviewer comment (TC-401) 
    it("Cannot reject a TechHub without reviewer comment", (browser)=> {
        techhub['NavigateToRequestDetailPage'](browser);
        browser.pause(5000);
        techhub['RejectTechhubRequestWithoutReviewerCommentAndVerifyUnsuccessful'](browser);
    }),

    //DCTGO1-1250 : Verify Admin user should be able to Open and approve any TechHub which is on review (TC-402)
    it("Open and approve any TechHub which is on review", (browser)=> {
        techhub['NavigateToAllTechhubsPage'](browser);
        techhub['ApplyReviewStatusFilter'](browser);
        techhub['NavigateToRequestDetailPage'](browser);
        techhub['ApproveTechhubRequestAndVerify'](browser);
    }),

    //DCTGO1-1251 : Verify Admin user should be able to Open and Reject any TechHub which is on review (TC-403) 
    it("Open and Reject any TechHub which is on review", (browser)=>{
        techhub['NavigateToAllTechhubsPage'](browser);
        techhub['ApplyReviewStatusFilter'](browser);
        techhub['NavigateToRequestDetailPage'](browser);
        techhub['RejectTechhubRequestAndVerify'](browser);
     }),

    //DCTGO1-1285 : Verify that total records is showing correct data on Approval Page.
    it("Total records", (browser)=> {        
       //browser.pause(10000);
        techhub['TotalRecords'](browser);
    }),

    //DCTGO1-1313 : verify admin should not be able to approve the techhub for same person twice a day
    it("Cannot approve the techhub for same person twice a day", (browser)=> {       
        techhub['SearchNasher'](browser);
        browser.pause(20000);
        techhub['NavigateToRequestDetailPage'](browser);
        browser.pause(1000);
        techhub['ApproveTechhubRequestAndVerify'](browser);
        browser.pause(20000);
        techhub['NavigateToRequestDetailPage'](browser);
        techhub['ApproveSecondRequestOfSamePersonOnSameDayAndCheck'](browser);
    }),

    //DCTGO1-1244 : Verify Admin user should be Able to view details of Approved TechHubs on All TechHubs page (TC-396) 
    it("View details of Approved TechHubs on All TechHubs page",(browser)=> {
        techhub['NavigateToAllTechhubsPage'](browser);
        techhub['ApplyApprovedStatusFilter'](browser);
        browser.pause(2000);
        techhub['NavigateToRequestDetailPage'](browser);
        techhub['VerifyDetailPage'](browser);
    }),

    //DCTGO1-1346 : Verify Admin user should be able to navigate to GitHub URL provided in techhub details page
    it("navigate to GitHub URL provided in techhub details page",(browser)=>{
        techhub['NavigateToRequestDetailPage'](browser);
        browser.pause(3000);
        techhub['NavigateToGithubURLAndVerify'](browser);
    })
});

