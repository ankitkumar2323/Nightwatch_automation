const header = require('../../../helpers/Leaderboard_summary/go1PercentLeaderboardSummary')

/**
 * Asserts the response time of an HTTP request.
 * @param {number} startTime - The start time of the request.
 * @param {number} maxTime - The maximum allowed response time in milliseconds.
 */
function assertResponseTime(startTime, maxTime) {
  const endTime = performance.now();
  const responseTime = endTime - startTime;
  expect(responseTime).to.be.at.most(maxTime);
}


describe('Leaderboard API Testing', function () {
  
  /**
    * Generates a dynamic bearer token for API authentication.
    *
    * @param {string} username - The username for authentication.
    * @param {string} password - The password for authentication.
    * @returns {string} accessToken - The dynamically generated bearer token.
    */

  it('token generation', async function ({ supertest }) {
    const tokenURl = "https://auth.go1percent.com";

    const headers = {
      'accept': '*/*',
      'source': 'https://nashtechglobal.qa.go1percent.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const response = await supertest
      .request(tokenURl)
      .post('/auth/realms/nashtech/protocol/openid-connect/token')
      .set(header.admin.tokenHeaders)
      .send(header.admin.requestData)
      .expect(200)
      .then(function (response) {
        const token = response._body.access_token;
        header.employee.headers['Authorization'] = 'Bearer ' + token;
      });

  })


  /**
   * Test case to retrieve Leading Practices Summary from API.
   * @param {Object} supertest - The supertest object for making HTTP requests.
   */
  it('should retrieve Leading Practices Summary', async function ({ supertest }) {
    const startTime = performance.now();
    const response = await supertest
      .request(header.admin.base_url)
      .get('/studios')
      .set(header.employee.headers)
      .expect(200) // Expect a successful response with HTTP status code 200
      .expect('Content-Type', /json/); // Expect the response to have JSON content type

    // Assert that the execution time is less than or equal to 1500 milliseconds.
    assertResponseTime(startTime, 1500);

    const responseBody = response.body;

    expect(responseBody.length).to.be.greaterThan(0);

    for (let indexOfResponse = 0; indexOfResponse < responseBody.length; indexOfResponse++) {
      const object = responseBody[indexOfResponse];

      // Check if 'imageFile' is present in the object
      if ('imageFile' in object) {
        expect(object).to.have.all.keys(
          'allTimeScore',
          'id',
          'imageFile',
          'memberAllTimeAvg',
          'memberAvg',
          'memberCount',
          'monthlyScore',
          'name',
          'studioHeadEmail',
          'studioHeadName',
          'studioType'
        );
        expect(object.imageFile).to.be.a('string');
      } else {
        // If 'imageFile' is not present, assert without it
        expect(object).to.have.all.keys(
          'allTimeScore',
          'id',
          'memberAllTimeAvg',
          'memberAvg',
          'memberCount',
          'monthlyScore',
          'name',
          'studioHeadEmail',
          'studioHeadName',
          'studioType'
        );
      }

      // Assert the types of each property's value
      expect(object.studioType).to.be.a('string');
      expect(object.name).to.be.a('string');
      expect(object.allTimeScore).to.be.a('number');
      expect(object.studioHeadEmail).to.be.a('string');
      expect(object.monthlyScore).to.be.a('number');
      expect(object.memberAvg).to.be.a('number');
      expect(object.memberAllTimeAvg).to.be.a('number');
      expect(object.monthlyScore).to.be.a('number');
      expect(object.memberAvg).to.be.a('number');
      expect(object.memberCount).to.be.a('number');
    }
  });


  /**
   * Test case to retrieve Leading Nasher data for all times.
   * @param {Object} supertest - The supertest object for making HTTP requests.
   */
  it('should retrieve Leading Nasher data for all times', async function ({ supertest }) {
    const startTime = performance.now();

    const response = await supertest
      .request(header.admin.base_url)
      .get('/summary?period=alltime')
      .set(header.employee.headers)
      .expect(200) // Expect a successful response with HTTP status code 200
      .expect('Content-Type', /json/); // Expect the response to have JSON content type

    // Assert that the execution time is less than or equal to 1500 milliseconds.
    assertResponseTime(startTime, 1500);

    // Assert that the response body has data
    expect(response.body.length).to.be.greaterThan(0);

    const responseBody = response.body;

    for (let indexOfResponse = 0; indexOfResponse < responseBody.length; indexOfResponse++) {
      const object = responseBody[indexOfResponse];

      // Check if the object has the expected keys
      expect(object).to.have.all.keys(
        'knolderId',
        'KnolderName',
        'profilePic',
        'studioName',
        'score',
        'rank'
      );

      // Assert the types of each property's value
      expect(object.knolderId).to.be.a('number');
      expect(object.KnolderName).to.be.a('string');
      expect(object.profilePic).to.be.a('string');
      expect(object.studioName).to.be.a('string');
      expect(object.score).to.be.a('number');
      expect(object.rank).to.be.a('number');
    }
  });


  /**
  * Test case to retrieve Leading Nasher data for all times.
  * @param {Object} supertest - The supertest object for making HTTP requests.
  */
  it('should retrieve Leading Nasher data monthly', async function ({ supertest }) {
    const startTime = performance.now();

    const response = await supertest
      .request(header.admin.base_url)
      .get('/summary?period=monthly')
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/); // Expect the response to have JSON content type


    // Assert that the execution time is less than or equal to 1500 milliseconds.
    assertResponseTime(startTime, 1500);

    // Assert that the response body has data
    expect(response.body.length).to.be.greaterThan(0);

    const responseBody = response.body;

    for (let indexOfResponse = 0; indexOfResponse < responseBody.length; indexOfResponse++) {
      const object = responseBody[indexOfResponse];

      // Check if the object has the expected keys
      expect(object).to.have.all.keys(
        'knolderId',
        'KnolderName',
        'profilePic',
        'studioName',
        'score',
        'rank'
      );

      // Assert the types of each property's value
      expect(object.knolderId).to.be.a('number');
      expect(object.KnolderName).to.be.a('string');
      expect(object.profilePic).to.be.a('string');
      expect(object.studioName).to.be.a('string');
      expect(object.score).to.be.a('number');
      expect(object.rank).to.be.a('number');
    }
  });


  /**
* Test case to retrieve monthly data for Leading Nasher users, including counts of Certifications,
* Online Courses, Meetups, Proposals, Process Docs, Techhub, Conferences, Research Papers,
* Books, Blogs, Knolx, Webinars, OS Contributions, and reputation.
* @param {Object} supertest - The supertest object for making HTTP requests.
*/
  it('should retrieve Leading Nasher data', async function ({ supertest }) {

    const startTime = performance.now();

    const response = await supertest
      .request(header.admin.base_url)
      .get('/reputation')
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/);


    // Assert that the execution time is less than or equal to 1500 milliseconds.
    assertResponseTime(startTime, 1500);

    // Check if the response contains "counts" and "reputation" properties
    expect(response.body).to.have.all.keys('counts', 'reputation');

    // Check the "counts" property
    const counts = response.body.counts;
    for (const key in counts) {
      expect(counts[key]).to.have.all.keys('monthly', 'allTime');
    }

    // Check the "reputation" property
    const reputation = response.body.reputation;
    for (const object of reputation) {
      expect(object).to.have.all.keys(
        'knolderId',
        'knolderName',
        'studioId',
        'studioName',
        'allTimeScore',
        'allTimeRank',
        'quarterlyStreak',
        'monthlyScore',
        'monthlyRank',
        'rewardPoints'
      );
    }
  });



  /**
 * Test case to retrieve  data for Leading Nasher users, including counts of Certifications,
 * Online Courses, Meetups, Proposals, Process Docs, Techhub, Conferences, Research Papers,
 * Books, Blogs, Knolx, Webinars, OS Contributions, and reputation in a perticular month .
 * @param {Object} supertest - The supertest object for making HTTP requests.
 */
  it('should retrieve Leading Nasher of specific month', async function ({ supertest }) {
    const startTime = performance.now();

    const response = await supertest
      .request(header.admin.base_url)
      .get('/reputation/666?month=October&year=2023')
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/);

    // Assert that the execution time is less than or equal to 1500 milliseconds.
    assertResponseTime(startTime, 1500);

    // Check if the response contains "counts" and "reputation" properties
    expect(response.body).to.have.all.keys(
      'knolderEmail',
      'knolderName',
      'score',
      'scoreBreakDown',
      'studioId',
      'studioName');
  });


  /**
   * Test case to retrieve all activities of a user's profile.
   * This test case makes a GET request to retrieve all activities of a specific user's profile.
   * @param {Object} supertest - The supertest object for making HTTP requests.
   */
  it('should retrieve user profile activities', async function ({ supertest }) {

    const startTime = performance.now();
    // Make a GET request to retrieve user profile activities
    const response = await supertest
      .request('https://feed-service.qa.go1percent.com/')
      .get('/knoldus-backend/rest/feed-service/feeds/userProfile/myActivity/0/testemployee@nashtechglobal.com')
      .expect(200) // Expect a successful response with HTTP status code 200
      .expect('Content-Type', /json/);

    const responseBody = response.body;

    // Assert that the execution time is less than or equal to 1500 milliseconds.
    assertResponseTime(startTime, 1500);

    for (let indexOfResponse = 0; indexOfResponse < responseBody.length; indexOfResponse++) {
      const object = responseBody[indexOfResponse];

      // Check if the object has the expected keys
      expect(object).to.have.all.keys(
        'feedType',
        'username',
        'likes',
        'dislike',
        'contributedBy',
        'contributionType',
        'description',
        'feedcomment',
        'title',
        'feedtime',
        'lapseTimeDifference'
      );

      // Assert the types of each property's value
      expect(object.feedType).to.be.a('string');
      expect(object.username).to.be.a('string');
      expect(object.contributedBy).to.be.a('string');
      expect(object.contributionType).to.be.a('string');
      expect(object.description).to.be.a('string');
      expect(object.feedcomment).to.satisfy(value => typeof value === 'string' || value === null);
      expect(object.title).to.be.a('string');
      expect(object.feedtime).to.be.a('number');
      expect(object.lapseTimeDifference).to.be.a('string');
    }
  });


  /**
   * Test case for handling the scenario when the profile picture is not found.
   * Sends a GET request to retrieve a user's profile picture and expects an error response.
   * @param {Object} supertest - The supertest object for making HTTP requests.
   */

  it('should handle profile picture not found', async function ({ supertest }) {

    // Record the start time before making the request
    const startTime = performance.now();

    const response = await supertest
      .request(header.admin.base_url)
      .get('/profile/getProfilePic?email=testemployee@nashtechglobal.com')
      .set(header.employee.headers)
      .expect('Content-Type', /json/) // Expect the specific content type
      .expect(200);
    // Record the end time after receiving the response

    const responseBody = response.body;

    // Assert that the execution time is less than or equal to 1500 milliseconds.
    assertResponseTime(startTime, 1500);

    expect(responseBody).to.have.keys('errors', 'resource', 'status');
    expect(responseBody.errors[0]).to.have.keys('id', 'message');

    expect(responseBody.resource).to.be.a('string');
    expect(responseBody.status).to.be.a('boolean');
  });


  /**
   * Verify that all rewards are retrieved successfully and have the expected format.
   * @param {Object} supertest - The supertest object for making HTTP requests.
   */

  it('should find all the rewords', async function ({ supertest }) {

    const startTime = performance.now();

    const response = await supertest
      .request(header.admin.base_url)
      .get('/rewards/getAllRewards')   // https://nashtechglobal.qa.go1percent.com/assets/i18n/en.json
      .set(header.employee.headers)
      .expect('Content-Type', /json/)
      .expect(200);


    const responseBody = response.body;

    // Assert that the execution time is less than or equal to 1500 milliseconds.
    assertResponseTime(startTime, 1500);

    for (let indexOfResponse = 0; indexOfResponse < responseBody.length; indexOfResponse++) {
      const object = responseBody[indexOfResponse];

      // Assert keys
      expect(object).to.have.all.keys(
        'id', 'imageFile', 'name', 'pointsNeededToRedeem', 'description', 'rewardType', 'quantity', 'expiryDate', 'active'
      );

      // Assert data types
      expect(object.id).to.be.a('number');
      expect(object.imageFile).to.be.a('string');
      expect(object.name).to.be.a('string');
      expect(object.pointsNeededToRedeem).to.be.a('number');
      expect(object.description).to.be.a('string');
      expect(object.rewardType).to.be.a('string');
      expect(object.quantity).to.be.a('number');
      expect(object.expiryDate).to.be.a('string');
      expect(object.active).to.be.a('boolean');


      // Assert specific values within the response body.
      expect(object.description).equal('For testing purpose.')
      expect(object.rewardType).equal('studio');
      expect(object.quantity).equal(100);
    }

  });

  /**
   * Verify the points in the points table for a specific user.
   * @param {Object} supertest - The supertest object for making HTTP requests.
   */

  it('verify the points in points table', async function ({ supertest }) {

    const startTime = performance.now();

    const response = await supertest
      .request(header.admin.base_url)
      .get('/reputation/666')
      .set(header.employee.headers)
      .expect('Content-Type', /json/) // Expect the specific content type
      .expect(200)

    const responseBody = response.body;

    // Assert that the execution time is less than or equal to 1500 milliseconds.
    assertResponseTime(startTime, 1500);

    // Assert that the response body contains specific keys.
    expect(responseBody).to.have.all.keys(
      'allTimeRank',
      'knolderEmail',
      'knolderName',
      'monthlyRank',
      'rewardPoints',
      'score',
      'scoreBreakDown',
      'studioId',
      'studioName')


    // Assert specific values within the response body.

    expect(responseBody.knolderName).to.includes('Test Employee');
    expect(responseBody.knolderEmail).to.equal('testemployee@nashtechglobal.com');
    expect(responseBody.monthlyRank).to.equal(1);
    expect(responseBody.studioName).to.be.a('string');
  });

});
