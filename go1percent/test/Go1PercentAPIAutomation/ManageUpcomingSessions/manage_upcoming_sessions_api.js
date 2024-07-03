// Import necessary modules
const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const headers = require('../globals')

describe('Manage upcoming sessions', function () {

    const commonExpectation = (startTimestamp, response) => {
        const endTimestamp = Date.now(); // Record the end time
        const responseTime = endTimestamp - startTimestamp; // Calculate response time in milliseconds
        expect(responseTime).to.be.below(2000); // Response time assertion
    };

    it(' verify that admin should able to update the description', async function () {
        const startTimestamp = Date.now();
        // Sending a PUT request to update the session description
        const response = await supertest(headers.base_url)
            .put('/v02/sessions/manage/update/653113198555d37c0a4f8d97')
            .set('source', headers.source)
            .set('Authorization', headers.access_token)
            .send(headers.dataToUpdate.sessionDescription);
        
        // Expecting a successful response with status code 200
        expect(response.status).to.equal(200);
        // Call the commonExpectation function
        commonExpectation(startTimestamp, response);
        // response status should not be empty
        expect(response.body.status).to.greaterThan(0);
        // Expect the 'Content-Type' header to be of type JSON
        expect(response.headers['content-type']).to.include('application/json');
    });

    it('verify that Admin should be able to change & update the feedback form', async function () {
        const startTimestamp = Date.now();
        // Sending a PUT request to update data
        const response = await supertest(headers.base_url)
            .put('/v02/sessions/manage/update/653113198555d37c0a4f8d97')
            .set('source', headers.source)
            .set('Authorization', headers.access_token)
            .send(headers.dataToUpdate.feedbackFormName);

        // Expecting a successful response with status code 200
        expect(response.status).to.equal(200);
        // Call the commonExpectation function
        commonExpectation(startTimestamp, response);
        // response status should not be empty
        expect(response.body.status).to.greaterThan(0);
        // Expect the 'Content-Type' header to be of type JSON
        expect(response.headers['content-type']).to.include('application/json');
    });

    it('verify that admin should able to click on send instructions', async function () {
        const startTimestamp = Date.now();
        // Sending a POST request to update data
        const response = await supertest(headers.base_url)
            .post('/v02/sessions/manage/update/653113198555d37c0a4f8d97')
            .set('source', headers.source)
            .set('Authorization', headers.access_token)
        
        // Expecting a successful response with status code 200
        expect(response.status).to.equal(200);
        // Call the commonExpectation function
        commonExpectation(startTimestamp, response);
        // response status should not be empty
        expect(response.body.status).to.greaterThan(0);
        // Expect the 'Content-Type' header to be of type JSON
        expect(response.headers['content-type']).to.include('application/json');
    });

    it('verify that admin should able to report the session only if the approve button is enabled', async function () {
        const startTimestamp = Date.now();
        // Sending a PUT request to update data
        const response = await supertest(headers.base_url)
            .put('/v02/sessions/manage/update/653113198555d37c0a4f8d97')
            .set('source', headers.source)
            .set('Authorization', headers.access_token)
            .send(headers.dataToUpdate.remarks);
        
        // Expecting a successful response with status code 200
        expect(response.status).to.equal(200);
        // Call the commonExpectation function
        commonExpectation(startTimestamp, response);
        // response status should not be empty
        expect(response.body.status).to.greaterThan(0);
        // Expect the 'Content-Type' header to be of type JSON
        expect(response.headers['content-type']).to.include('application/json');
    });

    it('Verify that admin should able to update the slide URL', async function () {
        const startTimestamp = Date.now();
        // Send a PUT request to update the slide URL
        const response = await supertest(headers.base_url)
            .put('/v02/sessions/manage/update/653113198555d37c0a4f8d97')
            .set('source', headers.source)
            .set('Authorization', headers.access_token)
            .send(headers.dataToUpdate.slideURL);
        
        // Assert the response status code to be 200
        expect(response.status).to.equal(200);
        // Call the commonExpectation function
        commonExpectation(startTimestamp, response);
        // response status should not be empty
        expect(response.body.status).to.greaterThan(0);
        // Expect the 'Content-Type' header to be of type JSON
        expect(response.headers['content-type']).to.include('application/json');
    });

    it('verify that admin should able to add tags', async function () {
        const startTimestamp = Date.now();
        // Send a PUT request to update tags
        const response = await supertest(headers.base_url)
            .put('/v02/sessions/manage/update/653113198555d37c0a4f8d97')
            .set('source', headers.source)
            .set('Authorization', headers.access_token)
            .send(headers.dataToUpdate.sessionTag);

        // Check if the response status is 200
        expect(response.status).to.equal(200);
        // Call the commonExpectation function
        commonExpectation(startTimestamp, response);
        // response status should not be empty
        expect(response.body.status).to.greaterThan(0);
        // Expect the 'Content-Type' header to be of type JSON
        expect(response.headers['content-type']).to.include('application/json');
    });

    it('Verify that admin should able to update the title', async function () {
        const startTimestamp = Date.now();
        // Send a PUT request to update the title
        const response = await supertest(headers.base_url)
            .put('/v02/sessions/manage/update/6530c8088555d37c0a4f8d93')
            .set('source', headers.source)
            .set('Authorization', headers.access_token)
            .send(headers.dataToUpdate.topic);
        
        // Check if the response status is 200
        expect(response.status).to.equal(200);
        // Call the commonExpectation function
        commonExpectation(startTimestamp, response);
        // response status should not be empty
        expect(response.body.status).to.greaterThan(0);
        // Expect the 'Content-Type' header to be of type JSON
        expect(response.headers['content-type']).to.include('application/json');
    });

    it('Verify that admin should able to see the available upcoming sessions', async function() {
        const startTimestamp = Date.now();
        // Sending a GET request to retrieve data
        const response = await supertest(headers.base_url)
            .get('/v02/sessions/manage?pageNumber=1&pageSize=10&filter=upcoming&search=')
            .set('source', headers.source)
            .set('Authorization', headers.access_token)

        // Check if the response status is 200
        expect(response.status).to.equal(200);
        // Call the commonExpectation function
        commonExpectation(startTimestamp, response);
        // response status should not be empty
        expect(response.body.count).to.greaterThan(0);
        // Expect the 'Content-Type' header to be of type JSON
        expect(response.headers['content-type']).to.include('application/json');

    });

    it('verify that youtube URL should not be added or updated in the upcoming session', async function () {
        const startTimestamp = Date.now();
        // Send a PUT request to update yturl
        const response = await supertest(headers.base_url)
            .put('/v02/sessions/manage/update/653113198555d37c0a4f8d97')
            .set('source', headers.source)
            .set('Authorization', headers.access_token)
            .send(headers.dataToUpdate.youtubeURL);
        
        // Check if the response status is 200
        expect(response.status).to.equal(200);
        // Call the commonExpectation function
        commonExpectation(startTimestamp, response);
        // response status should not be empty
        expect(response.body.status).to.greaterThan(0);
        // Expect the 'Content-Type' header to be of type JSON
        expect(response.headers['content-type']).to.include('application/json');
        
    });

//assertions to verify the properties of the response body for the dataToUpdate
    it('should retrieve sessions', async function () {
        // Sending a GET request to retrieve sessions
        const response = await supertest(headers.base_url)
            .get('/v02/sessions/manage?pageNumber=1&pageSize=10&filter=upcoming&search=')
            .set('source', headers.base_url)
            .set('Authorization', headers.access_token);

        // Expecting the response body to have the property 'sessionTag'
        expect(response.body).to.have.property('sessionTag');
        expect(response.body.sessionDescription).to.equal("The error message indicates that the property 'topic' is not present in the response body, which is why the assertion is failing. This could be due to the structure of the response body or the way the API is handling the request. Please ensure that the API response structure matches the expected response format.");
        expect(response.body.feedbackFormName).to.equal("sdv");
        expect(response.body.sessionId).to.equal("653105778555d37c0a4f8d96");
        expect(response.body.remarks).to.equal("have not updated the sessions");
        expect(response.body.slideURL).to.equal("www.google.com");
        expect(response.body.sessionTag).to.equal("Python");
        expect(response.body.topic).to.equal("Updated Title");
        expect(response.body.youtubeURL).to.equal("https://www.youtube.com/watch?v=boz5BU1KdIw");
        // Expect the 'Content-Type' header to be of type JSON
        expect(response.headers['content-type']).to.include('application/json');
    });
});
