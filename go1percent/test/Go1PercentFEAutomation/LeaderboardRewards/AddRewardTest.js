const login = require('../../../helpers/Go1PercentFEAutomation/techhub/AdminUser/go1Percentloging');
const helper = require('../../../helpers/Go1PercentFEAutomation/LeaderboardRewards/helperFunctions.js');

describe('Leaderboard : Add Rewards Tab Test', () => {

    before((client) => {
      login.beforeEach(browser);
      login['landing on dashboard page'](browser);
      browser
      .page.LeaderboardRewards.rewards().goToRewards()
      .assert.urlContains('rewards/list', 'Reward tab is opened');
  });
  

    after((client, done) => {
      client.end(() => {
          done();
      });
  });


  beforeEach((client) => {
    addRewardTab = browser.page.LeaderboardRewards.add_reward();
    addRewardTab
      .openAddRewardTab()
      .addImage(browser);
  });

  //TC : 1177
  it('admin should be able to add new reward by clicking on add reward button ', (client) => {
    addRewardTab
      .assert.textContains('@addRewardTitle', 'Add a new reward', 'Add reward tab is opened.')
      .closeAddRewardTab();
  });   

  //TC : 1178
  it('admin should able to add image in add new reward page ', (client) => {
    addRewardTab
      .assert.elementPresent('@imageCrossButton', 'Able to add image in add new reward page.')
      .closeAddRewardTab();
  }); 

  //TC : 1179
  it('admin should not be able to click on save button without adding details', (client) => { 
    addRewardTab
      .clickSaveButton()
      .assert.textContains('@errorMessage', 'Name is Required', 'Cannot save reward without adding name.')
      .closeAddRewardTab();
  });   

  //TC : 1180
  it('admin should be be able to save reward after adding all the details', (client) => {
    const rewardName = helper.generateRandomString();
    addRewardTab
    .addARewardDetails(rewardName, '07-11-2027')
    .setAvailableForIndividual()
    .clickSaveButton()
    .assert.textContains('@alert', 'Successfully added reward!', 'Reward is successfully added in individual section.');

    //assert reward is added in the individual section
    updateRewardsTab = browser.page.LeaderboardRewards.update_reward();
    updateRewardsTab
    .openUpdateTab()
    .assert.valueContains('@rewardName', rewardName, 'Reward added is present in individual section.')
    .closeUpdateTab();
  }); 

  // TC : 1181
  it('admin should able to see competency reward in competency section', (client) => {
    const rewardName = helper.generateRandomString();
    addRewardTab
    .addARewardDetails(rewardName, '07-11-2027')
    .setAvailableForCompetency()
    .clickSaveButton()
    .assert.textContains('@alert', 'Successfully added reward!', 'Reward is successfully added in competency section.');
    
    browser.refresh();

    //check reward is added in the competency section
    updateRewardsTab = browser.page.LeaderboardRewards.update_reward();
    updateRewardsTab
    .switchToCompetency()
    .openUpdateTab()
    .assert.valueContains('@rewardName', rewardName, 'Reward added is present in competency section.')
    .closeUpdateTab();
  });  

  // TC : 1183
  it('admin should not able to add current date in exp date it should a popup message ', (client) => {
    const rewardName = helper.generateRandomString();
    const today = helper.getCurrentDate();
    addRewardTab
    .addARewardDetails(rewardName, today)
    .setAvailableForCompetency()
    .clickSaveButton()
    .assert.textContains('@alert', 'Reward expiry date and time must be greater than current date and time')
    .closeAddRewardTab();
  });  

  // TC : 1184 : new test case 
  it('admin should not able to add reward with same name', (client) => {
    addRewardTab
    .addARewardDetails('First Test Reward', '07-11-2027')
    .setAvailableForCompetency()
    .clickSaveButton()
    .assert.textContains('@alert', 'Reward with the same name and type already exist')
    .closeAddRewardTab();
  });  

  //TC : 1185 : new test case 
  it('admin should not able to add reward with name that contain special symbols and number', (client) => {
    addRewardTab
    .addARewardDetails('Test_Reward', '07-11-2027')
    .setAvailableForCompetency()
    .clickSaveButton()
    .assert.textContains('@alert', 'Reward name should not contain special symbols and number')
    .closeAddRewardTab();
  });
});