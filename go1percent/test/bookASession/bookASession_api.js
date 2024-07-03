const headers = require('../../globals')

describe('Knolx|Book A Session API', function () {
    it('Check all users data', async function ({ supertest }) {
        const startTime = performance.now();
        const response = await supertest
            .request(headers.base_url)
            .get('v02/allUsers')
            .set('source', headers.source)
            .expect(200);

        const endTime = performance.now();
        const responseTime = endTime - startTime;
        expect(responseTime).to.be.lessThan(2000);

        const users = response.body.users;
        expect(users).to.satisfy((users) => {
            return users.every(user => {
                return user.hasOwnProperty('name') && typeof user.name === 'string' &&
                    user.hasOwnProperty('email') && typeof user.email === 'string';
            });
        }, 'All users should have "name" and "email" properties that are strings');
    });

    it('Check all studio competencies data', async function ({ supertest }) {
        const startTime = performance.now();
        const response = await supertest
            .request(headers.backend_url)
            .get('knoldus-backend/rest/radar-service/technology/studio')
            .expect(200);
            const expectedStudioIds = [
                'ALL_STUDIO',
                'AGILE_COMPETENCY',
                'AI_ML_COMPETENCY',
                'DEVOPS_COMPETENCY',
                'FRONTEND_COMPETENCY',
                'JAVA_COMPETENCY',
                'SCALA_COMPETENCY',
                'TEST_AUTOMATION_COMPETENCY'
            ];
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        expect(responseTime).to.be.lessThan(2000, 'Expected response time to be less than 2000ms');

        const studios = response.body.data;

        const missingCompetencies = studios.filter(studio => !studio.studioId || !expectedStudioIds.includes(studio.studioId));
        expect(missingCompetencies.length, 'All competencies should match the expected values').to.equal(0);
    });

    it('Validate upcoming months data', async function ({ supertest }) {
        const startTime = performance.now();
        const response = await supertest
            .request(headers.base_url)
            .get('v02/slots/getFourMonths')
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
});