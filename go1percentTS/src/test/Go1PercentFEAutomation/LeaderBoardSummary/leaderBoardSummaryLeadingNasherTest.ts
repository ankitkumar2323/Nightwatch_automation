import {NightwatchBrowser } from 'nightwatch';
import{LoginPage} from '../../../page-objects/leaderBoardSummary/login';
import{SummaryPage} from '../../../page-objects/leaderBoardSummary/summary';
import {LeadingNasherPage} from '../../../page-objects/leaderBoardSummary/leadingNasherPage';


describe('UI automation for leaderboard summary leading nasher page option', () => {
    let summaryPage: SummaryPage;
    let leadingPage: LeadingNasherPage;

    beforeEach((client:NightwatchBrowser) => {
        // Create a page object and perform login actions
        const page = client.page.leaderBoardSummary.login()as LoginPage;
        page
            .maximizeWindow()
            .navigate()
            .enterCredentials()
            .signIn();

        //Initialize summaryPage and leadingpage page objects
        summaryPage = browser.page.leaderBoardSummary.summary() as SummaryPage;
        leadingPage = browser.page.leaderBoardSummary.leadingNasherPage() as LeadingNasherPage;
    });

    // Define common actions in the beforeEach hook
    const commonActions = () => {
        summaryPage
            .isLeaderboardVisible()
            .assert.containsText('@summary', 'Summary')
            .SummaryWithAllTheDetails()
    };

    const leadingNasherCommonActions = () => {
        commonActions();
        leadingPage
            .leadingNasherProfilePage()
    };



     /**
     * Test case to validate opening a Nasher's profile when clicking on their name.
     */
     it('When I click on any Nasher Name Then it should open their profile', () => {
        leadingNasherCommonActions();
        leadingPage
            //verify leader nasher profle page 
            .verifyLeadingNasherProfilepage();
    });

    /*
     * Test case to verify the visibility of Nasher contributions when scrolling the page.
     */
    it('When i scroll the page Then i should able to see all their contribution', (client) => {
        leadingNasherCommonActions();
        leadingPage
            //asserting all contribution of leading nasher 
            .leadingNasherAllContribution()
            .allContibutionList();
    });

    /**
   * Test case to confirm the visibility of redeemed rewards with points and dates.
   */
    it('When i go on Redeemed Reward section Then i should able to see the reward redeemed with their points and the date when that reward redeemed', (client) => {
        leadingNasherCommonActions();
        leadingPage
            //verifying reword section with points and date 
            .verifyRewordSectionContainsPointAndDate();
    });


    /**
     * Test case to check if "No Rewards Redeemed" message is displayed in the Redeemed Reward section.
     */
    it('When i go on Redeemed Reward section Then it should show You have not redeemed any rewards yet', (client) => {
        commonActions();
        leadingPage
            //verifying that reword section contains no reoword
            .noRewordSection()
            .assert.textContains('@norewordSection', 'You have not redeemed any rewards yet', 'no rewords redeemed yet');
    });

    /**
     * Test case to validate redirection to the Rewards page when clicking the "View Rewards" button.
     */
    it('When i click on view rewards button Then it should redirect me to Rewards page', (client) => {
        commonActions();
        leadingPage
            .noRewordSection()
            .assert.textContains('@norewordSection', 'You have not redeemed any rewards yet', 'no rewords redeemed yet')
            .viewRewords()
            //verifying that the reword page contains reowrds
            .assert.textContains('@rewords', 'pts', 'asserting points on reword section')
            .assert.textContains('@rewords', 'Expiry', 'asserting the date of Expiry the reword section');
    });

    /**
   * Test case to confirm that clicking on a badge displays a popup with rank, score, and the date earned.
   */
    it('When i click on Badge if any Then it show me a popup with their Rank and score and also it show the Date when they got that rank', (client) => {
        leadingNasherCommonActions();
        leadingPage
            //verifying that popup contains rank and date
            .contaisBadgeSectionWithPopUpDetails();
    });

    /**
   * Test case to verify the display of "No Badges Earned" in the Badges section.
   */
    it('When i go on Badges section Then it should show No Badges Earned', () => {
        commonActions();
        leadingPage
            //verifying that it Badge section contains no badge
            .contaisNoBadgeSection();
    });

    /**
   * Test case to ensure visibility of month and score when clicking on "My Points".
   */
    it('When i click on Mypoints Then i should able to see month and score of that month', () => {
        leadingNasherCommonActions();
        leadingPage
            //verify the points section with score 
            .pointsSectionWithScore();
    });

    /**
   * Test case to check the display of a month's calendar and the ability to select a month when clicking on a current month's name.
   */
    it('When i click on current month Name Then a months calender should be shown and i am able to select month', (client) => {
        leadingNasherCommonActions();
        leadingPage
            .pointsSectionWithScore()
            //verifying that user is able to select the date 
            .selectDate();
    });

    it('When i hover on graph Then i should able to see contribution type with score', (client) => {
        let graphDetail1sRegex = '[A-Za-z]+';
        let graphDetail2sRegex = '[0-9]+';
        leadingNasherCommonActions()
        leadingPage
            .pointsSectionWithScore()
            //verify that user is able to hover on the graph with details 
            .hoverOnGraph()
            .assert.textMatches('@graphData1', new RegExp(graphDetail1sRegex))
            .assert.textMatches('@graphData2', new RegExp(graphDetail2sRegex))
    });

    /**
   * Test case to expand any contribution and verify visibility of one's own contribution for that type with topic name and date.
   */
    it('When i expand any contribution Then i should able to see my contribution for that contribution type with Topic name and Date', () => {
        leadingNasherCommonActions();
        leadingPage
            .pointsSectionWithScore()
            .expandContribution()
    });

    /**
   * Test case to check the visibility of skills names with levels when clicking on the "Skills" section.
   */
    it('When i click on skills Then i should be able to see skills name with level', () => {
        commonActions()
        leadingPage
            //verifying that the nasher is bale to see the skill and levels
            .nasherWithSkillAndWithoutSkill()
    });

    /**
   * Test case to check the display of "No Skills in this level" when clicking on the "Skills" section.
   */
    it('When i click on skills Then i should be able to see No Skills in the level', () => {
        commonActions()
        leadingPage
            //verifying that the nasher is not able  to see the skill and levels if not available 
            .nasherWithSkillAndWithoutSkill()
    });

    afterEach((client) => {
        client.end();
    });

});

