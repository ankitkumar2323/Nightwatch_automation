const { assert } = require("chai");
import { NightwatchTests, NightwatchBrowser } from "nightwatch";

describe('Go1Percent edit contribution frontend testing', ()=> {

    const editContribution = browser.page.contribution.editSearchContribution.editSearchContribution();

    beforeEach((client: NightwatchBrowser) => {
        // Actions to be performed before running the test cases, such as maximizing the window and logging in.
        client
            .maximizeWindow()
            .page.contribution.login()
            .navigate()
            .setValue('@emailInput', 'testemployee')
            .setValue('@passwordInput', 'testemployee')
            .signIn()
            
     });


     afterEach((client: NightwatchBrowser) =>{
        client.end();
     });

    // This test case verifies that save button is disabled if a title less than 15 words is entered. 
    it("Verify that the save button should be disable if user add a title less than 15 words", () => {
        
        editContribution
            .navigate()
            .clickSettings()
            .clickProfile()    
            .clickContributions()
            .clickContribution()
            .clickEditButton()
            .editTitle()
            .pause(2000)
            .expect.element('@saveButton').to.have.attribute('disabled');

    });

    // This test case verifies that save button is disabled if a description less than 100 words is entered.
    it("Verify that the save button should be disable if user add a description less than 100 words", () => {
        
        editContribution
            .navigate()
            .clickSettings()
            .clickProfile()    
            .clickContributions()
            .clickContribution()
            .clickEditButton()
            .editDesciption()
            .pause(2000)
            .expect.element('@saveButton').to.have.attribute('disabled');

    });

    // This test case verifies that save button is disabled if invalid url is entered.
    it("Verify that the save button should not be enable if user add a invalid URL", () => {
        
        editContribution
            .navigate() 
            .clickSettings()
            .clickProfile()   
            .clickContributions()
            .clickContribution()
            .clickEditButton()
            .editUrl('test contribution')
            .pause(2000)
            .expect.element('@saveButton').to.have.attribute('disabled');
    });

    // This test case verifies that contribution type cannot be edited.
    it("Verify that user should not be able to edit the contribution type of the added contribution", () => {
        
        editContribution
            .navigate()  
            .clickSettings()
            .clickProfile()  
            .clickContributions()
            .clickContribution()
            .clickEditButton()
            .expect.element('@contributionType').to.have.attribute('disabled');

    });

    // This test case verifies that title can be edited.
    it("Verify that user should be able to edit the title of the added contribution", () => {
        
        editContribution
            .navigate() 
            .clickSettings()
            .clickProfile()   
            .clickContributions()
            .clickContribution()
            .clickEditButton()
            .expect.element('@title').to.not.have.attribute('disabled');

    });

    // This test case verifies that description can be edited.
    it("Verify that user should be able to edit the details of pending contribution", () => {
        
        editContribution
            .navigate() 
            .clickSettings()
            .clickProfile()   
            .clickContributions()
            .clickContribution()
            .clickEditButton()
            .expect.element('@description').to.not.have.attribute('disabled');

    });

    // This test case verifies that contribution date can be edited.
    it("Verify that user should be able to edit the contribution date of the added contribution except online course", () => {
        const editContribution = browser.page.contribution.editSearchContribution.editSearchContribution();
        editContribution
            .navigate()
            .clickSettings()
            .clickProfile()
            .clickContributions()
            .clickContribution()
            .clickEditButton()
            .expect.element('@contributionDate').to.not.have.attribute('disabled')

    });

    // This test case verifies that save button is disabled if user leaves any field blank.
    it("Verify that save button should be disabled if user leaves any field blank", () => {
        const editContribution = browser.page.contribution.editSearchContribution.editSearchContribution();
        editContribution
            .navigate()
            .clickSettings()
            .clickProfile()
            .clickContributions()
            .clickContribution()
            .clickEditButton()
            .clearValue('@url')
            .expect.element('@saveButton').to.have.attribute('disabled');

    });

    // This test case verifies that contribution date of online course type contribution cannot be edited.
    it("Verify that date of the online course type contribution cannot be modified", () => {
        const editContribution = browser.page.contribution.editSearchContribution.editSearchContribution();
        editContribution
            .navigate()
            .clickSettings()
            .clickProfile()
            .clickContributions()
            .clickOnlineCourseContribution()
            .clickEditButton()
            .expect.element('@contributionDate').to.have.attribute('disabled')
            

    });
    
    // This test case verifies that title/description/url of online course type contribution cannot be edited.
    it("Verify that the title/description/url of the online course contribution cannot be modified", () => {
        const editContribution = browser.page.contribution.editSearchContribution.editSearchContribution();
        editContribution
            .navigate()
            .clickSettings()
            .clickProfile()
            .clickContributions()
            .clickOnlineCourseContribution()
            .clickEditButton()
            .expect.element('@saveButton').to.have.attribute('disabled')
    });

    // This test case verifies that it throws an error id we add an existing url.
    it("Verify that it throws an error id we add an existing url", () => {
        const editContribution = browser.page.contribution.editSearchContribution.editSearchContribution();
        editContribution
            .navigate() 
            .clickSettings()
            .clickProfile()   
            .clickContributions()
            .clickContribution()
            .clickEditButton()
            .editUrl('https://testcontribution.com')
            .click('@saveButton')
            .waitForElementVisible('@alert')
            .assert.textContains('@alert','Contribution with same url already exist')
    });
  
});

