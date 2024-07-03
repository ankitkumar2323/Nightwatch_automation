const globals = require('../../../../globals')
const randomString = Math.random().toString(36).substring(7);

describe('api testing', function () {

  const headers = globals.Add_Contribution.headers;
  const tokenHeaders = globals.Add_Contribution.tokenHeaders;
  const tokenBody = globals.Add_Contribution.tokenBody;
  const token = globals.Add_Contribution.token;
  const randomURL = "www."+ randomString+".com"

    const ResponseTime = (startTime)=>{ // Function to check Response Time
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;
    console.log(`Response Time: ${responseTime}ms`);
    expect(responseTime).to.be.lessThan(2000); 
    
  }

  it('get api token', async function ({ supertest }) {
    await supertest
      .request(token)
      .post("/token")
      .send(tokenBody)
      .set(tokenHeaders)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        const token = response._body.access_token;
        headers['Authorization'] = 'Bearer ' + token;
      });
  });
    
    
    it('POST api test', async function({supertest}) { //POST Call
      const startTime = new Date().getTime();
        await supertest
        
          .request(globals.Add_Contribution.BaseUrl)
          .post(globals.Add_Contribution.PostEndPoints)
          .set(headers)
          .send({
            "title":"Test employee contribution",
            "contributionType":"Research paper",
            "contributionDate":"2023-10-19 00:00:00",
            "urlDetails":randomURL,
            "technologyDetails":"ddcscdcmjjicjdjc hdfiwic jocdjoicwd fcdiocd chojvwofeefhevdvhvhnvjvjdwehuihefkjcnjkvnwbrihfuvbhjbdjfre"
          })
          .expect(200) //Asserting Response Code
          .then(function(response){
            expect('Content-Type', /json/)//Assert content type
            expect(response.body.status).to.be.equal(true)// Asserting Response Attribute
           expect(response.body.data).to.be.equal("Successfully added contribution!")
          });

          ResponseTime(startTime); // Asserting Response Time
      });

      it ('GET api test', async function({supertest}) { // GET Call
        const startTime = new Date().getTime();
        await supertest
        
          .request(globals.Add_Contribution.BaseUrl)
          .get(globals.Add_Contribution.GetEndPoints)
          .set(headers)
          .expect(200) //Asserting Response Code
         .then(function(response){
          expect('Content-Type', /json/)//Assert content type
           expect(response.body.status).to.be.equal(true)
           expect(response.body.data._1).to.have.length.that.not.equals(0);
           expect(response.body.data._2).to.have.length.that.not.equals(0);// Asserting Response Attribute
         });

         ResponseTime(startTime);// Asserting Response Time
      });
          
  });
  