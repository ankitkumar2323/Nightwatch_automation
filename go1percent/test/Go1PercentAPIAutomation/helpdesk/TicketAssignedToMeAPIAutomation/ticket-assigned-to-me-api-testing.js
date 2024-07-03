const { base } = require('mocha/lib/reporters');
const globals = require('../../../../globals')

describe('Ticket assigned to me API testing', function () {
  const baseUrl = "https://ticket-backend.qa.go1percent.com";
  const header = globals.admin.headers;
  const tokenHeaders = globals.admin.tokenHeaders;
  const tokenBody = globals.admin.tokenBody;

  // const token = process.argv[accessToken + 1];
  const commonExpectation = (startTimestamp, response) => {
    const endTimestamp = Date.now(); // Record the end time
    const responseTime = endTimestamp - startTimestamp; // Calculate response time in milliseconds
    console.log("time" + responseTime);
    expect(responseTime).to.be.below(2000); //Response time assertion

  }


  it('get api token', async function ({ supertest }) {
    await supertest
      .request("https://auth.go1percent.com/auth/realms/nashtech/protocol/openid-connect")
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

  it('should test update api', async function ({ supertest }) {
    const startTime = Date.now();
    const payloadData = {
      assignedTo: 'testemployee@nashtechglobal.com',
      category: 'Knolx',
      priority: 'High',
      status: 'Open',
      ticketID: 837,
    };
    //https://ticket-backend.qa.go1percent.com/tickets/update
    await supertest
      .request(baseUrl)
      .put("/tickets/update")
      .set(header)
      .send(payloadData) // Send the payload data
      .expect(200)      // Expect a status code of 200
      .expect('Content-Type', 'application/json')       // Expect a response with JSON content type

      .then(function (response) {
        expect(response.body).to.have.property("resource").and.to.be.eq("updateTicketDetails");
        expect(response.body).to.have.property("status").and.to.be.true;
        expect(response.body).to.have.property("data").and.to.be.eq("Ticket Updated Successfully!");
        expect(response.t)
        commonExpectation(startTime, response);
      });
  });


  it('should test ticket assigned to me', async function ({ supertest }) {
    const startTime = Date.now();
    const ticketId = 875;
    //https://ticket-backend.qa.go1percent.com/tickets/assigned/me?status=Open&limit=10&pageNumber=1
    const response = await supertest
      .request(baseUrl)
      .get("/tickets/assigned/me?status=Open&limit=10&pageNumber=1")
      .set(header)
      .expect(200)    // Expect a status code of 200
      .expect('Content-Type', 'application/json')     // Expect a response with JSON content type

      .then(function (response) {
        expect(response.body).to.have.property("resource").and.to.be.eq("getAssignedTickets");
        expect(response.body).to.have.property("status").and.to.be.true;
        commonExpectation(startTime, response);
      });

  });


  it('should test comments api', async function ({ supertest }) {
    const startTime = Date.now();
    const ticketId = 875;
    //https://ticket-backend.qa.go1percent.com/tickets/875/comments
    await supertest
      .request(baseUrl)
      .get("/tickets/875/comments")
      .set(header)
      .expect(200)      // Expect a status code of 200
      .expect('Content-Type', 'application/json')       // Expect a response with JSON content type
      .then(function (response) {
        expect(response.body).to.have.property("resource").and.to.be.eq("getComments");
        expect(response.body).to.have.property("status").and.to.be.true;
        commonExpectation(startTime, response);
      });
  });


  it('should test ticket 875 api', async function ({ supertest }) {
    const startTime = Date.now();
    //https://ticket-backend.qa.go1percent.com/tickets/ticket/875
    await supertest
      .request(baseUrl)
      .get("/tickets/ticket/875")
      .set(header)
      .expect(200)      // Expect a status code of 200
      .expect('Content-Type', 'application/json')       // Expect a response with JSON content type
      .then(function (response) {
        expect(response.body).to.have.property("resource").and.to.be.eq("getTicketDetails");
        expect(response.body).to.have.property("status").and.to.be.true;

        // Assert specific properties of the ticket, replace with actual data
        expect(response.body).to.have.property("data");
        const ticketData = response.body.data;
        expect(ticketData).to.have.property("userDetails");
        const userDetails = ticketData.userDetails;
        expect(userDetails).to.have.property("userName").and.to.be.eq("Testemployee");
        expect(userDetails).to.have.property("userEmail").and.to.be.eq("testemployee@nashtechglobal.com");
        // Add more assertions for userDetails as needed

        expect(ticketData).to.have.property("ticketDetails");
        const ticketDetails = ticketData.ticketDetails;
        expect(ticketDetails).to.have.property("ticketID").and.to.be.eq(875);
        expect(ticketDetails).to.have.property("title").and.to.be.eq("Test001");
        commonExpectation(startTime, response);
      });
  });


  it('should test assignees API', async function ({ supertest }) {
    const startTime = Date.now();
    //https://ticket-backend.qa.go1percent.com/users/assignees
    await supertest
      .request(baseUrl)
      .get("/users/assignees")
      .set(header)
      .expect(200)      // Expect a status code of 200
      .expect('Content-Type', 'application/json')       // Expect a response with JSON content type
      .then(function (response) {
        expect(response.body).to.have.property("resource").and.to.be.eq("users/assignees");
        expect(response.body).to.have.property("status").and.to.be.true;
        commonExpectation(startTime, response);

      });
  });


  it('should test categories API', async function ({ supertest }) {
    const startTime = Date.now();
    //https://ticket-backend.qa.go1percent.com/tickets/categories
    await supertest
      .request(baseUrl)
      .get("/tickets/categories")
      .set(header)
      .expect(200)    // Expect a status code of 200
      .expect('Content-Type', 'application/json')   // Expect a response with JSON content type
      .then(function (response) {
        expect(response.body).to.have.property("resource").and.to.be.eq("getCategories");
        expect(response.body).to.have.property("status").and.to.be.true;
        commonExpectation(startTime, response);
        expect(response.body).to.have.property("data");
      });

  });

});