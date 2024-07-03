const helper = require('../../../helpers/Go1PercentFEAutomation/LeaderboardRewards/helperFunctions.js');

const path = require('path');

module.exports = {

  redeemedRewardProperties: [
    "redeemId",
    "knolderName",
    "userProfilePic",
    "studio",
    "rewardName",
    "pointsNeededToRedeem",
    "rewardImage",
    "rewardType",
    "redeemDate",
    "processingStatus",
    "knolderId",
    "rewardId",
  ],

  updateRewardProperties: {
    id: 286,
    name: 'Eardopes',
    pointsNeededToRedeem: 700,
    description: 'Boat eardopes',
    rewardType: 'Individual',
    quantity: 2,
    expiryDate: '2025-10-30T00:00:00.0',
    active: true,
  },

  newReward: {
    rewardName: helper.generateRandomString(),
    imagePath: path.resolve(__dirname, '..', '..', '..', 'helpers/Go1PercentFEAutomation/LeaderboardRewards/imageFiles/Reward.jpeg'),
    expiryDate: '2027-11-30T00:00:00.000',
    description: 'Testing purpose',
    rewardType: 'Studio',
    pointsNeededToRedeem: '1000',
    quantity: '100',
    active: 'false',
  },

  


  
};