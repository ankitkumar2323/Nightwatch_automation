const globals = require('../../../globals')

describe('Leaderboard-Rewards API Testing', function () {
  const header = globals.admin.headers;
  const tokenHeaders = globals.admin.tokenHeaders;
  const tokenBody = globals.admin.tokenBody;
  const urls = globals.urls;

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

  it('Should get all rewards', async function ({ supertest }) {
    const startTime = Date.now();
     await supertest
 
        .request(globals.baseurl)
        .get("/rewards/getAllRewards")
        .set(header)
        .expect(200)
        .expect('Content-Type', 'application/json')  // Expect a response with JSON content type

        .then(function(response){

          //The test then checks the response body for the presence of specific properties such as "name," "pointsNeededToRedeem," "description," "rewardType," 
         //"quantity," "expiryDate and" "active ."

            expect(Object.keys(response.body).length).to.be.greaterThan(0);
            expect(response.body.data).length.to.be.greaterThan(0);
            
            expect(response.body.data[1]).to.have.property("id");
            expect(response.body.data[1]).to.have.property('name');
            expect(response.body.data[1]).to.have.property('pointsNeededToRedeem');
            expect(response.body.data[1]).to.have.property('description');
            expect(response.body.data[1]).to.have.property('rewardType');
            expect(response.body.data[1]).to.have.property('quantity');
            expect(response.body.data[1]).to.have.property('expiryDate');
            expect(response.body.data[1]).to.have.property('active');

            commonExpectation(startTime, response);// expect for checking the response time

        });

    });

    it('Should give message on redeeming reward', async function ({ supertest }) {
       const startTime = Date.now();
       await supertest
   
          .request(globals.baseurl)
          .post("/rewards/redeemRewards")
          .send({
              "rewardId":287,"quantity":1
          })
          .set(header)
          .expect(200)
          .expect('Content-Type', 'application/json')  // Expect a response with JSON content type
  
          .then(function(response){
              expect(response.body.errors[0].message).to.be.equal('No more quantity');

              commonExpectation(startTime, response);// expect for checking the response time
  
          });
  
      });

      it('Should display update rewards page with particular reward', async function ({ supertest }) {
         const startTime = Date.now();
         await supertest
     
            .request(globals.baseurl)
            .get("/rewards/getReward?rewardId=287")
            .set(header)
            .expect(200)
            .expect('Content-Type', 'application/json')  // Expect a response with JSON content type
    
            .then(function(response){
             
              expect(response.body.data).to.have.property("id").and.to.be.eq(287);
              expect(response.body.data).to.have.property('name').and.to.be.eq('Eardopes');
              expect(response.body.data).to.have.property('pointsNeededToRedeem').and.to.be.eq(1);
              expect(response.body.data).to.have.property('description').and.to.be.eq('eardopes demo description for testing purpose');
              expect(response.body.data).to.have.property('rewardType').and.to.be.eq('Individual');
              expect(response.body.data).to.have.property('quantity').and.to.be.eq(0);
              expect(response.body.data).to.have.property('expiryDate').and.to.be.eq('2025-08-08T00:00:00.0');
              expect(response.body.data).to.have.property('active').and.to.be.eq(false);

              commonExpectation(startTime, response);// expect for checking the response time
  
            });

        });

});
