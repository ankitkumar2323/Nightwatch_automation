const { assert } = require("nightwatch");
const randomNumber = Math.floor(Math.random() * 5) + 1;
const skillSectionCount = 3;
module.exports = {
    elements: {
        leadingnahser: {
            selector: '.leading.mt-3 >:nth-child(1)'
        },
        contibutionButton: {
            selector: "//a[text()='Contributions']",
            locateStrategy: 'xpath'
        },
        pointsButton: {
            selector: "//a[text()='My Points']",
            locateStrategy: 'xpath'
        },
        allContributions: {
            selector: '.studio-member-card.cursor-pointer',
        },
        rewrordSection: {
            selector:"div[class*='-center mt-5'] div div:nth-child(1)"
        },
        rewordSectionDate: {
            selector: 'span[class="text-bold"]'
        },
        rewordSectionPoints: {
            selector: 'p[class="text-center"]'
        },
        noRewordNasher: {
            selector: '.leading.mt-3>:nth-child(3)'
        },
        norewordSection: {
            selector: 'span[class="mt-5 text-center"]'
        },

        viewRwordsButton: {
            selector: '.add-button.reedeem-btn'
        },
        rewords: {
            selector:'.card.rewrdlist'
        },
        badge: {
            selector:'div[class*="material-symbols-outlined hexagon"]'
        },
        badgPopup: {
            selector:'.modal-body :nth-child(1)'
        },
        noBadgeFound: {
            selector: ".badge-card :nth-child(3) p"
        },
        pointSection: {
            selector: 'div[class="col-6 current-month"]'
        },
        calander: {
            selector: "input[placeholder='Select Month']"
        },
        selectMonth: {
            selector: 'td:nth-child(1)'
        },
        graph: {
            selector: 'canvas'
        },
        exanContribution: {
            selector: 'div[class="accordion mb-3 br spanText"]'
        },
        contributionsTyesOne: {
            selector:'.detail-row:nth-child(1) :nth-child(1)'
        },
        contributionsTyesTwo:{
            selector:'.detail-row:nth-child(1) :nth-child(2)'
        },
        
        skillButton: {
            selector:'.newTabs.nav-item + li'
        },
        noSkillSection: {
            selector: 'div[class="skill-outline-div w-100 h-40"]'
        },

        nasherWithSkill: {
            selector :'.leading.mt-3>:nth-child(2)'
        },
        skillabel1: {
            selector: "(//div[@class='mb-4 mt-3'])[1]",
            locateStrategy: 'xpath'
        },
        skillForLable1: {
            selector:'.skill-outline-div.skill-outline-div'
        },
        skillabel2: {
            selector: "(//div[@class='mb-4 mt-3'])[2]",
            locateStrategy: 'xpath'
        },
        skillForLable2: {
             selector:'.card.tab-card :nth-child(3)'
        },
        skillabel3: {
            selector: "(//div[@class='mb-2 mt-3'])",
            locateStrategy: 'xpath'
        },
        graphData1: {
            selector: "app-profile-pie-chart div:nth-of-type(2) > div > div > span:nth-of-type(2)"
        },
        graphData2: {
            selector: "app-profile-pie-chart div:nth-of-type(2) > div > div > span:nth-of-type(3)",
        },
        skillForLable3: {
            selector: "(//div[@class='skill-outline-div w-100 h-40'])[4]",
            locateStrategy: 'xpath'
        },
        badgePopUpDetails: {
            selector: `(//div[@class='info-div d-flex flex-column justify-content-center'])[${randomNumber}]`,
            locateStrategy: 'xpath'
        },
    },
    commands: [
        {
            leadingNasherProfilePage() {
                return this
                    .click('@leadingnahser')
            },
            verifyLeadingNasherProfilepage() {
                return this
                    .getText('div[class="d-flex flex-column align-items-center"]', function name(text) {
                        console.log(text)
                    })
            },
            leadingNasherAllContribution() {
                let regexPattern1="^.*\d+.*$"
                let contributionText='';
                return this
                    .waitForElementVisible('@contibutionButton')
                    .click('@contibutionButton')
                    .waitForElementPresent('@allContributions', function name(text) {
                        console.log(text)
                    })
                    .waitForElementVisible('@allContributions')
                    .getText('@allContributions', function name(text) {
                        browser.assert.textContains('div[class="studio-member-card cursor-pointer my-4 px-2 py-3"]',text.value)
                    })
                                      
            },
            
            allContibutionList() {
                browser.waitForElementVisible('div[class="studio-member-card cursor-pointer my-4 px-2 py-3"]')
                browser.elements('css selector', 'div[class="studio-member-card cursor-pointer my-4 px-2 py-3"]', function (result) {
                    const elementCount = result.value.length;
                    browser.assert.ok(elementCount > 0, 'contribuions list of  should be greater than 0');
                });

            },
            verifyRewordSectionContainsPointAndDate() {
                dateRegex='[A-Za-z]+ [0-9]+, [0-9]+'
                return this
                    .assert.textContains('@rewordSectionPoints', 'pts', 'asserting points ont reworing section')
                    .assert.textMatches('@rewordSectionDate',dateRegex)
            },
            noRewordSection() {
                return this
                    .click('@noRewordNasher')
                    .waitForElementVisible('@norewordSection')
                    .assert.containsText('@norewordSection', 'You have not redeemed any rewards yet', 'no rewords redeemed yet')
            },
            viewRewords() {
                return this
                    .click('@viewRwordsButton')
                    .waitForElementVisible('@rewords',6000)
                    .assert.containsText('@rewords', 'pts', 'asserting points ont reworing section')
                    .assert.containsText('@rewords', 'Expiry', 'asserting the date of Expiry the reword section')
            },
            contaisBadgeSectionWithPopUpDetails() {
                let regexPattern = /^[A-Z]+ \d{4}\nScore: \d+$/; 
                return this
                    .click('@badge')
                    .waitForElementVisible('@badgPopup')
                    .assert.textMatches('@badgePopUpDetails', regexPattern);
            },
            contaisNoBadgeSection() {
                return this
                    .click('@noRewordNasher')
                    .assert.containsText('@noBadgeFound', 'No Badges Earned')
            },
            pointsSectionWithScore() {
                regexPattern = '^[A-Z][a-z]+ Score$';
                return this
                    .click('@pointsButton')
                    .getText('@pointSection', function name(text) {
                        console.log(text);
                    })
                    .assert.textMatches('@pointSection', regexPattern)
            },
            selectDate() {
                return this
                    .waitForElementVisible('@calander')
                    .click('@calander')
                    .waitForElementVisible('@selectMonth')
                    .click('@selectMonth')
                   
            },
            hoverOnGraph() {
                let graphDetail1sRegex = '[A-Za-z]+';
                let graphDetail2sRegex = '[0-9]+';
                
                return this
                    .waitForElementVisible('@graph',6000)
                    .moveToElement('@graph', 10, 10)
                    .pause(5000)
                    .moveToElement('@graph', 60, 60)
                    .pause(5000)
                    .moveToElement('@graph',60,60,function name(params) {
                    })
                    .waitForElementVisible('@graphData1')
                    .assert.textMatches('@graphData1', new RegExp(graphDetail1sRegex))
                    .assert.textMatches('@graphData2', new RegExp(graphDetail2sRegex))
            },
            
            //we expand our configuration here
            expandContribution() {
                
            let wordRegex = '[A-Za-z]+';
            let dateRegex='[0-9]+-[A-Za-z]+-[0-9]+';

            return this
                .waitForElementVisible('@exanContribution')
                .click('@exanContribution')
                .assert.textMatches('@contributionsTyesOne', new RegExp(wordRegex))
                .assert.textMatches('@contributionsTyesTwo', new RegExp(dateRegex))

            },
            nasherWithSkillAndWithoutSkill() {
                //conatais skill with lebels 
                return this
                    .click('@nasherWithSkill')
                    .click('@skillButton')
                    .waitForElementVisible('@skillabel1')
                    .assert.containsText('@skillabel1', 'Proficient', 'contains the skill lebel Proficient')
                    .waitForElementVisible('@skillabel2')
                    .assert.containsText('@skillabel2', 'Intermediate', 'contains the skill lebel Intermediate')
                    .waitForElementVisible('@skillabel3')
                    .assert.containsText('@skillabel3', 'Beginner', 'contains the skill lebel Beginner')

                    //asserting skill for allt he labels
                    .getText('@skillForLable1', function name(text) {
                        if (text.value == 'No Skills') {
                            assert.equal(text.value, 'No Skills', "contains no skill");
                        }
                        else {
                            console.log('contains some skill')
                        }
                    })
                    .getText('@skillForLable2', function name(text) {
                        if (text.value == 'No Skills') {
                            assert.equal(text.value, 'No Skills', "contains no skill");
                        }
                        else {
                            console.log('contains some skill')
                        }
                    })
                    .getText('@skillForLable3', function name(text) {
                        if (text.value == 'No Skills') {
                            assert.equal(text.value, 'No Skills', "contains no skill");
                        }
                        else {
                            console.log('contains some skill')
                        }
                    })
            }

        }
    ]
};