
import { NightwatchBrowser } from 'nightwatch';
import supertest, { SuperTest, Test } from 'supertest';
import { expect } from 'chai';

const backendUrl: string = "https://ticket-backend.qa.go1percent.com";

let headers: Record<string, string>;

const getAuthToken = async (): Promise<string> => {
  try {
    const authResponse = await supertest('https://auth.go1percent.com')
      .post('/auth/realms/nashtech/protocol/openid-connect/token')
      .set('accept', '*/*')
      .set('source', 'https://nashtechglobal.qa.go1percent.com')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        client_id: 'leaderboard-ui',
        client_secret: '8090ed15-4cd1-483c-9fee-2a8b35941852',
        username: 'testadmin',
        password: 'testadmin',
        grant_type: 'password',
      });

    return authResponse.body.access_token;
  } catch (error) {
    // Handle error if needed
    console.error('Error in getAuthToken:', error);
    throw error; // Rethrow the error to indicate a failure
  }
};

// Declare global variables
let getTicketID: any, getStatus: any, getAssignedTo: any, getCategory: any, getPriority: any, dataFromResponse1: any;
let startTimestamp: number = Date.now();

const getRandomNumber = (): number => {
  // Generate a random number between 1 and 50
  const randomNumber: number = Math.floor(Math.random() * 50) + 1;

  // Log the generated number
  console.log(`Generated Random Number: ${randomNumber}`);

  return randomNumber;
};

before(async () => {
  try {
    const token: string = await getAuthToken();
    console.log('Authentication Token:', token);

    // Set headers globally
    headers = {
      'authorization': `Bearer ${token}`,
      "source": "https://nashtechglobal.qa.go1percent.com",
    };
  } catch (error) {
    // Handle error if needed
    console.error('Error in before hook:', error);
    throw error; // Rethrow the error to indicate a failure
  }
});

const assertResponseTime = (startTime: number): void => {
  const endTime: number = Date.now();
  const responseTime: number = endTime - startTime;
  expect(responseTime).to.be.below(10000);
};

describe('api testing', function () {
  it('Verify the total open Tickets', async function (): Promise<void> {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/summary")
      .set(headers);

    expect(response.status).to.equal(200);
    expect(response.headers['content-type']).to.match(/json/);
    expect(Object.keys(response.body).length).to.be.greaterThan(0);
    expect(response.body.data).to.have.property('open');
    expect(response.body.data.open).to.be.a("number");
    expect(response.body.data.open).to.not.be.null;
    console.log(response.body)
    assertResponseTime(startTimestamp);
  });


  it('Verify that the total unassigned Tickets', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/summary")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body.data).to.have.property('unassigned');
        expect(response.body.data.unassigned).to.be.a("number");
        expect(response.body.data.unassigned).to.not.be.null;
        console.log(response.body)
        assertResponseTime(startTimestamp);
      });
  });
  it(' Verify that the total closed Tickets', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/summary")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body.data).to.have.property('closed');
        expect(response.body.data.closed).to.be.a("number");
        expect(response.body.data.closed).to.not.be.null;
        assertResponseTime(startTimestamp);
      });
  });

  it('Verify that the total overdue Tickets', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/summary")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body.data).to.have.property('overdue');
        expect(response.body.data.overdue).to.be.a("number");
        expect(response.body.data.overdue).to.not.be.null;
        assertResponseTime(startTimestamp);
      });
  });

  it('Verify that the number of items per page dropdown is working for limit=20 - Open Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Open&limit=20&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 20, `Expected data count: 20, Actual data count: ${dataCount}`);
        assertResponseTime(startTimestamp);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=15 - Open Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Open&limit=15&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 15, `Expected data count: 15, Actual data count: ${dataCount}`);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=10 - Open Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Open&limit=10&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 10, `Expected data count: 10, Actual data count: ${dataCount}`);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=20 - Closed Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Closed&limit=20&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 20, `Expected data count: 20, Actual data count: ${dataCount}`);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=15 - Closed Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Closed&limit=15&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 15, `Expected data count: 15, Actual data count: ${dataCount}`);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=10 - Closed Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Closed&limit=10&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 10, `Expected data count: 10, Actual data count: ${dataCount}`);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=20 - Overdue Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Overdue&limit=20&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 20, `Expected data count: 20, Actual data count: ${dataCount}`);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=15 - Overdue Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Overdue&limit=15&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 15, `Expected data count: 15, Actual data count: ${dataCount}`);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=10 - Overdue Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Overdue&limit=10&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 10, `Expected data count: 10, Actual data count: ${dataCount}`);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=20 - Unassigned Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Unassigned&limit=20&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 20, `Expected data count: 20, Actual data count: ${dataCount}`);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=15 - Unassigned Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Unassigned&limit=15&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 15, `Expected data count: 15, Actual data count: ${dataCount}`);
      });
  });
  it('Verify that the number of items per page dropdown is working for limit=10 - Unassigned Ticket', async (): Promise<void> => {
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Unassigned&limit=10&pageNumber=1")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 10, `Expected data count: 10, Actual data count: ${dataCount}`);
      });
  });
  it('Verify the functionality of next and previous buttons on pagination - Open Ticket', async (): Promise<void> => {
    const randomNum = getRandomNumber();
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Open&limit=10&pageNumber=" + randomNum)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        expect(response.body.count).to.be.a("number");
        expect(response.body.count).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 10, `Expected data count: 10, Actual data count: ${dataCount}`);
      });
  });
  it('Verify the functionality of next and previous buttons on pagination - - Unassigned Ticket', async (): Promise<void> => {
    const randomNum = getRandomNumber();
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Unassigned&limit=10&pageNumber=" + randomNum)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        expect(response.body.count).to.be.a("number");
        expect(response.body.count).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;

        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 10, `Expected data count: 10, Actual data count: ${dataCount}`);
      });
  });
  it('Verify the functionality of next and previous buttons on pagination -  Overdue Ticket', async (): Promise<void> => {
    const randomNum = getRandomNumber();
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Overdue&limit=10&pageNumber=" + randomNum)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        expect(response.body.count).to.be.a("number");
        expect(response.body.count).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;

        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 10, `Expected data count: 10, Actual data count: ${dataCount}`);
      });
  });
  it('Verify the functionality of next and previous buttons on pagination - Closed Ticket', async (): Promise<void> => {
    const randomNum = getRandomNumber();
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .get("/tickets/getDetails?status=Closed&limit=10&pageNumber=" + randomNum)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.a("Array");
        expect(response.body.data).to.not.be.null;
        expect(response.body.count).to.be.a("number");
        expect(response.body.count).to.not.be.null;
        assertResponseTime(startTimestamp);

        const dataCount = response.body.data.length;
        // Assert the total count of the 'data' array
        browser.assert.equal(dataCount, 10, `Expected data count: 10, Actual data count: ${dataCount}`);
      });
  });
  it('Admin updates details of reopened ticket', async (): Promise<void> => {
    // First request--Get Tiket detils 
    const response1 = await supertest
      .agent(backendUrl)
      .get("/tickets/getDetails?status=Open&limit=10&pageNumber=1")
      .set(headers)
      .expect(200);
    // Extract information from the response of the first request
    dataFromResponse1 = response1.body.data;
    getTicketID = response1.body.data[0].ticketID;
    getStatus = response1.body.data[0].status.name;
    getAssignedTo = response1.body.data[0].assignedTo[0].email;
    getCategory = response1.body.data[0].category.name;
    getPriority = response1.body.data[0].priorityType.name;

    // Second request

    const requestedData = {
      ticketID: getTicketID,
      status: getStatus,
      assignedTo: getAssignedTo,
      category: getCategory,
      priority: getPriority,
    };


    const agent = supertest.agent(backendUrl);
    const response = await agent
      .put("/tickets/update")
      .set(headers)
      .send(requestedData)
      .expect(200)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        console.log('API Response:', response.body);
        // Assert the response body
        expect(response.body.resource).to.equal("updateTicketDetails");
        expect(response.body.status).to.equal(true);
        expect(response.body.data).to.equal("Ticket Updated Successfully!");
        assertResponseTime(startTimestamp);

      })
    return getTicketID;
  })
  it('Admin adds a message to reopened ticket', async (): Promise<void> => {

    const requestedData = {
      ticketId: getTicketID,
      note: 'test2222'
    };
    const requested = {
      fileData: '../go1percentTS/src/helpers/Go1PercentAPIAutomation/AdminHelpdesk/test_Image/test.png', // Use an empty string for an empty field
    };
    const agent = supertest.agent(backendUrl); // Use supertest.agent to make requests
    const response = await agent
      .post("/tickets/ticket/comment")
      .set(headers)
      .field('ticketId', requestedData.ticketId)
      .field('note', requestedData.note)
      .attach('fileData', requested.fileData)
      .expect(200)
      .timeout(8000)
      .then(function (response) {
        expect(Object.keys(response.body).length).to.be.greaterThan(0);
        console.log(response.body)
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('comment');
        expect(response.body.data.comment.note).to.equal(requestedData.note);
        assertResponseTime(startTimestamp);

      })
  });
});

