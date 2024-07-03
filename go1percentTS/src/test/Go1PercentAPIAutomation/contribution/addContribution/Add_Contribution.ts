
const randomString = Math.random().toString(36).substring(7);
import {contibution} from '../../../globals'
import request from 'supertest';
import { expect } from 'chai';


describe('api testing', function () {

  const headers = contibution.headers;
  const tokenHeaders = contibution.tokenHeaders;
 const tokenBody = contibution.tokenBody;
  const token = contibution.addContribution.token;
  const randomURL = "www."+ randomString+".com"

    const ResponseTime = (startTime: any)=>{ // Function to check Response Time
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;
    console.log(`Response Time: ${responseTime}ms`);
    expect(responseTime).to.be.lessThan(2000); 
    
  }

  it('get api token', async function () {
   const response = await request(token)
      .post("/token")
      .send(tokenBody)
      .set(tokenHeaders)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        const token = response.body.access_token;
        headers['Authorization'] = 'Bearer ' + token;
      });
  });
    
    
    it('POST api test', async function() { //POST Call
      const startTime = new Date().getTime();
        const response =await request(contibution.addContribution.BaseUrl)
        
          .post(contibution.addContribution.PostEndPoints)
          .set(headers)
          .send({
            "title":"Test employee contribution",
            "contributionType":"Research paper",
            "contributionDate":"2023-10-19 00:00:00",
            "urlDetails":randomURL,
            "technologyDetails":"ddcscdcmjjicjdjc hdfiwic jocdjoicwd fcdiocd chojvwofeefhevdvhvhnvjvjdwehuihefkjcnjkvnwbrihfuvbhjbdjfre"
          })
          .expect(200) //Asserting Response Code
          .expect('Content-Type', /json/)//Assert content type
          .then(function(response){
            expect(response.body.status).to.be.equal(true)// Asserting Response Attribute
           expect(response.body.data).to.be.equal("Successfully added contribution!")
          });

          ResponseTime(startTime); // Asserting Response Time
      });

      it ('GET api test', async function() { // GET Call
        const startTime = new Date().getTime();
        const response = await request(contibution.addContribution.BaseUrl)
          .get(contibution.addContribution.GetEndPoints)
          .set(headers)
          .expect(200) //Asserting Response Code
          .expect('Content-Type', /json/)//Assert content type
         .then(function(response){
           expect(response.body.status).to.be.equal(true)
           expect(response.body.data._1).to.have.length.that.not.equals(0);
           expect(response.body.data._2).to.have.length.that.not.equals(0);// Asserting Response Attribute
         });

         ResponseTime(startTime);// Asserting Response Time
      });
          
  });
  