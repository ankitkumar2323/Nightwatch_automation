const globals = require('../../../globals')
const urls = globals.urls;
const baseUrl = globals.Add_Contribution.BaseUrl;

describe('Leaderboard-Rewards API Testing', function () {
    const header = globals.admin.headers;
    const tokenHeaders = globals.admin.tokenHeaders;
    const tokenBody = globals.admin.tokenBody;


    const commonExpectation = (startTimestamp, response) => {
        const endTimestamp = Date.now(); // Record the end time
        const responseTime = endTimestamp - startTimestamp; // Calculate response time in milliseconds
        expect(responseTime).to.be.below(120000); //Response time assertion 
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
    it('Check All Rewards Data', async function ({ supertest }) {
        const startTime = performance.now();
        const response = await supertest
            .request(baseUrl)
            .get("/rewards/getAllRewards")
            .set(header)
            .expect(200)
            .expect('Content-Type', 'application/json')  // Expect a response with JSON content type

            .then(function (response) {

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
        it('Check all Knolder ID', async function ({ supertest }) {
            const startTime = performance.now();
            const response = await supertest
                .request(baseUrl)
                .get('/get/knolderId?knolderEmail=testadmin@nashtechglobal.com')
                .set(header)
                .expect(200)
                .expect('Content-Type', 'application/json')  // Expect a response with JSON content type

                .then(function (response) {

                    //The test then checks the response body for the presence of specific properties such as "name," "pointsNeededToRedeem," "description," "rewardType," 
                    //"quantity," "expiryDate and" "active ."

                    const expectedData = {
                        "resource" : "string",
                        "status" : "boolean",
                        "data" : "number"
                        };


                        Object.keys(expectedData).forEach(key => {
                        expect(expectedData[key]).to.be.eq(typeof response.body[key]);
                        })

                    expect(response.body).to.have.property("resource");
                    expect(response.body).to.have.property('status');
                    expect(response.body).to.have.property('data');

                    commonExpectation(startTime, response);// expect for checking the response time

        });
    });

    it('Get Profile Pic', async function ({ supertest }) {
        const startTime = performance.now();
        const response = await supertest
            .request(baseUrl)
            .get('/profile/getProfilePic?email=testadmin@nashtechglobal.com')
            .set(header)
            .expect(200)
            .expect('Content-Type', 'application/json')  // Expect a response with JSON content type

            .then(function (response) {

                //The test then checks the response body for the presence of specific properties such as "name," "pointsNeededToRedeem," "description," "rewardType," 
                //"quantity," "expiryDate and" "active ."

                const expectedData = {
                    "resource": "string",
                    "status": "boolean",
                };


                Object.keys(expectedData).forEach(key => {
                    expect(expectedData[key]).to.be.eq(typeof response.body[key]);
                })


                expect(response.body).to.have.property("resource");
                expect(response.body).to.have.property('status');


                commonExpectation(startTime, response);// expect for checking the response time

            });
    });
});
