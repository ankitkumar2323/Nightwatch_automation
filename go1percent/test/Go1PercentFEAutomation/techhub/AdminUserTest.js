const login = require('../../../helpers/Go1PercentFEAutomation/techhub/AdminUser/go1Percentloging');
const dashboard = require('../../../helpers/Go1PercentFEAutomation/techhub/AdminUser/go1PercentDashboard');
const techhub = require('../../../helpers/Go1PercentFEAutomation/techhub/AdminUser/go1PercentTechhub');

describe('Go1percent techHub FE Testing', () => {

    beforeEach((browser) =>{
        login.beforeEach(browser);
        login['landing on dashboard page'](browser);
        dashboard['navigate to Techhub page'](browser);
        browser.pause(2000);       
    }),

    afterEach((browser)=> {
        login.after(browser);
    }),

     //DCTGO1-1245 : Verify user should be able to approve a TechHub request on TechHub details page (TC-397)
     it("Approve a TechHub request on TechHub details page", (browser)=> {
        techhub['Navigate to request detail page'](browser);
        techhub['Approve techhub request and verify'](browser);
    }),
    
    //DCTGO1-1247 : Verify user should be able to reject a TechHub request on TechHub details page (TC-399)
     it("Reject a TechHub request on TechHub details page",(browser)=>{
        techhub['Navigate to request detail page'](browser);
        techhub['Reject techhub request and verify'](browser);
     }),

     //DCTGO1-1248 : Verify That user should be able to filter through any Competency name on TechHub Approvals (TC-400)
    it("Filter through any Competency name on TechHub Approvals ", (browser)=> {       
        techhub['Apply any Competency filter and verify'](browser);
    }),

    //DCTGO1-1249 : Verify User should not be able to reject a TechHub without reviewer comment (TC-401) 
    it("Cannot reject a TechHub without reviewer comment", (browser)=> {
        techhub['Navigate to request detail page'](browser);
        browser.pause(5000);
        techhub['Reject Techhub request without Reviewer Comment and verify unsuccessful'](browser);
    }),

    //DCTGO1-1250 : Verify Admin user should be able to Open and approve any TechHub which is on review (TC-402)
    it("Open and approve any TechHub which is on review", (browser)=> {
        techhub['Navigate to All Techhubs page'](browser);
        techhub['Apply Review status filter'](browser);
        techhub['Navigate to request detail page'](browser);
        techhub['Approve techhub request and verify'](browser);
    }),

     //DCTGO1-1251 : Verify Admin user should be able to Open and Reject any TechHub which is on review (TC-403) 
     it("Open and Reject any TechHub which is on review", (browser)=>{
        techhub['Navigate to All Techhubs page'](browser);
        techhub['Apply Review status filter'](browser);
        techhub['Navigate to request detail page'](browser);
        techhub['Reject techhub request and verify'](browser);
     }),

    //DCTGO1-1285 : Verify that total records is showing correct data on Approval Page.
    it("Total records", (browser)=> {        
       //browser.pause(10000);
        techhub['Total_records'](browser);
    }),

    //DCTGO1-1313 : verify admin should not be able to approve the techhub for same person twice a day
    it("Cannot approve the techhub for same person twice a day", (browser)=> {       
        techhub['Search a Nasher'](browser);
        browser.pause(20000);
        techhub['Navigate to request detail page'](browser);
        browser.pause(1000);
        techhub['Approve techhub request and verify'](browser);
        browser.pause(20000);
        techhub['Navigate to request detail page'](browser);
        techhub['Approve second request of same person on same day and check'](browser);
    }),

    //DCTGO1-1244 : Verify Admin user should be Able to view details of Approved TechHubs on All TechHubs page (TC-396) 
    it("View details of Approved TechHubs on All TechHubs page",(browser)=> {
        techhub['Navigate to All Techhubs page'](browser);
        techhub['Apply Approved status filter'](browser);
        browser.pause(2000);
        techhub['Navigate to request detail page'](browser);
        techhub['Verify detail page'](browser);
    }),

    //DCTGO1-1346 : Verify Admin user should be able to navigate to GitHub URL provided in techhub details page
    it("navigate to GitHub URL provided in techhub details page",(browser)=>{
        techhub['Navigate to request detail page'](browser);
        browser.pause(3000);
        techhub['Navigate to Github URL and verify'](browser);
    })

    
});

