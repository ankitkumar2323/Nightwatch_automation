const login = require('../../../helpers/Go1PercentFEAutomation/techhub/AdminUser/go1Percentloging');
describe('Leaderboard: Update Rewards Tab Test', () => {
  const updateRewardsTab = browser.page.LeaderboardRewards.update_reward();

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

  // TC: 1164
  it('admin should not be able to edit Available For option', (client) => {
    updateRewardsTab
      .openUpdateTab()
      .assert.textContains('@updateRewardTitle', 'Update Reward', 'Update Reward tab is opened.')
      .editAvailableFor()
      .isEnabled('@availableForButton', function(result) {
        this.assert.equal(result.value, false, 'Available for Button is disabled.');
      })
      .closeUpdateTab();
  });

  // TC: 1165
  it('admin should be able to change expiry date of existing rewards', (client) => {
    updateRewardsTab
      .openUpdateTab()
      .changeExpiryDate()
      .assert.textContains('@alert', 'Reward was successfully updated!')
      .waitForElementNotPresent('@alert', 5000);
  });

  // TC: 1166
  it('admin should be able to click on cancel button', (client) => {
    updateRewardsTab
      .openUpdateTab()
      .closeUpdateTab()
      .assert.not.elementPresent('@updateRewardTitle', 'Update Reward tab is closed.');;
  });

  // TC: 1167
  it('admin should be able to delete existing reward by clicking on delete button', (client) => {
    updateRewardsTab
      .openUpdateTab()
      .deleteReward()
      .assert.textContains('@alert', 'Reward is disabled')
      .waitForElementNotPresent('@alert', 5000);
  });

  // TC: 1168
  it('admin should be able to switch on for competency option', (client) => {
    updateRewardsTab
      .switchToCompetency()
      .assert.cssProperty('@competencyOption', 'background-color', 'rgba(236, 64, 122, 1)', 'Switched to Competency.');
  });

  // TC: 1182
  it('admin should be able to delete reward from competency section', (client) => {
    updateRewardsTab
      .switchToCompetency()
      .assert.cssProperty('@competencyOption', 'background-color', 'rgba(236, 64, 122, 1)', 'Switched to Competency.')
      .openUpdateTab()
      .deleteReward()
      .assert.textContains('@alert', 'Reward is disabled');
  });

});
