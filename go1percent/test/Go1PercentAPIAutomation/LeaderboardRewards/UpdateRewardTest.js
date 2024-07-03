const globals = require('../../../globals')
const testData = require('../../../helpers/Go1PercentFEAutomation/LeaderboardRewards/testData.js');


describe('Leaderboard : Rewards API Testing', function () {
  const header = globals.admin.headers;
  const tokenHeaders = globals.admin.tokenHeaders;
  const tokenBody = globals.admin.tokenBody;
  const urls = globals.urls;
  const rewardId = "286";
  const properties = testData.updateRewardProperties;
  let rewardDetails;

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
   * GET all rewards
   * */
  it('Should get all rewards both for competency and individual', async function ({ supertest }) {
    const startTime = Date.now();
     await supertest
        .request(globals.baseurl)
        .get(globals.Reward.GetEndPoints[0])
        .set(header)
        .expect(200)
        .expect('Content-Type', 'application/json')  
        .then(function(response){

          //checks the response body for the presence of specific properties such as "name,"
          //"pointsNeededToRedeem," "description," "rewardType," "quantity," "expiryDate and" "active ."
          for(let index  = 0; index  < response.body.data.length; index++){
            const reward = response.body.data[index];

            for (const property in properties) {
              expect(reward).to.have.property(property);
            }
          }
          commonExpectation(startTime, response);// expect for checking the response time

        });
  });

  /**
   * GET a particular reward with id
   */
  it('Should display update rewards page for a particular reward', async function ({ supertest }) {
    const startTime = Date.now();
    await supertest
      .request(globals.baseurl)
      .get(`${globals.Reward.GetEndPoints[1]}?rewardId=${rewardId}`)
      .set(header)
      .expect(200)
      .expect('Content-Type', 'application/json') 

      .then(function(response){

        const reward = response.body.data;

        for (const property in properties) {
          expect(reward).to.have.property(property).to.equal(properties[property]);
        }

        commonExpectation(startTime, response);// expect for checking the response time
      });
  });


  /**
   * POST the new reward with details
   */
  it('Should post the new reward', async function ({ supertest }) {
    const startTime = Date.now();

    await supertest
      .request(globals.baseurl)
      .post(globals.Reward.PostEndPoints)
      .set(header)
      .field('expiryDate', testData.newReward.expiryDate)
      .field('name', testData.newReward.rewardName)
      .field('description', testData.newReward.description)
      .field('rewardType', testData.newReward.rewardType)
      .field('pointsNeededToRedeem', testData.newReward.pointsNeededToRedeem)
      .field('quantity', testData.newReward.quantity)
      .field('active', testData.newReward.active)
      .attach('imageFile', testData.newReward.imagePath)
      .expect(200)

      .then(function(response){
        //Assert the response body
        expect('Content-Type', /json/)
        expect(response.body.status).to.be.equal(true)
        expect(response.body.resource).to.equal("rewards");
        expect(response.body.data).to.be.equal("Successfully added reward!")     
        commonExpectation(startTime, response);
      });
  });  


  async function getRewardDetails({ supertest }) {
    const startTime = Date.now();
    await supertest
      .request(globals.baseurl)
      .get(`${globals.Reward.GetEndPoints[1]}?rewardId=${rewardId}`)
      .set(header)
      .expect(200)
      .expect('Content-Type', 'application/json') 

      .then(function(response){
        rewardDetails = response.body.data;
        commonExpectation(startTime, response);
      });
  }

  /**
   * updates(edit or delete) the rewards and returns the updated list
   */
  it('Should update a particular reward', async function ({ supertest }) {
    const startTime = Date.now();

    //get details of the reward whose status is processing
    await getRewardDetails({ supertest});

    //If no processing record is found, the update will be skipped.
    if (!rewardDetails) {
      console.log(`No redeem reward found with id = ${rewardId}`);
      return;
    }

    await supertest
      .request(globals.baseurl)
      .put(globals.Reward.PutEndPoints)
      .set(header)

      //send other field as it is
      .field('id', rewardDetails.id)
      .field('name', rewardDetails.name)
      .field('expiryDate', rewardDetails.expiryDate)
      .field('description', rewardDetails.description)  
      .field('pointsNeededToRedeem', rewardDetails.pointsNeededToRedeem)
      .field('quantity', rewardDetails.quantity)
      .field('active', rewardDetails.active)

      //chnage image of reward
      .attach('imageFile', testData.newReward.imagePath)
      .expect(200)

      .then(function(response){
        //Assert the response body
        expect('Content-Type', /json/)
        expect(response.body.status).to.be.equal(true)
        expect(response.body.resource).to.equal("rewards");
        expect(response.body.data).to.be.equal("Reward was successfully updated!")     
        commonExpectation(startTime, response);
      });
  });  


  


});