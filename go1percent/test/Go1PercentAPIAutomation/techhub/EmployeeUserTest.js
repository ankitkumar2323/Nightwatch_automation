const header = require('../../../globals')
const payload= require('../../../helpers/Go1PercentFEAutomation/techhub/EmployeeUser/payload')

describe('TechHub Api Testing', function () {

  const urls = header.techhubUrls;
  let approval_req = [];
  
  const commonExpectation = (startTimestamp, response) => {
    const endTimestamp = Date.now(); // Record the end time
    const responseTime = endTimestamp - startTimestamp; // Calculate response time in milliseconds
    expect(responseTime).to.be.below(10000); //Response time assertion 
    expect(response._body.status).to.be.equal('success'); //Response attribute assertion
  }

  /**
    * Generates a dynamic bearer token for API authentication.
    *
    * @param {string} username - The username for authentication.
    * @param {string} password - The password for authentication.
    * @returns {string} accessToken - The dynamically generated bearer token.
    */
  it('token generation', async function ({ supertest }) {
    const tokenURl = "https://auth.go1percent.com";
    const requestData = {
      'client_id': 'leaderboard-ui',
      'client_secret': '8090ed15-4cd1-483c-9fee-2a8b35941852',
      'username': 'testemployee',
      'password': 'testemployee',
      'grant_type': 'password'
    }
    const headers = {
      'accept': '*/*',
      'source': 'https://nashtechglobal.qa.go1percent.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const response = await supertest
      .request(tokenURl)
      .post('/auth/realms/nashtech/protocol/openid-connect/token')
      .set(header.admin.tokenHeaders)
      .send(requestData)
      .expect(200)
      .then(function (response) {
        const token = response._body.access_token;
        header.employee.headers['Authorization'] = 'Bearer ' + token;
      });

  })

  // Performs a GET request to test the 'All TechHub' API of a TechHub Module.
  it('Get API test for All TechHubs Button in TechHub', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .get("/templates/my?state=approvedAndRejected&limit=10000&page=1")
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
        approval_req = response.body.data.templates        //Response body template list
      });
  });

  //Get Request for Search Template
  it('should verify the search template endpoint', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .get("/search/template?text=tags&page=2")
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  //  get Request to retrieve the Template
  it('should retrieve a specific template', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .get("/template?tempId=" + approval_req[0]._id)
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  // Get Request For retrieve trending tags
  it('should retrieve trending tags', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .get("/trending/tags")
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  // Get Request for retrieving Recent Templates
  it('should retrieve recent templates', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .get("/recent/templates?count=Two")
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  // Get Request for retrieve Trending Templates
  it('should retrieve trending templates', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .get("/trending/templates")
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  // Performs a GET request to test the 'Pending' API of a TechHub Module.
  it('Get API test for Pending Button in TechHub', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .get("/templates/my?state=draftAndReview&limit=10000&page=1")
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  //Performs a GET request to test the 'Other Technologies' API of a TechHub Module.
  it('Get API for other Technologies in TechHub', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .get("/other/technologies?id=101")
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  //Performs a GET request to test the 'Trending Technology' API of a TechHub Module.
  it('Get API to Get Trending Technology', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .get("/trending/technologies")
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', 'application/json')
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  }); 

  //Performs a GET request to test the 'All templates' API of a TechHub Module.
  it('Get API To Get All templates of TechHub', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .get("/templates?technology=Java&category=Kafka&page=1")
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', 'application/json')
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  
  //Performs a POST request to test the 'New Repo Branch Submission' API of a TechHub Module.
  it('New Repo Branch Submission', async function ({ supertest }) {
    const startTimestamp = Date.now();
    const uniqueName = `TestingNightwatchTestcase1-${Math.floor(Math.random() * 1000000)}`;
    await supertest
      .request(urls.go1percentBase)
      .post("/user/request")
      .send({
        "name": uniqueName,
        "description": "gfdrtfyguhijoihubhgvfctvghbjnbhvgyfcvghbjnbgvcftvgbhjnhbygvfctvghbjnbgvftcgvhbjgvfcgvycftxdrctfygvhbjbgcftxdrfcgvhbjnbgfcx",
        "technology": "angular",
        "branch": false
      })
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  //Post Request for Inserting technology with unique Id
  it('Insert technology successfully', async function ({ supertest }) {
    const startTimestamp = Date.now();
    const uniqueId = `TestingNightwatchTestcase1-${Math.floor(Math.random() * 1000000)}`;
    await supertest
      .request(urls.go1percentBase)
      .post("/insert/technology")
      .send(payload.insertPayload)
      .set(header.employee.headers)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  })

  // Post Request for updating Technology
  it('update technology successfully', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .post("/update/technology")
      .send(payload.updatePayload)
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  // Post Request for submit user feedback
  it('Submit user feedback', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .post("/submit/feedback")
      .send({
        "_id": "string",
        "emailId": "string",
        "message": "string",
        "ratings": 0,
        "formType": "string"
      })
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  });

  //  Post Request for Draft Repo or Branch Submission
  it('should submit a draft repository or branch', async function ({ supertest }) {
    const startTimestamp = Date.now();
    await supertest
      .request(urls.go1percentBase)
      .post("/user/submit")
      .send(payload.draftRepoPayload)
      .set(header.employee.headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        commonExpectation(startTimestamp, response);
      });
  }) 
})