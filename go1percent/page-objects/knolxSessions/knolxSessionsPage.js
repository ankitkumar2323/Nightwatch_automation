const { assert } = require("nightwatch");

function convertToTitleCase(str) {
    // Split the string into an array of words
    const words = str.toLowerCase().split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words back into a sentence
    const result = capitalizedWords.join(' ');

    return result;
}
module.exports = {
    url: "",

    elements: {
        knolxButton: "[src='../../../assets/Icons/knolx.svg']",
        sessionsButton: ".nav.subMenu li a[href='/knolx/upcoming-sessions']",

        // Upcoming Sessions Page 
        allCompetency: {
            selector: "//select[option[contains(text(),'All Competency')]]",
            locateStrategy: 'xpath'
        },
        allSessions: {
            selector: "//select[option[contains(text(),'All Session')]]",
            locateStrategy: 'xpath'
        },
        allTime: {
            selector: "//select[option[contains(text(),'All Time')]]",
            locateStrategy: 'xpath'
        },
        allLocation: {
            selector: "//select[option[contains(text(),'All Location')]]",
            locateStrategy: 'xpath'
        },
        addToCalaender: "button.add-btn",
        closePopUp: ".material-icons.close-icon",
        bookmarkButton: ".book:first-of-type",
        nasher: ".text-bold",

        //Filter by All competency 
        testAutomationCompetency: {
            selector: "//option[contains(text(),' Test Automation Competency')]",
            locateStrategy: 'xpath'
        },
        testAutomationCompetencyDashboard: ".topic-text.mb-n1 + .font-weight-bold",
        competencyName: ".topic-text.mb-n1 + .font-weight-bold",
        // Filter by All Sessions
        knolxSessions:
        {
            selector: "//option[contains(text(),'Knolx')]",
            locateStrategy: 'xpath'
        },
        knolxSessionsDashboard: ".knolxBadge",
        // Filter by Calender
        calender: "input[name='date']",
        nextCalenderButton: "button.next",
        previousCalenderButton: "button.previous",
        calenderDate: ".ms-md-0.ms-sm-6 > h6",
        firstDate: {
            selector: "(//*[@class='mb-n1'])[1]",
            locateStrategy: 'xpath'
        },

        fourteenOctInPast: {
            selector: "(//span[text()='14'])",
            locateStrategy: 'xpath'
        },
        dateDashboard: ".ms-md-0 > .mb-n1",

        //Past Sessions Page
        pastSessionTab: {
            selector: "//a[text()='Past Sessions']",
            locateStrategy: 'xpath'
        },
        testingTicket: {
            selector: "//h6[normalize-space()='Testing Ticket']",
            locateStrategy: 'xpath'
        },
        sessionDescription: ".description > .overall-txt-color",
        //Social Media Links in Past Sessions Page
        facebook: "img[alt='facebook']",
        twitter: "img[alt='twitter']",
        linkedin: "img[alt='linkedin']",

    },
    commands: [{
        waitForPageLoad() {
            return this
                .waitForElementVisible('body', 10000)
        },

        clickOnElement(element) {
            return this
                .waitForElementVisible(element, 10000)
                .click(element)
        },
        clickOnKnolxButton() {
            return this
                .clickOnElement("@knolxButton")
        },
        clickOnSessionsButton() {
            return this
                .clickOnElement('@sessionsButton')
        },
        clickOnNasher() {
            return this
                .clickOnElement('@nasher')
        },
        clickOnAddToCalenderButton() {
            return this
                .clickOnElement('@addToCalaender')
        },
        clickOnBookMarkButton() {
            return this
                .clickOnElement('@bookmarkButton')
        },
        clickOnAllCompetencyDropdown() {
            return this
                .clickOnElement('@allCompetency')
        },
        clickOntestAutomationCompetency() {
            return this
                .clickOnElement('@testAutomationCompetency')
        },
        clickOnAllSessionsDropdown() {
            return this
                .clickOnElement('@allSessions')
        },
        clickOnKnolxSessions() {
            return this
                .clickOnElement('@knolxSessions')
        },

        clickOnPastSessionsTab() {
            return this
                .clickOnElement('@pastSessionTab')
        },
        clickOnTestingTicket() {
            return this
                .clickOnElement('@testingTicket')
        },
        clickOnClosePopUp() {
            return this
                .clickOnElement('@closePopUp')
        },
        // Upcoming Sessions Page 
        getDateFromFirstSessions() {
            return new Promise((resolve, reject) => {
                let getFirstSessionsDate;

                this.waitForElementVisible('@firstDate', 10000)
                    .getText('@firstDate', function (result) {
                        getFirstSessionsDate = result.value;
                    })
                    .perform((client, done) => {
                        // Resolve the promise with the value
                        resolve(getFirstSessionsDate);
                        done();
                    });
            });
        },

        selectDateFromCalenderUpcomingSessions() {
            let getDayXpath, getFirstSessionsDate;
            return this
                .waitForElementVisible('@firstDate', 10000)
                .getText('@firstDate', function (result) {
                    getFirstSessionsDate = result.value;
                    // Create a new Date object
                    const date = new Date(getFirstSessionsDate);
                    const day = date.getDate();
                    getDayXpath = `(//span[text()='${day}'])[1]`;
                })
                .perform((browser, done) => {
                    browser
                        .useXpath()
                        .waitForElementVisible("//input[@name='date']", 5000)
                        .click("//input[@name='date']")
                        .pause(3000)
                        .waitForElementVisible(getDayXpath, 5000)
                        .click(getDayXpath)

                    done();
                });
        },

        selectDateFromCalenderPastSessions() {
            let getDayXpath, getFirstSessionsDate;
            return this
                .waitForElementVisible('@firstDate', 10000)
                .getText('@firstDate', function (result) {
                    getFirstSessionsDate = result.value;
                    // Create a new Date object
                    const date = new Date(getFirstSessionsDate);
                    const day = date.getDate();
                    getDayXpath = `(//span[text()='${day}'])[1]`;
                })
                .perform((browser, done) => {
                    browser
                        .useXpath()
                        .waitForElementVisible("//input[@name='date']", 5000)
                        .click("//input[@name='date']")
                        .pause(3000)
                        .waitForElementVisible(getDayXpath, 5000)
                        .click(getDayXpath)

                    done();
                });
        },
        getCompetencyNameFromFirstSession() {
            let competencyNameFromFirstSession
            return new Promise((resolve, reject) => {

                this.waitForElementVisible('@competencyName', 10000)
                    .getText('@competencyName', function (result) {
                        competencyNameFromFirstSession = result.value;
                    })
                    .perform((client, done) => {
                        // Resolve the promise with the value
                        resolve(competencyNameFromFirstSession);
                        done();
                    });
            });
        },

        selectCompetencyFromDropdown(competencyName) {
            const competencyNameDesireFormat = convertToTitleCase(competencyName);
            return this
                .useXpath()
                .waitForElementVisible(`//option[contains(text(),'${competencyNameDesireFormat}')]`, 5000)
                .click(`//option[contains(text(), '${competencyNameDesireFormat}')]`);
        },
        getSessionNameFromFirstSession() {
            let sessionNameFromFirstSession
            return new Promise((resolve, reject) => {

                this.waitForElementVisible('@knolxSessionsDashboard', 10000)
                    .getText('@knolxSessionsDashboard', function (result) {
                        sessionNameFromFirstSession = result.value;
                    })
                    .perform((client, done) => {
                        // Resolve the promise with the value
                        resolve(sessionNameFromFirstSession);
                        done();
                    });
            });
        },
        selectSessionsFromDropdown(sessionName) {
            const sessionNameDesireFormat = convertToTitleCase(sessionName);
            return this
                .useXpath()
                .waitForElementVisible(`//option[contains(text(),'${sessionNameDesireFormat}')]`, 5000)
                .click(`//option[contains(text(), '${sessionNameDesireFormat}')]`);
        },
        clickOnFacebook() {
            return this
                .clickOnElement('@facebook')
        },
        clickOnTwitter() {
            return this
                .clickOnElement('@twitter')
        },
        clickOnLinkedin() {
            return this
                .clickOnElement('@linkedin')
        },

    }]
};