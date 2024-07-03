const login = require('../../../helpers/Go1PercentFEAutomation/techhub/AdminUser/go1Percentloging');
const helper = require('../../../helpers/Go1PercentFEAutomation/LeaderboardRewards/helperFunctions.js');

describe('Leaderboard : Redeemed Rewards Tab Test', () => {

  before((client) => {
    login.beforeEach(browser);
    login['landing on dashboard page'](browser);
    browser.page.LeaderboardRewards.rewards().goToRewards()
    .assert.urlContains('rewards/list', 'Reward tab is opened');
  });
  
  after((client, done) => {
    client.end(() => {
        done();
    });
  });

  beforeEach((client) => {
    redeemedRewardsTab = browser.page.LeaderboardRewards.redeem_reward();
    redeemedRewardsTab
      .openRewardReport();
  });

  //TC : 1169
  it('admin should be able to click on reward report button ', (client) => { 
    redeemedRewardsTab
    .assert.urlContains('rewards/reward-reports', 'Reward Report is opened.');  
  });

  //TC : 1170
  it('admin should be able to see list of names', (client) => {
    redeemedRewardsTab
    .assert.elementPresent('@employeeName', 'Employee name is present') 
    .assert.elementPresent('@competencyName', 'Competency name is present')
    .assert.elementPresent('@rewardName', 'Reward name is present') 
    .assert.elementPresent('@redeemPoints', 'Redeem Points is present') 
    .assert.elementPresent('@redeemedDate', 'Redeemed Date is present');
  });

  //TC : 1171
  it('admin should be able to click on any contributors tab', (client) => {
    redeemedRewardsTab
      .openRedeemRequestWindow()
      .assert.textContains('@RedeemRequestWindowTitle', 'Process a Redeem Request', 'Redeem Request window is opened.')
      .closeRedeemRequestWindow(); 
  });

  //TC : 1172
  /**
   * BUG : 
   * 1. On resetting the filter, the list does not appear
   * 2. On clicking process, the window is not closing
   * 3. After processing, the status of the reward changes only on refreshing
   * 
   *  * APPROACH : 
    * 1. set filter to processing, 
    * 2. check if there is any reward available to process
    * 3. if yes,  go to process window and store its details and process
    *   set filter to processed, assert the stored details
    * 4. if no, prompt error
   * */
  it('admin should able to change status of reward from processing to process', (client) => {
    redeemedRewardsTab
      .setStatusFilterToProcessing()
      .pause(3000);
      browser
      .elements('css selector', 'button.processingStatus', results => {
        if (results.value.length > 0) { 
          redeemedRewardsTab.openRedeemRequestWindow()
          .getDetailsOfRedeemReward(function (rewardDetails) {
            redeemedRewardsTab
            .processReward()
            //BUG : the window is not closing on its own
            // .closeRedeemRequestWindow()
            .setStatusFilterToProcessed();
            //BUG : the page needs to be refreshed
            browser.refresh();
            //assert the stored details
            redeemedRewardsTab
            .waitForElementPresent('@employeeName', 5000)
            .assert.textContains('@employeeName', rewardDetails.owner, 'Employee name matched.') 
            .assert.textContains('@competencyName', rewardDetails.competency, 'Competency name matched.')
            .assert.textContains('@rewardName', rewardDetails.reward, 'Reward name matched.') 
            .assert.textContains('@redeemedDate', rewardDetails.redeemedDate, 'Redeemed Date matched.') 
            .assert.textContains('@statusButton', 'PROCESSED', 'Status is processed.');
          });
        }
        else { 
          console.log('No Redeemed Reward Available'); 
        }
    })
    .refresh();
  });

  // TC : 1173
  it('admin should able to switch to competency from Individual', (client) => {
    redeemedRewardsTab
      .switchToCompetency()
      .assert.textContains('@rewardReport', 'No Redeemed Reward Available')
      .switchToIndividual()
      .waitForElementPresent('@employeeName');
  });

  //TC : 1174
  it('admin should be able to apply filter in all time dropdown', (client) => {
    const currentFormattedDate = helper.getCurrentFormattedDate();
    redeemedRewardsTab
      .setTimeFilterToToday()
      .assert.textContains('@redeemedDate', currentFormattedDate, 'The Redeem date of rewards is set to today.')
      .resetTimeFilter();
  });
  
  //TC : 1175
  //BUG : On resetting the filter, the list does not appear
  it('admin should able to filter out the status of reward', (client) => {
    redeemedRewardsTab
      .setStatusFilterToProcessing()
      .pause(3000);
      browser
      .elements('css selector', 'button.processingStatus', results => {
        if (results.value.length > 0) { 
          browser.assert.textContains('button.processingStatus', 'PROCESSING', 'Status of redeemed rewards is set to processing.');
        }
        else { 
          console.log('No Redeemed Reward Available'); 
        }
      })
      .refresh();
  });

  // TC : 1176
  //BUG : show more is dispalyed, instead of redeemed rewards msg
  it('admin should able to see blank screen with message', (client) => {
      redeemedRewardsTab
      .searchNasher('Tester')
      .assert.textContains('@rewardReport', 'No Redeemed Reward Available')
      //actual 
      // .waitForElementPresent('@showMoreCard') 
      // .assert.textContains('@showMoreCard', 'SHOW MORE');
  });
})