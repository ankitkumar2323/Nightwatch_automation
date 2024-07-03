import { NightwatchBrowser } from "nightwatch";
import { feedbackForm } from "../../../globals";
const Homepage = browser.page.feedbackForm.loginPage();
const feedbackFormPage = browser.page.feedbackForm.feedbackFormSectionPage();
const formCreateUpdatePage = browser.page.feedbackForm.formCreateUpdatePage();

const data = feedbackForm.uiData;


// ----------------------------------------------------------------------
//    >> using command "npx nightwatch src/test/Go1PercentFEAutomation/FEEDBACKFORM/feedbackForm_ui_tests.ts"
// -------------------------------------------------------------------------
describe('Feedback-form UI tests', function () {

    beforeEach(
        async function (browser:NightwatchBrowser) {

            Homepage
                .navigate();

            await browser.window.maximize();

            await Homepage
                .inputUsername(feedbackForm.username)
                .inputPassword(feedbackForm.password)
                .login();

        });

    afterEach(function (browser) {

        browser
            .end();

    });


    it('LB-1252 : Verify that admin should be able to see feedback form in feedback section (TC-257)',

        async function () {

            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .waitForElementVisible('@heading',30000)
                .assert.textContains('@heading', 'Feedback Forms');

        });


    it('LB-1253 : Verify that admin should be able to click on edit option of existing feedback forms (TC-258)',
    async function () {

            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .inputInSearchField(data.sessionFormName)
                .clickOnFormEditButton()
                .waitForElementVisible('@dialogBox',30000);

        });


    it('LB-1254 : Verify that admin should not able to edit a feedback form (TC-259) ',

        async function () {

            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .inputInSearchField(data.sessionFormName)
                .waitForElementVisible('@firstSearchResultCardTitle',30000)

                .waitForElementVisible('@firstSearchResultCardEditBtn',30000)
                .click('@firstSearchResultCardEditBtn')

                .waitForElementVisible('@sessionDialogBox',30000)
                .assert.textContains('@sessionDialogBox', data.sessionInUseMessage);
        });


    it('LB-1255 : Verify that admin should be able to update in feedback form in preview form mode (TC-260)',

        async function () {

            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .inputInSearchField(data.no_sessionFormName)
                .click('@firstSearchResultCardEditBtn');

            await formCreateUpdatePage
                .clickAddQuestion()
                .setParagaphQuestion()
                .saveUpdatedForm()
                .waitForElementVisible('@alertOfFormUpdated',30000)
                .assert.textContains('@alertOfFormUpdated', data.formUpdateMessage);
        });



    it("LB-1256 : Verify that admin should be able to preview their feedback form. (TC-261)",
        async function (browser) {

            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .inputInSearchField(data.no_sessionFormName)
                .waitForElementVisible('@firstSearchResultCardTitle',30000)
                .waitForElementVisible('@firstSearchResultCardEditBtn',30000)
                .click('@firstSearchResultCardEditBtn');

            await formCreateUpdatePage
                .waitForElementVisible('@previewButton',30000)
                .pause(4500)
                .click('@previewButton')


            await browser.window.getAllHandles(async function(result:any){
                await browser.window.switchTo(result.value[1]);
            });
            await formCreateUpdatePage.assert.visible('@previewForm');

        });


    it('LB-1257 : Verify that admin should be able to delete existing feedback form. (TC-262) ',
        async function () {

            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .inputInSearchField(data.no_sessionFormName)
                .clickOnFormDeleteButton()
                .assert.textContains('@deleteDialogBox_Message', data.deleteDialogBoxMessage);

        });


    it('LB-1258 : Verify that admin should not able to delete a feedback form (TC-263)',
        async function () {

            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .inputInSearchField(data.sessionFormName)
                .clickOnFormDeleteButton()
                .assert.textContains('@deleteDialogBox', data.sessionInUseMessage);

        });


    it('LB-1259 : Verify that admin should be able to create a new feedback form (TC-264) ',
        async function () {

            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .clickOnCreateFormButton();

            await formCreateUpdatePage
                .assert.visible('@newForm');
        });


    it('LB-1260 : Verify that admin should not able to save form until they add a NPS Question (TC-265) ',
        async function () {
            
            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .clickOnCreateFormButton();

            await formCreateUpdatePage
                .setFormTitle(data.setTitle)
                .setMCQQuestion()  //can be optional
                .saveForm()
                .assertPopUpMessageContains(data.addNPSMessage)
        });


    it('LB-1261 : Verify that admin should not be able to save form without adding Form Title (TC-266)',
        async function () {
            
            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .clickOnCreateFormButton();

            await formCreateUpdatePage
                .setMCQQuestion()
                .addNewQuestion().setNPSQuestion()
                .saveForm()
                .assertTitleValidationIsShown(data.addFormTitleMessage)
        });


    it('LB-1262 : Verify that admin should able to see validation message if they don\'t add Question in form. (TC-267)',
        async function () {
  
            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .clickOnCreateFormButton();

            await formCreateUpdatePage
                .setFormTitle(data.setTitle)
                .waitForElementVisible('@newFormQuestionTitle',30000)
                .click('@selectQuestionTypeNPS')
                .saveForm()
                .assertQuestionValidationIsShown(data.addQuestionMessage)
        });


    it('LB-1263 : Verify that admin should be able to save form by adding all the mandatory task (TC-268)',
        async function () {

            
            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .clickOnCreateFormButton();

            await formCreateUpdatePage
                .setFormTitle(data.setTitle)
                .addNewQuestion()
                .addNewQuestion()
                .setMCQQuestion()
                .setNPSQuestion()
                .setParagraphQuestion()
                .saveForm()
                .assert.textContains('@formSavedSuccessfullyAlert', data.formCreatedMessage);
        });


    it('LB-1265 : Verify that admin should be able to search particular form from existing feedback form (TC-270)',
        async function (browser: NightwatchBrowser) {

            
            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .inputInSearchField(data.searchQuery)
                .findElements('@feedbackFormCardTitle', async function (result:any) {
                    await result.value.forEach(function(element:any){
                        // expect.element(element).to.contain(data.searchQuery);
                        browser.getText(element, function(res){
                            browser.expect(res.value).to.be.eq(data.searchQuery);
                        })
                    })
                })

        });


    it('LB-1266 : Verify that admin should be able to delete form in edit mode (TC-271)',
        async function () {

            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .inputInSearchField(data.no_sessionFormName)
                .click('@firstSearchResultCardEditBtn');

            await formCreateUpdatePage
                .clickDeleteOnUpdateForm()
                .waitForElementVisible('@formUpdate_dialogBox',30000)
                .assert.textContains('@formUpdate_dialogBox', data.deleteDialogBoxMessage);

        });



    it('LB-1267 : Verify that admin should be able to delete existing feedback form. (TC-272)',
        async function () {
            
            await Homepage
                .goToFeedbackFormSection();

            await feedbackFormPage
                .inputInSearchField(data.no_sessionFormName)
                .clickOnFormDeleteButton()
                .assert.textContains('@deleteDialogBox', data.deleteDialogBoxMessage)
                .assert.textContains('@deleteDialogBox_YesButton', 'Yes')
                .assert.textContains('@deleteDialogBox_NoButton', 'No')
                .click('@deleteDialogBox_YesButton')
                .assert.textContains('@feedbackFormAlert', data.formDeletedMessage);

        });

});