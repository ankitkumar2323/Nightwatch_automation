const globals = require('../../globals')
it('Validate upcoming months data', async function ({ supertest }) {
  const startTime = performance.now();
  const response = await supertest
      .request(headers.base_url)
      .get('656?month=october&year=2023')
      .set('source', headers.source)
      .set('authorization', headers.access_token)
      .expect(200);
  const endTime = performance.now();
  const responseTime = endTime - startTime;
  expect(responseTime).to.be.lessThan(2000);

  const slots = response.body.slots;

  const expectedDataTypes = {
      id: 'string',
      slotTitle: 'string',
      dateTime: 'number',
      bookable: 'boolean',
      createdBy: 'string',
      slotDuration: 'number',
      slotType: 'string'
  };

  const dataTypesMatch = slots.every(slot => {
      return Object.keys(expectedDataTypes).every(field => {
          return typeof slot[field] === expectedDataTypes[field];
      });
  });

  expect(dataTypesMatch, 'All fields have correct data types').to.be.true;

});
it('Validate my points', async function ({ supertest }) {
  const startTime = performance.now();
  const response = await supertest
      .request(headers.base_url)
      .get('reputation/656')
      .set('source', headers.source)
      .set('authorization', headers.access_token)
      .expect(200);
  const endTime = performance.now();
  const responseTime = endTime - startTime;
  expect(responseTime).to.be.lessThan(2000);

  const slots = response.body.slots;

  const expectedDataTypes = {
      id: 'string',
      slotTitle: 'string',
      dateTime: 'number',
      bookable: 'boolean',
      createdBy: 'string',
      slotDuration: 'number',
      slotType: 'string'
  };

  const dataTypesMatch = slots.every(slot => {
      return Object.keys(expectedDataTypes).every(field => {
          return typeof slot[field] === expectedDataTypes[field];
      });
  });

  expect(dataTypesMatch, 'All fields have correct data types').to.be.true;
});
it('Validate my points of november', async function ({ supertest }) {
  const startTime = performance.now();
  const response = await supertest
      .request(headers.base_url)
      .get('656?month=november&year=2023')
      .set('source', headers.source)
      .set('authorization', headers.access_token)
      .expect(200);
  const endTime = performance.now();
  const responseTime = endTime - startTime;
  expect(responseTime).to.be.lessThan(2000);

  const slots = response.body.slots;

  const expectedDataTypes = {
      id: 'string',
      slotTitle: 'string',
      dateTime: 'number',
      bookable: 'boolean',
      createdBy: 'string',
      slotDuration: 'number',
      slotType: 'string'
  };

  const dataTypesMatch = slots.every(slot => {
      return Object.keys(expectedDataTypes).every(field => {
          return typeof slot[field] === expectedDataTypes[field];
      });
  });

  expect(dataTypesMatch, 'All fields have correct data types').to.be.true;
});

