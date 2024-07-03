const { base } = require('mocha/lib/reporters');
const globals = require('../../../globals');
const helperurl = require('../../../helpers/Go1PercentFEAutomation/myPastSession/myPastSession.js')

describe('My past session API testing', function () {
    const baseUrl = "https://ticket-backend.qa.go1percent.com";
    const header = globals.admin.headers;
    const tokenHeaders = globals.admin.tokenHeaders;
    const tokenBody = globals.admin.tokenBody;

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

    it(' Can see my availble in my past session', async function ({ supertest }) {
         const startTime = Date.now();
         console.log(header,'*********************************')
         const response = await supertest
            .request(helperurl.baseUrl)
            .get("/v02/sessions/my?pageNumber=1&pageSize=1000&filter=past")
            .set(header)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .then(function (response) {
                expect(response.body).to.have.property("sessions");
            });
    });

     it('No session is availble in my past session', async function ({ supertest }) {
        const startTime = Date.now();
        const payloadData= {
          pageNumber: 1,
          pageSize: 1000,
          filter: 'past',
        }; 
         const response = await supertest

        .request(helperurl.baseUrl)
        .get(`/v02/sessions/my?pageNumber=1&pageSize=1000&filter=past`)
        .set(header)
        .send(tokenBody)
         .expect(200)
         .expect('Content-Type', 'application/json')
        .then(function (response) {
            expect(response.body).to.have.property("sessions");
            expect(response.body).to.have.property("count");

        });
    });
   
     it('Descriptive page should be visible on opening a session', async function ({ supertest }) {
        const startTime = Date.now();
        const response = await supertest
        .request(helperurl.baseUrl)
          .get('/v02/getSession/6529144d45bc9a797dfbcb19')
          .set(header)          
          .expect(200)
          .expect('Content-Type', 'application/json')
          .then(function (response) {
            expect(response.body).to.have.property("dateTime");
            expect(response.body).to.have.property("topic");
            expect(response.body).to.have.property("sessionDescription");
          });
      });



      it('redirect to the Attendance list', async function ({ supertest }) {
        const startTime = Date.now();
        const response = await supertest
  
        .request(helperurl.baseUrl)
        .get(`/v02/sessions/65364ed48555d37c0a4f8dc7/attendees?knoldersOnly=true`)
        .set(header)  
        .expect(200)
        .expect('Content-Type', 'application/json')
        .then(function (response) {
            expect(response.body).to.have.property("attendees");

          });
      });


  it('Redirect to feedback report page', async function ({ supertest }) {
    const startTime = Date.now();
    const response = await supertest
  
    .request(helperurl.baseUrl)
    .get(`/v02/score/session?sessionId=65364ed48555d37c0a4f8dc7`)
    .set(header)    
          .expect(200)
          .expect('Content-Type', 'application/json') 
          .then(function (response) {
            expect(response.body).to.have.property("sessionType");
            expect(response.body).to.have.property("npsScore");
            expect(response.body).to.have.property("attendees");


  
          });
      });


})




