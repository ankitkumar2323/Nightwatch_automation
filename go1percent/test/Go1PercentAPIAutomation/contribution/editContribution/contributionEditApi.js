const url = require('../../../../globals')
describe('api testing', function () {

    const assertResponseTime = (startTime) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      expect(responseTime).to.be.below(10000);
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
      .set(url.admin.tokenHeaders)
      .send(requestData)
      .expect(200)
      .then(function (response) {
        const token = response._body.access_token;
        url.employee.headers['Authorization'] = 'Bearer ' + token;
      });

  })


    // This test sends a GET request to retrieve details of a specific contribution using the contribution ID.
    it('click on a certain contribution and see the details', async function({supertest}) {
      const startTime = new Date().getTime();
      await supertest
        .request(url.baseurl)
        .get("/contribution?contributionId=3003")
        .set(url.employee.headers)
        
        .expect(200)
        .expect('Content-Type', /json/)
        .then(function(response){

          // The test then checks the response body for the presence of specific properties such as "contributionId," "knolderName," "title," and "status."
            expect(Object.keys(response.body).length).to.be.greaterThan(0);
            expect(response.body.data).to.have.property('contributionId');
            expect(response.body.data).to.have.property('knolderName');
            expect(response.body.data).to.have.property('title');
            expect(response.body.data).to.have.property('status');

        });

        assertResponseTime(startTime);
    });

    // This test sends a GET request to retrieve knolder contributions with pagination and a limit.
    it('on saving changes for a contribution', async function({supertest}) {
        const startTime = new Date().getTime();
        await supertest

          .request(url.baseurl)
          .get("/contribution/getKnolderContribution?pageNumber=1&limit=10000")
          .set(url.employee.headers)
          
          .expect(200)
          .expect('Content-Type', /json/)
          .then(function(response){

            //The test then checks the response body for the presence of specific properties for the first contribution, such as "contributionId," "knolderName," "title," "status," and "contributionType."
            expect(Object.keys(response.body).length).to.be.greaterThan(0);
            expect(response.body.data._1).length.to.be.greaterThan(0);
            expect(response.body.data._1[0]).to.have.property('contributionId');
            expect(response.body.data._1[0]).to.have.property('knolderName');
            expect(response.body.data._1[0]).to.have.property('title');
            expect(response.body.data._1[0]).to.have.property('status');
            expect(response.body.data._1[0]).to.have.property('contributionType');

        });

        assertResponseTime(startTime);
          
      });

      //This test sends a PUT request to edit a contribution with updated data.
      it('on editing a contribution', async function({supertest}) {
        const startTime = new Date().getTime();

        await supertest
          .request(url.baseurl)
          .put('/contribution/editContribution')
          .set(url.employee.headers)
          .send({"title":"Test employee contribution","contributionType":"Research paper","contributionDate":"2023-10-19 00:00:00","urlDetails":"www.courser.org","technologyDetails":"ddcscdcmjjicjdjc hdfiwic jocdjoicwd fcdiocd chojvwofeefhevdvhvhnvjvjdwehuihefkjcnjkvnwbrihfuvbhjbdjfre","contributionId":2727})
          
          .expect(200)
          .expect('Content-Type', /json/)
          .then(function(response){

            //The test then checks the response body for the presence of specific properties, such as "resource," "status," and "data," and verifies that the "data" property contains the expected message, indicating that the contribution was updated successfully.
            expect(Object.keys(response.body).length).to.be.greaterThan(0);
            expect(response.body).to.have.property('resource')
            expect(response.body).to.have.property('status')
            expect(response.body).to.have.property('data')
            expect(response.body.data).to.be.equal('contribution Updated Successfully!')
            
        });

        assertResponseTime(startTime);
          
      });





  });
  