const globals = require('../../../globals')

//Store All the Required Data In Globals And Calling The Data As Per The Requirement
describe('api testing', function () {
    const headers = globals.MyUpcomingSession.headers
  const tokenHeaders = globals.MyUpcomingSession.tokenHeaders;
  const tokenBody = globals.MyUpcomingSession.tokenBody;
  const urls = globals.urls;
   const UpdatedData= globals.UpdateData;
   
   //Generate Bearer Token
    it('Post APi Test', async function ({ supertest }) {
        await supertest
            .request(urls.token)
            .post("/token")
            .set(tokenHeaders) // Set your custom headers here
            .send(tokenBody)
            .expect(200)
            .expect('Content-Type', /json/)

            .then(function (response) {

                const token = response.body.access_token;
                headers['Authorization'] = 'Bearer ' + token;
            });
    });

    
    //Update The (Title,Tag,Description)Based On The Requirement
    it('put api test', async function({supertest}) {
        await supertest
          .request('https://knolx-backend.qa.go1percent.com/v02/')
          .put("user/session/6541bbc78555d37c0a4f8f70")
          .set(headers) 
          .send({"topic": "KnoldusNashtech",
          "sessionDescription": "In addition to the assert namespace, the Nightwatch API supports out of the box a BDD-style expect assertion library which greatly improves the flexibility as well as readability of the assertions.The expect assertions use a subset of the Expect api from the Chai framework and at this point a available for elements, cookies, page title, and urlHere a basic example that uses various expect.element([...]) assertions:",
          "slideURL": "www.goggle.com",
          "sessionTag": [
            "Automation","Testing"
          ]})
          .expect(200)
          .expect('Content-Type', /json/)
          .then(function(response){
              expect(response._body.status).to.be.equal("6541bbc78555d37c0a4f8f70");
              
              const startTime = performance.now();
  
          const endTime = performance.now();
          
          const responseTime = endTime - startTime;
  
          expect(responseTime).to.be.lessThan(2000);
          })
      });

//Fetch List Of All My Upcomin Session
it('get api test', async function ({ supertest }) {

    await supertest
        .request(urls.go1percentBase)
        .get("sessions/my?pageNumber=1&pageSize=1000&filter=upcoming")
        .set(headers) // Set your custom headers here
        .expect(200)
        .expect('Content-Type', /json/)
      .then(function (response) 
      {
        const startTime = performance.now();
        
        const endTime = performance.now();

    const responseTime = endTime - startTime;

    expect(responseTime).to.be.lessThan(2000);
 //Attribute Response
    expect(response.body.sessions[0].id).to.be.equal("6541bbc78555d37c0a4f8f70"),
 expect(response.body.sessions[0].topic).to.be.equal("KnoldusNashtech") // Use response.body to access the response body
 expect(response.body.sessions[0].category).to.be.equal("TEST AUTOMATION COMPETENCY"),
 expect(response.body.sessions[0].sessionType).to.be.equal("Knolx")   
    
    }) 
});












});



