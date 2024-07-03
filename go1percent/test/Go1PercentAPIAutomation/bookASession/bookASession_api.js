const headers = require('../../../globals');

describe('Knolx|Book A Session API', function () {
    const header = headers.admin.headers;
    const tokenHeaders = headers.admin.tokenHeaders;
    const tokenBody = headers.admin.tokenBody;
    const urls = headers.techhubUrls;

    before( async function ({ supertest }) {
        await supertest
            .request(urls.token)
            .post("/token")
            .set(tokenHeaders) 
            .send(tokenBody)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(function (response) {
                const token = response.body.access_token;
                header['Authorization'] = 'Bearer ' + token;
            });
    });
      
   it('Check the first user data', async function ({ supertest }) {
    const startTime = performance.now();
    const response = await supertest
        .request(headers.base_url)
        .get('v02/allUsers')
        .set('source', headers.source)
        .expect(200)
        .expect('Content-Type', /json/);

    const endTime = performance.now();
    const responseTime = endTime - startTime;
    expect(responseTime).to.be.lessThan(2000);

    const firstUser = response.body.users[0];

    expect(response.body).to.have.property('users').that.is.an('array');
    expect(response.body.users.length).to.be.greaterThan(0);

    expect(firstUser).to.have.property('name');
    expect(firstUser).to.have.property('email');
    });
   
    it('Check if "studioId" and "studioName" are present in the first data', async function ({ supertest }) {
        const startTime = performance.now();
        const response = await supertest
            .request(headers.backend_url)
            .get('knoldus-backend/rest/radar-service/technology/studio')
            .expect(200)
            .expect('Content-Type', /json/);

        const endTime = performance.now();
        const responseTime = endTime - startTime;

        expect(responseTime).to.be.lessThan(2000);

        const firstStudio = response.body.data[0];

        expect(response.body).to.have.property('data').that.is.an('array');
        expect(response.body.data.length).to.be.greaterThan(0);

        expect(firstStudio).to.have.property('studioId');
        expect(firstStudio).to.have.property('studioName');
    });
    
    it('Validate the first slot data', async function ({ supertest }) {
        const startTime = performance.now();
        const response = await supertest
            .request(headers.base_url)
            .get('v02/slots/getFourMonths')
            .set('source', headers.source)
            .set('authorization', header['Authorization'])
            .expect(200);

        const endTime = performance.now();
        const responseTime = endTime - startTime;
        expect(responseTime).to.be.lessThan(2000);

        const slots = response.body.slots;
        const firstSlot = slots[0];

        expect(slots.length).to.be.greaterThan(0);
        expect(firstSlot).to.have.property('id').that.is.a('string');
        expect(firstSlot).to.have.property('slotTitle').that.is.a('string');
        expect(firstSlot).to.have.property('dateTime').that.is.a('number');
        expect(firstSlot).to.have.property('bookable').that.is.a('boolean');
        expect(firstSlot).to.have.property('createdBy').that.is.a('string');
        expect(firstSlot).to.have.property('slotDuration').that.is.a('number');
        expect(firstSlot).to.have.property('slotType').that.is.a('string');
    });

});