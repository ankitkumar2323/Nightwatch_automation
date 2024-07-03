function convertToTitleCase(str: string) {
    // Split the string into an array of words
    const words = str.toLowerCase().split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words back into a sentence
    const result = capitalizedWords.join(' ');

    return result;
}
function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomCompetency: string;

import { PageObjectModel, EnhancedPageObject, NightwatchAPI } from 'nightwatch';

const knolxSessionsCommands = {
    waitForPageLoad(this: KnolxSessionsPage) {
        return this.waitForElementVisible('body', 10000);
    },

    clickOnElement(this: KnolxSessionsPage, element: string) {
        return this
            .waitForElementVisible(element, 10000)
            .click(element);
    },

    clickOnKnolxButton(this: KnolxSessionsPage) {
        return this.clickOnElement('@knolxButton');
    },

    clickOnSessionsButton(this: KnolxSessionsPage) {
        return this.clickOnElement('@sessionsButton');
    },
    clickOnNasher(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@nasher')
    },
    clickOnAddToCalenderButton(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@addToCalaender')
    },
    clickOnBookMarkButton(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@bookmarkButton')
    },
    clickOnAllCompetencyDropdown(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@allCompetency')
    },
    clickOntestAutomationCompetency(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@testAutomationCompetency')
    },
    clickOnAllSessionsDropdown(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@allSessions')
    },
    clickOnKnolxSessions(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@knolxSessions')
    },

    clickOnPastSessionsTab(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@pastSessionTab')
    },
    clickOnUpcomingSessionsTab(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@upcomingSessionTab')
    },
    clickOnTestingTicket(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@testingTicket')
    },
    clickOnClosePopUp(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@closePopUp')
    },

    // Upcoming Sessions Page 
    getDateFromFirstSessions(this: KnolxSessionsPage): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let getFirstSessionsDate: string;

            this.waitForElementVisible('@firstDate', 10000)
                .getText('@firstDate', function (result) {
                    if (typeof result.value === 'string') {
                        getFirstSessionsDate = result.value;
                    } else {
                        console.error('Unexpected result value:', result.value);
                    }
                })
                .perform(function (client: NightwatchAPI, done: () => void) {
                    // Resolve the promise with the value
                    resolve(getFirstSessionsDate);
                    done();
                });
        });
    },
    selectCompetencyFromDropdown(this: KnolxSessionsPage, competencyName: string) {
        const competencyNameDesireFormat = convertToTitleCase(competencyName);
        return this
            .useXpath()
            .waitForElementVisible(`//option[contains(text(),'${competencyNameDesireFormat}')]`, 5000)
            .click(`//option[contains(text(), '${competencyNameDesireFormat}')]`);
    },
    selectOneCompetencyNameFromDropdown(this: KnolxSessionsPage) {
        const randomeNumber = generateRandomNumber(2, 29)
        const allCompetency = "(//select[@class='form-control cursor-pointer py-3 ps-1 mb-2'])[1]/option"
        randomCompetency = allCompetency + '[' + randomeNumber + ']'

        return this
            .useXpath()
            .waitForElementPresent(randomCompetency, 5000)
            .click(randomCompetency)
            .pause(2000)

    },
    getCompetencyNameText(this: KnolxSessionsPage) {
        let text: string
        return new Promise((resolve, reject) => {
            this.useXpath()
                .waitForElementVisible(randomCompetency, 10000)
                .getText(randomCompetency, function (result) {
                    if (typeof result.value === 'string') {
                        text = result.value;
                    } else {
                        console.error('Unexpected result value:', result.value);
                    }
                })
                .perform(function (client: NightwatchAPI, done: () => void) {
                    // Resolve the promise with the value
                    resolve(text);
                    done();
                });
        });
    },
    getNoSessionsText(this: KnolxSessionsPage) {
        let sessionsText: string
        return new Promise((resolve, reject) => {
            this.waitForElementVisible('@noSessionDisplay', 10000)
                .getText('@noSessionDisplay', function (result) {
                    if (typeof result.value === 'string') {
                        sessionsText = result.value;
                    } else {
                        console.error('Unexpected result value:', result.value);
                    }
                })
                .perform(function (client: NightwatchAPI, done: () => void) {
                    // Resolve the promise with the value
                    resolve(sessionsText);
                    done();
                });
        });
    },
    getCompetencyNameFromFirstSession(this: KnolxSessionsPage) {
        let competencyNameFromFirstSession: string
        return new Promise((resolve, reject) => {

            this.waitForElementVisible('@competencyName', 10000)
                .getText('@competencyName', function (result) {
                    if (typeof result.value === 'string') {
                        competencyNameFromFirstSession = result.value;
                    } else {
                        console.error('Unexpected result value:', result.value);
                    }
                })
                .perform(function (client: NightwatchAPI, done: () => void) {
                    // Resolve the promise with the value
                    resolve(competencyNameFromFirstSession);
                    done();
                });
        });
    },
    selectDateFromCalenderUpcomingSessions(this: KnolxSessionsPage) {
        let getDayXpath: string, getFirstSessionsDate: string;
        return this
            .waitForElementVisible('@firstDate', 10000)
            .getText('@firstDate', function (result) {
                if (typeof result.value === 'string') {
                    getFirstSessionsDate = result.value; // Assign only if it's a string
                    const date = new Date(getFirstSessionsDate);
                    const day = date.getDate();
                    getDayXpath = `(//span[text()='${day}'])[1]`;
                } else {
                    // Handle the case where result.value is not a string
                    console.error('Unexpected result value:', result.value);
                }
            })
            .perform(function (client: NightwatchAPI, done: () => void) {
                client
                    .useXpath()
                    .waitForElementVisible("//input[@name='date']", 5000)
                    .click("//input[@name='date']")
                    .pause(3000)
                    .waitForElementVisible(getDayXpath, 5000)
                    .click(getDayXpath)
                done();
            });
    },
    getSessionNameFromFirstSession(this: KnolxSessionsPage) {
        let sessionNameFromFirstSession: string
        return new Promise((resolve, reject) => {

            this.waitForElementVisible('@knolxSessionsDashboard', 10000)
                .getText('@knolxSessionsDashboard', function (result) {
                    if (typeof result.value === 'string') {
                        sessionNameFromFirstSession = result.value;
                    } else {
                        console.error('Unexpected result value:', result.value);
                    }
                })
                .perform(function (client: NightwatchAPI, done: () => void) {
                    // Resolve the promise with the value
                    resolve(sessionNameFromFirstSession);
                    done();
                });
        });
    },
    selectSessionsFromDropdown(this: KnolxSessionsPage, sessionName: string) {
        const sessionNameDesireFormat = convertToTitleCase(sessionName);
        return this
            .useXpath()
            .waitForElementVisible(`//option[contains(text(),'${sessionNameDesireFormat}')]`, 5000)
            .click(`//option[contains(text(), '${sessionNameDesireFormat}')]`);
    },
    selectDateFromCalenderPastSessions(this: KnolxSessionsPage) {
        let getDayXpath: string, getFirstSessionsDate: string;

        return this
            .waitForElementVisible('@firstDate', 10000)
            .getText('@firstDate', function (result) {
                if (typeof result.value === 'string') {
                    getFirstSessionsDate = result.value; // Assign only if it's a string
                    const date = new Date(getFirstSessionsDate);
                    const day = date.getDate();
                    getDayXpath = `(//span[text()='${day}'])[1]`;
                } else {
                    // Handle the case where result.value is not a string
                    console.error('Unexpected result value:', result.value);
                }
            })
            .perform(function (client: NightwatchAPI, done: () => void) {
                client
                    .useXpath()
                    .waitForElementVisible("//input[@name='date']", 5000)
                    .click("//input[@name='date']")
                    .pause(3000)
                    .waitForElementVisible(getDayXpath, 5000)
                    .click(getDayXpath);

                done();
            });
    },

    clickOnFacebook(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@facebook')
    },
    clickOnTwitter(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@twitter')
    },
    clickOnLinkedin(this: KnolxSessionsPage) {
        return this
            .clickOnElement('@linkedin')
    },
    slotIspresent(this: KnolxSessionsPage) {
        return this
            .isPresent('@sessionSlot', function (result) {

                console.log("value=" + result.value);
            });
    },

};



const knolxPage: PageObjectModel = {
    url: '',
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
        competencyName: ".topic-text.mb-n1 + .font-weight-bold",
        allCompetencyDropdown: {
            selector: "(//select[@class='form-control cursor-pointer py-3 ps-1 mb-2'])[1]/option",
            locateStrategy: 'xpath'
        },
        firstDate: {
            selector: "(//*[@class='mb-n1'])[1]",
            locateStrategy: 'xpath'
        },
        noSessionDisplay: ".card > h6",
        fourteenOctInPast: {
            selector: "(//span[text()='14'])",
            locateStrategy: 'xpath'
        },
        dateDashboard: ".ms-md-0 > .mb-n1",
        sessionSlot: {
            selector: "(//div[@class='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'])[1]",
            locateStrategy: 'xpath'
        },
        //Past Sessions Page
        pastSessionTab: {
            selector: "//a[text()='Past Sessions']",
            locateStrategy: 'xpath'
        },
        upcomingSessionTab: {
            selector: "//a[text()='Upcoming']",
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
    commands: [knolxSessionsCommands],
};
export default knolxPage;
export interface KnolxSessionsPage
    extends EnhancedPageObject<typeof knolxSessionsCommands, typeof knolxPage.elements> { }

