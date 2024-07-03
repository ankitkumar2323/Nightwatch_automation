import { NightwatchTests, NightwatchBrowser } from "nightwatch";
import { Dashboard } from '../../../page-objects/ManageMyUpcomingSession/MySessionPage'
import { UpcomingSession } from '../../../page-objects/ManageMyUpcomingSession/My_Upcoming_Session'
import { OpeningWebsite } from '../../../page-objects/ManageMyUpcomingSession/login'
import { UpcomingSessionData } from "../../../globals";




describe("Manage My Upcoming Session", () => {

  let  Session = browser.page.ManageMyUpcomingSession.MySessionPage() as Dashboard;
   let Upcoming = browser.page.ManageMyUpcomingSession.My_Upcoming_Session() as UpcomingSession;


    beforeEach((function (browser: NightwatchBrowser) {
        browser
            .window.maximize()
            .page.ManageMyUpcomingSession.login()
            .navigate()
            .enterCredentials(UpcomingSessionData.EmployeeLogin.username, UpcomingSessionData.EmployeeLogin.password)
            .signIn()



        Session
            .ClickOnKnolx()
            .ClickOnMySession()
            .assert.urlContains('my-sessions')


    })),

        it('verify that booked session should be visible in the my upcoming session (TC-177)', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnUpcomingSession()
                .assert.elementPresent('@ListPresent')


        }),

        it('Verify that user should able to update the title (TC-178) ', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .ClickOnAnySession('Testing Title')
                .expect.element('@ToastMessage').text.to.contain('Successfully Updated')

        }),

        it(' Verify that user should not able to save the session without title (TC-179)', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .WithoutTitle()
                .assert.attributeEquals('@SaveButton', 'disabled', 'true')
        }),

        it('verify that user should able to add tags (TC-180)', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .AddNewTag()
                .assert.containsText('@ToastMessage', 'Successfully Updated')

        }),

        it(' verify that user should able to remove the added tags (TC-181)', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .RemoveNewTag()
                .assert.containsText('@ToastMessage', 'Successfully Updated')


        }),

        it('verify that user should able to update the description (TC-182)', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .UpdateDescriptionBox()
                .assert.containsText('@ToastMessage', 'Successfully Updated')



        }),

        it('verify that user should unable to update the description less than 250 words (TC-183)', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .UnableToUpdateDescription()
                .assert.containsText('@ValidationErrorMessage', 'Description should contain atleast 250 characters')
                .assert.attributeEquals('@DescriptionSaveButton', 'disabled', 'true')
        }),

        it('verify that user should not able to update the description more than 1000 words ', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .ExceedDescriptionLength()
                .assert.containsText('@ErrorMessageExceedLength', 'Exceeded the maxlength')
                .assert.attributeEquals('@DescriptionSaveButton', 'disabled', 'true')

        }),

        it(' Verify that user should not able to save the session without description (TC-185) ', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .DisableDiscriptionTextBox()
                .assert.attributeEquals('@DescriptionSaveButton', 'disabled', 'true')
        }),

        it('Verify that user should able to add or update the slide URL (TC-186) ', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .UpdateSlideURLField('www.redbus.com')
                .assert.textContains('@ToastMessage', 'Successfully Updated')


        }),

        it('Verify that user should not able to save the session without slide URL (TC-187)', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .NotUpdateSlideURL()
                .assert.attributeEquals('@URLSaveButton', 'disabled', 'true')


        }),

        it('Verify that user should not able to save the session when enter invalid slide URL (TC-188) -', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .InvalideSlideURL('Hi Everyone')
                .assert.textContains('@InvalidURlMessage', 'Url is invalid')


        }),

        it('verify that back button should enabled when user is on the descriptive page (TC-190)', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnListedSession()
                .BackButtonEnable()
                .assert.textContains('@UpcomingSession', 'My Upcoming Session')


        }),

        it('verify that all details is shown when clicked on Approved Session (TC-191)', function (browser: NightwatchBrowser) {

            Upcoming
                .ClickOnApprovedSession()
                .assert.textContains('@ApprovedPageTitle', UpcomingSessionData.SessionData.ExpectedTitle)
                .assert.textContains('@ApprovedDescription', UpcomingSessionData.SessionData.Description)
                .assert.textContains('@ApprovedSlideURL', UpcomingSessionData.SessionData.SlideURL)
        }),

        it('verify that session should be visible with the session type, date, time, title and status (TC-189)', function (browser: NightwatchBrowser) {

            Upcoming
                .SessionWithMultipleData()
                .assert.elementPresent('@SessionTitle')
                .assert.elementPresent('@SessionStatus')
                .assert.elementPresent('@SessionTypeAndSessionTime')

        }),


        afterEach(function (browser) {
            browser.end();
        })

}

)
