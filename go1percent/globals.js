

const requestData = {
    'client_id': 'leaderboard-ui',
    'client_secret': '8090ed15-4cd1-483c-9fee-2a8b35941852',
    'username': 'testemployee',
    'password': 'testemployee',
    'grant_type': 'password'
}

const chromedriver = require('chromedriver');
const allureReporter = require('nightwatch-allure');
function startTime() {
    return new Date().getTime()
}


function startTime() {
    return new Date().getTime()
}


function startTime() {
    return new Date().getTime()
}

function startTime() {
    return new Date().getTime()
}


module.exports = {


    urls: {
        token: "https://auth.go1percent.com/auth/realms/nashtech/protocol/openid-connect",
        go1percentBase: "https://knolx-backend.qa.go1percent.com/v02/",

    },
    Add_Contribution: {
        BaseUrl: "https://backend.qa.go1percent.com",
        PostEndPoints: "/contribution/addContribution",
        GetEndPoints: "/contribution/getKnolderContribution?pageNumber=1&limit=10000",
        Contribution_url: "www.cou.org"
    },
    reporter: (results, done) => {
        const reporter = new allureReporter.NightwatchAllureReporter({});
        reporter.write(results, done);
    },
    requestData,

    before: function (done) {
        chromedriver.start();
        done();
    },

    reporter: (results, done) => {
        const reporter = new allureReporter.NightwatchAllureReporter({});
        reporter.write(results, done);
    },


    after: function (done) {
        chromedriver.stop();
        done();
    },


    techhubUrls: {
        token: "https://auth.go1percent.com/auth/realms/nashtech/protocol/openid-connect",
        go1percentBase: "https://techhub-backend.qa.go1percent.com",
    },
 
    ticketraise_url:'https://ticket-backend.qa.go1percent.com',
  

    baseurl: 'https://backend.qa.go1percent.com',
 
    ticketraise_url:'https://ticket-backend.qa.go1percent.com',
 


    admin: {


        requestData: {
            'client_id': 'leaderboard-ui',
            'client_secret': '8090ed15-4cd1-483c-9fee-2a8b35941852',
            'username': 'testemployee',
            'password': 'testemployee',
            'grant_type': 'password'
        },
        headers: {
            'Authorization': '',
            'Source': 'https://nashtechglobal.qa.go1percent.com'
        },
        tokenHeaders: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'source': 'https://nashtechglobal.qa.go1percent.com'
        },
        tokenBody: {
            client_id: 'leaderboard-ui',
            client_secret: '8090ed15-4cd1-483c-9fee-2a8b35941852',
            username: 'testadmin',
            password: 'testadmin',
            grant_type: 'password',
        },
    },

    rewardSectionMessages: {
        colorCode: "rgba(236, 64, 122, 1)",
        successMessage: "Reward was successfully updated!",
        imageFormatFailureMessage: "The acceptable file formats are jpeg, jpg and png.",
        imageInvalidSizeMessage: "File size is more than 500 KB.",
        popupMessage: "Are you sure you want to Redeem?",
        redeemMessage: "Hi, you have redeemed the reward",
        imageUploadMessage: "Click here to upload image"
    },

    employee: {
        headers: {
            "accept": "application/json, text/plain, */*",
            "Authorization": "",
            "content-type": "application/json",
            "source": "https://nashtechglobal.qa.go1percent.com",
        }
    },

    queryRequested: {
        'pageNumber': '1',
        'filter': 'requested',
        'pageSize': '10',
        'search': '',
    },
    techhubUrls: {
        token: "https://auth.go1percent.com/auth/realms/nashtech/protocol/openid-connect",
        go1percentBase: "https://techhub-backend.qa.go1percent.com",
    },


    after: function (done) {
        chromedriver.stop();
        done();
    },

    // Requested sessions
    queryRequested: {
        'pageNumber': '1',
        'filter': 'requested',
        'pageSize': '10',
        'search': '',

    },


    manageSlotBase_url: "https://knolx-backend.qa.go1percent.com",
    source: "https://nashtechglobal.qa.go1percent.com",
    access_token: '',

    Add_Contribution: {
        headers: {
            'Authorization': '',
            'Source': 'https://nashtechglobal.qa.go1percent.com'
        },
        tokenHeaders: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'source': 'https://nashtechglobal.qa.go1percent.com'
        },
        tokenBody: {
            client_id: 'leaderboard-ui',
            client_secret: '8090ed15-4cd1-483c-9fee-2a8b35941852',
            username: 'testadmin',
            password: 'testadmin',
            grant_type: 'password',
        },
        token: "https://auth.go1percent.com/auth/realms/nashtech/protocol/openid-connect",
        BaseUrl:"https://backend.qa.go1percent.com",
        PostEndPoints:"/contribution/addContribution",
        GetEndPoints:"/contribution/getKnolderContribution?pageNumber=1&limit=10000"  
    } ,


    base_url: "https://knolx-backend.qa.go1percent.com/",
    source: "https://nashtechglobal.qa.go1percent.com",
    access_token: '',



    Reward: {
        PostEndPoints: "/rewards",
        PutEndPoints: "/rewards",
        GetEndPoints: ["/rewards/getAllRewards", "/rewards/getReward"]

    },

    Redeemed_Reward: {
        PostEndPoints: "/rewards",
        PutEndPoints: "/updateRedeemReward",
        GetEndPoints: "/get/redeemRewards"
    },


    // Upcoming Page
    queryNasher: {
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'approved',
        'search': 'testadmin'
    },
    queryTestTitle: {
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'approved',
        'search': 'TestAutomationTitle'
    },
    // filter
    queryUsingCompetency: {
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'upcoming',
        'studio': 'testautomation'
    },
    queryUsingAllSessions: {
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'upcoming',
        'session': 'Knolx'
    },
    queryAllTime: {
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'upcoming',
        'time': '1700831564000'
    },
    // Past Sessions
    queryUsingTitlePast: {
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'past'
    },

    //filter
    queryUsingCompetencyPast: {
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'past',
        'studio': 'testautomation'
    },
    queryUsingAllSessionsPast: {
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'past',
        'session': 'Knolx'
    },
    queryAllTimePast: {
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'past',
        'time': '1697259310000'
    },
   
    base_url: "https://knolx-backend.qa.go1percent.com/",
    source: "https://nashtechglobal.qa.go1percent.com",
    sessionDescriptionInPast: "Testing TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting TicketTesting Ticket",

    access_token: "",
    backend_url: 'https://backend-radar.qa.go1percent.com/',


    dataToUpdate: {
        sessionDescription: "The error message indicates that the property 'topic' is not present in the response body, which is why the assertion is failing. This could be due to the structure of the response body or the way the API is handling the request. Please ensure that the API response structure matches the expected response format.",
        feedbackFormName: "sdv",
        sessionId: "653105778555d37c0a4f8d96",
        remarks: "have not updated the sessions",
        slideURL: "www.google.com",
        sessionTag: ["Python"],
        topic: "Updated Title",
        saveOption: true
    },

    access_token: "",
    // Upcoming Sessions Page Frontend Automation
    nasher: "employee",
    testAutomationCompetencyName: "TEST AUTOMATION COMPETENCY",
    badge: "KNOLX",
    date: "Nov 7, 2023",
    datePastSessions: "Oct 14, 2023",
    // allure report
    reporter: (results, done) => {
        const reporter = new allureReporter.NightwatchAllureReporter({});
        reporter.write(results, done);
    },

    //My Past Session

    queryMyPastSession: {
        'pageNumber': '1',
        'pageSize': '1000',
        'filter': 'past',
        'knolderOnly': 'true',
        'sessionId': '6529144d45bc9a797dfbcb19',
    },


    SessionData: {
        ExpectedTitle: 'Sample Text Title Update',
        Description: 'Description',
        SlideURL: 'Slide URL',
    },

    feedbackForm: {
        apiUrls: {
            requestUrl: 'https://knolx-backend.qa.go1percent.com/v02/feedback-form',
        },
        uiData: {
            sessionInUseMessage : 'The Form is currently being used in following session(s)',
            formUpdateMessage : 'Form Updated Successfully',
            deleteDialogBoxMessage : 'Are you sure want to delete this form ?',
            addNPSMessage : 'Please add a NPS question',
            addFormTitleMessage : 'Please enter a Form Title',
            addQuestionMessage : 'Question cannot be empty',
            formCreatedMessage : 'Form created successfully',
            searchQuery : 'Search Me',
            formDeletedMessage : 'Form Deleted Successfully',
            sessionFormName: 'knol',
            no_sessionFormName: 'temp',
            setTitle:'Temporary Form',
    },
},

    MyUpcomingSession: {
        headers: {
            'Authorization': '',
            'Source': 'https://nashtechglobal.qa.go1percent.com'
        },
        tokenHeaders: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'source': 'https://nashtechglobal.qa.go1percent.com'
        },
        tokenBody: {
            client_id: 'leaderboard-ui',
            client_secret: '8090ed15-4cd1-483c-9fee-2a8b35941852',
            username: 'testemployee',
            password: 'testemployee',
            grant_type: 'password',

        },
    },


};