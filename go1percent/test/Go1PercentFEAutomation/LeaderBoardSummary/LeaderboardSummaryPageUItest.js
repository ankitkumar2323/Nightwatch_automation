// Describe block for UI automation of the leaderboard summary option
describe('UI automation for leaderboard summary page option', () => {
  let summaryPage;
  let leadingpage;

  beforeEach((client) => {
    // Create a page object and perform login actions
    const page = client.page.LeaderBoardSummary.login();
    page
      .maximizeWindow()
      .navigate()
      .enterCredentials('testemployee', 'testemployee')
      .signIn();

    //Initialize summaryPage and leadingpage page objects
    summaryPage = client.page.LeaderBoardSummary.summary();
    leadingpage = client.page.LeaderBoardSummary.leadingnasher();
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
    leadingpage
      .leadingNasherProfilePage()
  };

  /**
   * Test case to check if the dashboard is visible
   */
  it('dashboard is visible', () => {
    // summaryPage.dashboardIsVisible()
    summaryPage
      .waitForElementVisible('@dashboard')
      .assert.containsText('@dashboard', 'DASHBOARD')
  });

  /**
   * Test case to check if the summary is visible in the leaderboard menu
   */
  it('When I expand leaderboard Then I should be able to see summary in leaderboard menu', () => {
    commonActions();
  });

  /**
  * Test case to check if summary page opens with all the details
  */
  it('When I click on summary Then summary page should be open with all the details', () => {
    commonActions();
  });

  /**
 * Test case to ensure that clicking on the navigation arrow allows switching to all other contribution types.
 */
  it('When I click on navigation arrow Then it should let me switch to all other contribution types', () => {
    commonActions();
    summaryPage
      // all contribution section is visible 
      .allContributionSectionIsVisible()
      .assert.containsText('@contributionTypes_1', 'Blogs')
      .assert.containsText('@contributionTypes_2', 'Knolx')
      .assert.containsText('@contributionTypes_3', 'Webinars')
      .assert.containsText('@contributionTypes_4', 'OS Contributions')
      .clickOnNavigationArrow()
      .assert.containsText('@contributionTypes_1', 'Techhub')
      .assert.containsText('@contributionTypes_2', 'Conferences')
      .assert.containsText('@contributionTypes_3', 'Research Papers')
      .assert.containsText('@contributionTypes_4', 'Books')
      .clickOnNavigationArrow()
      .assert.containsText('@contributionTypes_1', 'Meetup')
      .assert.containsText('@contributionTypes_2', 'Proposal')
      .assert.containsText('@contributionTypes_3', 'Process Doc')
      .assert.containsText('@contributionTypes_4', 'PMO Template')
      .clickOnNavigationArrow()
      .assert.containsText('@contributionTypes_1', 'Certifications')
      .assert.containsText('@contributionTypes_2', 'Online Courses')
  });


  /**
 * Test case to confirm visibility of the Leading Nasher list after scrolling down.
 * @test Verifies that scrolling down on the summary page reveals the Leading Nasher list.
 */
  it('When I scroll down Then I should be able to see Leading Nasher list', () => {
    commonActions();
    summaryPage
      //contains leading lasher list
      .containsLeadingnasherList();
  });

  /**
 * Test case to verify switching between "This Mo//asserting skill for allt he labelsnth" and "All Time" buttons and viewing the list of Nashers.
 */
  it('When I am on this month button and click on All time button Then I should be able to switch between both buttons and able to see the list of nasher', () => {
    commonActions();
    summaryPage
      //switch bwtween allTime and date
      .switchBetweenAlltimeandThisMonth()
      .waitForElementVisible('@leadingNasherList')
      .containsLeadingnasherList();
  });

  afterEach((client) => {
    client.end();
  });
});

