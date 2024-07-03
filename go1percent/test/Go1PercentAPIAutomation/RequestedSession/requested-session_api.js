const headers = require('../globals')
const accessToken =''

const addTag ={
  sessionTag: 'test'
};

const removeTag ={
  sessionTag: []
};

const title = {
  topic: 'testing'
};

describe('api testing', function () {
  let sessionID = '';

    it('admin should able to see the available requested sessions', async function ({ supertest }) {
      const startTime = performance.now();
  
      const response = await supertest
        .request(headers.base_url)
        .get(`/v02/sessions/manage?pageNumber=${headers.queryRequested.pageNumber}&pageSize=${headers.queryRequested.pageSize}&filter=${headers.queryRequested.filter}&search=${headers.queryRequested.search}`)
        .set('source', headers.source)
        .set('Authorization', accessToken)
  
        .expect(200)
        .expect('Content-Type', 'application/json')
        .then((response)=>{
          console.log(response.body)
          const endTime = performance.now();
          const responseTime = endTime - startTime
          expect(responseTime).to.be.lessThan(2000)
          expect(response.body).to.have.property('sessions').that.is.an('array');
        });
    });


    it('admin should able to add tags', async function ({ supertest }) {
      const startTime = performance.now();

      const response = await supertest
        .request(headers.base_url)
        .put(`/v02/sessions/manage/update/${sessionID}`)
        .set('source', headers.source)
        .set('Authorization', accessToken)
        .send(addTag)
  
        .expect(200)
        .expect('Content-Type', 'application/json')
        .then((response)=>{
          console.log(response.body)
          const endTime = performance.now();
          const responseTime = endTime - startTime
          expect(responseTime).to.be.lessThan(5000);
          expect(response.body.sessionID).to.be.not.empty;
          expect(response.body).to.have.property('sessionTag').that.is.an('array');;
          expect(response.body.sessionTag).to.equal(addTag.sessionTag);
          expect(response.body.sessionTag).to.have.lengthOf.at.least(1);
        });
    });


    it('admin should able to remove tags', async function ({ supertest }) {
      const startTime = performance.now();

      const response = await supertest
        .request(headers.base_url)
        .put(`/v02/sessions/manage/update/${sessionID}`)
        .set('source', headers.source)
        .set('Authorization', accessToken)
        .send(removeTag)

        .expect(200)
        .expect('Content-Type', 'application/json')
        .then((response)=>{
          console.log(response.body)
          const endTime = performance.now();
          const responseTime = endTime - startTime
          expect(responseTime).to.be.lessThan(5000);
          expect(response.body.sessionID).to.be.not.empty;
          expect(response.body.sessionTag).to.equal(removeTag.sessionTag);
          expect(response.body.sessionTag).to.be.empty;
        });
  });


  it('admin should able to approve the session with feedback form', async function({supertest}) {
    const startTime = performance.now();

    const response = await supertest
      .request(headers.base_url)  
      .put(`/v02/sessions/manage/approve/requested/${sessionID}`)
      .set('source',headers.source)
      .set('Authorization',accessToken)

      .expect(200)
      .expect('Content-Type', 'application/json')
      .then((response)=>{
        console.log(response.body)
        const endTime = performance.now();
        const responseTime = endTime - startTime
        expect(responseTime).to.be.lessThan(5000);
        expect(response.body.sessionID).to.be.not.empty;
        expect(response.body).to.have.property('feedbackForm');
      });
  });


  it('Verify that admin should able to update the title ', async function({ supertest }) {
    const startTime = performance.now();

    const response = await supertest
      .request(headers.base_url)  
      .put(`/v02/sessions/manage/update/${sessionID}`)
      .set('source',headers.source)
      .set('Authorization', accessToken)
      .send(title)

      .expect(200)
      .expect('Content-Type', 'application/json')
      .expect('Content-Length', '42')
      .then((response)=>{
        console.log(response.body)
        const endTime = performance.now();
        const responseTime = endTime - startTime
        expect(responseTime).to.be.lessThan(2000);
        expect(response.body.sessionID).to.be.not.empty;
        expect(response.body.topic).to.equal(title.topic);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Successfully updated');

      });
  });


});