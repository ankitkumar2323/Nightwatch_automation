const globals = require('../../../globals')
const testData = require('../../../helpers/Go1PercentFEAutomation/LeaderboardRewards/testData.js');

describe('Leaderboard : Reedemed Rewards API Testing', function () {
  const header = globals.admin.headers;
  const tokenHeaders = globals.admin.tokenHeaders;
  const tokenBody = globals.admin.tokenBody;
  const urls = globals.urls;
  const IndividualRewardType = "Individual";
  const StudioRewardType = "Studio";
  const startDate = "2023-10-23";
  const endDate = "2023-10-24";
  const processingStatus = "Processing";
  const processedStatus = "Processed";
  const pageNumber = 1;
  const limit = 10;
  const properties = testData.redeemedRewardProperties;
  let processingRecord;

  const commonExpectation = (startTimestamp, response) => {
    const endTimestamp = Date.now(); // Record the end time
    const responseTime = endTimestamp - startTimestamp; // Calculate response time in milliseconds
    expect(responseTime).to.be.below(5000); //Response time assertion 
  }

  it('get api token', async function ({ supertest }) {
    await supertest
      .request(urls.token)
      .post("/token")
      .send(tokenBody)
      .set(tokenHeaders)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        const token = response._body.access_token;
        header['Authorization'] = 'Bearer ' + token;
      });
  });

   /**
   * GET all info about rewards redeemed by individuals
   */
  it('Should get the list of employee with their reward details(limiting the results to 10 items per page)', async function ({ supertest }) {
    const startTime = Date.now();
    await supertest
      .request(globals.baseurl)
      .get(`${globals.Redeemed_Reward.GetEndPoints}?rewardType=${IndividualRewardType}&pageNumber=${pageNumber}&limit=${limit}`)
      .set(header)
      .expect(200)
      .expect('Content-Type', 'application/json')

      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.lessThanOrEqual(limit);

        //checks the response body for the presence of specific properties such as "name,"
        //"pointsNeededToRedeem," "description," "rewardType," "quantity," "expiryDate and" "active ."

        for (let index = 0; index < response.body.data.length; index++) {
          const reward = response.body.data[index];

          properties.forEach((property) => {
            expect(reward).to.have.property(property);
          });

          expect(reward.rewardType).to.be.equal(IndividualRewardType);
        }

        commonExpectation(startTime, response);
      });
  });



  /**
   * GET the list of rewards redeemed by studio
   */
  it('Should get the list of rewards redeemed by studio', async function ({ supertest }) {
    const startTime = Date.now();
    
    await supertest
      .request(globals.baseurl) 
      .get(`${globals.Redeemed_Reward.GetEndPoints}?rewardType=${StudioRewardType}&pageNumber=${pageNumber}&limit=${limit}`)
      .set(header) 
      .expect(200)
      .expect('Content-Type', 'application/json')  // Expect a response with JSON content type

      .then(function(response){

        expect(Object.keys(response.body).length).to.be.lessThanOrEqual(limit);

        for(let index  = 0; index  < response.body.data.length; index++){
          const reward = response.body.data[index];

          properties.forEach((property) => {
            expect(reward).to.have.property(property);
          });

          //check if the reward type is studio
          expect(reward.rewardType).to.be.equal(StudioRewardType);
        }

        commonExpectation(startTime, response);// expect for checking the response time

      });

  });


  /**
   * GET the redeemed rewards info in the given time filter
   */
  it('Should get the list of information of redeemed rewards within a given time filter', async function ({ supertest }) {
    const startTime = Date.now();
    const rewardType = "Individual";
    await supertest
      .request(globals.baseurl)
      .get(`${globals.Redeemed_Reward.GetEndPoints}?startDate=${startDate}&endDate=${endDate}&pageNumber=${pageNumber}&limit=${limit}&rewardType=${rewardType}`)
      .set(header) 
      .expect(200)
      .expect('Content-Type', 'application/json')  // Expect a response with JSON content type

      .then(function(response){

        //checks if the response length is in the range 0 and 10
        expect(Object.keys(response.body).length).to.be.lessThanOrEqual(limit);

       //checks the response body for the presence of specific properties such as "name,"
       // "pointsNeededToRedeem," "description," "rewardType," "quantity," "expiryDate and" "active ."

        for(let index  = 0; index  < response.body.data.length; index++){
          const reward = response.body.data[index];

          properties.forEach((property) => {
            expect(reward).to.have.property(property);
          });

          // Check if redeemDate of first item in the list  lies in the range
          const redeemDate = new Date(reward.redeemDate);
          const startRange = new Date(startDate);
          const endRange = new Date(endDate);

          expect(redeemDate).to.be.at.least(startRange);
          expect(redeemDate).to.be.at.most(endRange);
        }
        commonExpectation(startTime, response);// expect for checking the response time

      });

  });

  /**
   * Retrieves details of the reward with processing status.
   * @param {Object} options.supertest - Supertest instance for making HTTP requests.
   * @param {string} options.rewardType - Type of reward to retrieve.
   * @returns {Promise<void>} - A Promise that resolves when the request is complete.
   */
  async function getProcessingReward({ supertest, rewardType }) {
    const startTime = Date.now();

    await supertest
      .request(globals.baseurl)
      .get(`${globals.Redeemed_Reward.GetEndPoints}?rewardType=${rewardType}&pageNumber=${pageNumber}&limit=${limit}`)
      .set(header)
      .expect(200)
      .expect('Content-Type', 'application/json')
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.lessThanOrEqual();

        for (let index = 0; index < response.body.data.length; index++) {
          const reward = response.body.data[index];

          if (reward.processingStatus === processingStatus) {
            processingRecord = reward;
            break;
          }
        }
        commonExpectation(startTime, response);
      });
  }

  /**
   * PUT the redeemed rewards (removes or mark them processed)
   */
  it('Should update the redeemed reward to processed', async function ({ supertest }) {
    const startTime = Date.now();

    //get details of the reward whose status is processing
    await getProcessingReward({ supertest, rewardType: IndividualRewardType });

    //If no processing record is found, the update will be skipped.
    if (!processingRecord) {
      console.log("No reward available to process.");
      return;
    }

    await supertest
        .request(globals.baseurl)
        .put(globals.Redeemed_Reward.PutEndPoints)
        .send({"rewardId":processingRecord.rewardId, 
              "rewardType":processingRecord.rewardType, 
              "status":processedStatus, 
              "redeemId":processingRecord.redeemId})
        .expect(200)
        .then(function (response) {
          //Assert the response body
          expect('Content-Type', /json/)
          expect(response.body.status).to.be.equal(true)
          expect(response.body.resource).to.equal("updateReward");
          expect(response.body.data).to.be.equal("RedeemReward Update Successfully")     
          commonExpectation(startTime, response);
    });
  });

});