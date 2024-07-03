const globals = require('../../../../globals')

describe('Review Contribution API Testing', function () {

    /**
     * Asserts the response time and status in a Nightwatch program.
     *
     * @param {number} startTimestamp - The start timestamp when the request was made.
     * @param {object} response - The response object to be checked.
     */

    const assertResponseTime = (startTimestamp, response) => {

        const endTimestamp = Date.now();

        const responseTime = endTimestamp - startTimestamp;

        expect(responseTime).to.be.below(10000);

        expect(response.body.status).to.be.oneOf([true, false]);

    }

    const header = globals.admin.headers;
    const tokenHeaders = globals.admin.tokenHeaders;
    const tokenBody = globals.admin.tokenBody;
    const urls = globals.techhubUrls;

    // Making a POST request to obtain the API token

    it('get api token', async function ({ supertest }) {
        await supertest
            .request(urls.token)
            .post("/token")
            .send(tokenBody)
            .set(tokenHeaders)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                // Extracting the access token from the response body
                const token = response._body.access_token;
                header['Authorization'] = 'Bearer ' + token;
            });
    });

    /**
     * Test case to retrieve all the pending contributions for approval or rejection on Approvals page.
     * @param {object} supertest - The supertest object for making HTTP requests.
     */

    it('should retrieve all the pending contributions on approvals page', async function ({ supertest }) {

        const startTimestamp = Date.now();

        await supertest

            .request(globals.baseurl)

            .get("/contribution/allContribution?pageNumber=1&limit=10")

            .set(header)

            .expect(200)

            // Assertions to check the structure and properties of the response
            .then(function (response) {

                assertResponseTime(startTimestamp, response);
                let responseBody = response.body.data._1;
                expect((responseBody).length).to.be.greaterThan(0);
                expect(responseBody[0]).to.have.property('contributionId');
                expect(responseBody[0]).to.have.property('knolderName');
                expect(responseBody[1]).to.have.property('title');
                expect(responseBody[1]).to.have.property('status');

                // Assert that the status of every contribution should be "PENDING"
                for (let index = 0; index < responseBody.length; index++) {
                    expect(responseBody[index].status.name).to.equal('PENDING');
                }

            });

    });

    /**
     * Test case to approve or reject a contribution -- PUT method call.
     * @param {object} supertest - The supertest object for making HTTP requests.
     */

    it('should approve/reject a contribution', async function ({ supertest }) {

        const startTimestamp = Date.now();

        await supertest

            .request(globals.baseurl)

            .put('/contribution')

            .set(header)

            .send({ "contributionId": 2718, "status": "APPROVED", "remark": "" })

            // Expect a successful response with HTTP status code 200
            .expect(200)

            .expect('Content-Type', /json/)

            .then(function (response) {
                assertResponseTime(startTimestamp, response);

                expect(Object.keys(response.body).length).to.be.greaterThan(0);
                expect(response.body.resource).to.equal('contribution');
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('data');
                expect(response.body.data).to.equal('Status Already Updated!');

            });

    });

    /**
    * Test case to retrieve a list of the contributions on "All contributions" page.
    * and validates the structure of the response and checks that the status of each contribution
    * falls within the allowed values: "PENDING," "APPROVED," or "REJECTED."
    */

    it('should retrieve list of the contributions on "all contributions" page', async function ({ supertest }) {

        const startTimestamp = Date.now();

        await supertest
            .request(globals.baseurl)
            .get("/contribution/getApprovedContributionsForAll?pageNumber=1&limit=10")
            .set(header)
            .expect(200)

            // Assertions to check the structure and properties of the response
            .then(function (response) {
                assertResponseTime(startTimestamp, response);

                let responseBody = response.body.data._1;
                expect((responseBody).length).to.be.greaterThan(0);
                expect(responseBody[0]).to.have.property('contributionId');
                expect(responseBody[0]).to.have.property('knolderName');
                expect(responseBody[1]).to.have.property('title');
                expect(responseBody[1]).to.have.property('status');

                // Assert that the status of every contribution can be "PENDING," "APPROVED," or "REJECTED"
                for (let index = 0; index < responseBody.length; index++) {
                    const status = responseBody[index].status.name;
                    expect(status).to.be.oneOf(['PENDING', 'APPROVED', 'REJECTED']);
                }

            });
    });

    /**
     * This test case sends a GET request to fetch details of a specific contribution
     * and validates the structure of the response and checks that the status of each contribution
     * falls within the allowed values: "PENDING," "APPROVED," or "REJECTED."
     * @param {Object} supertest - The supertest object for making HTTP requests.
     */

    it('should retrieve the details of a specific contribution', async function ({ supertest }) {

        const startTimestamp = Date.now();

        await supertest

            .request(globals.baseurl)

            .get("/contribution?contributionId=2702")

            .set(header)

            .expect(200)

            .then(function (response) {
                assertResponseTime(startTimestamp, response);

                let responseBody = response.body.data;

                // Assert the keys and data types of the properties
                for (let index = 0; index < responseBody.length; index++) {
                    const responseObject = responseBody[index];

                    expect(responseObject).to.have.all.keys(
                        'contributionId',
                        'contributionType',
                        'title',
                        'contributionDate',
                        'technologyDetails',
                    );
                }

                // Assert that the status of every contribution can be "PENDING," "APPROVED," or "REJECTED"
                for (let index = 0; index < responseBody.length; index++) {
                    const status = responseBody[index].status.name;
                    expect(status).to.be.oneOf(['PENDING', 'APPROVED', 'REJECTED']);
                }
            });

    });

    /**
    
    * This test case sends a GET request to retrieve contributions from a specific date
        and validates the structure of the response and checks that the status of each contribution
     * falls within the allowed values: "PENDING," "APPROVED," or "REJECTED."
     * @param {Object} supertest - The supertest object for making HTTP requests.
     */

    it('should retrieve the contributions on the basis of date', async function ({ supertest }) {
        const startTimestamp = Date.now();

        await supertest
            .request(globals.baseurl)
            .get("/contribution/allContribution?pageNumber=1&limit=10&date=2023-10-16")
            .set(header)
            .expect(200)

            .then(function (response) {
                assertResponseTime(startTimestamp, response);
                const responseBody = response.body.data;

                // Assert the keys of the properties in the response for each contribution
                for (let index = 0; index < responseBody.length; index++) {
                    const responseObject = responseBody[index];

                    expect(responseObject).to.have.all.keys(
                        'contributionId',
                        'contributionType',
                        'title',
                        'contributionDate',
                        'technologyDetails',
                    );
                }

                // Assert that the status of every contribution can be "PENDING," "APPROVED," or "REJECTED"
                for (let index = 0; index < responseBody.length; index++) {
                    const status = responseBody[index].status.name;
                    expect(status).to.be.oneOf(['PENDING', 'APPROVED', 'REJECTED']);
                }
            });

    });

});