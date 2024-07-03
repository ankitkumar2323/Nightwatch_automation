import request from 'supertest';
import { assert, expect } from 'chai';
import { admin } from '../../../globals';
import { baseURL } from '../../../globals';

const newSlotPayload: {
  slotType: string;
  dateTime: number;
  slotTitle: string;
} = {
  slotType: 'Knolx',
  dateTime: 1699967460000,
  slotTitle: 'API Automation slot',
};

const updatedSlotPayload: {
  slotTitle: string;
  dateTime: number;
  slotType: string;
} = {
    slotTitle: 'API testing',
    dateTime: 1701847800000,
    slotType: 'Knolx',
};

const data: {
  slotId: string;
  slotTitle: string;
  dateTime: number;
  slotDuration: number;
  bookable: boolean;
  createdBy: string;
  createdOn: number;
  slotType: string;
} = {
  slotId: '65436f5e8555d37c0a4f8fcb',
  slotTitle: 'API Automation slot',
  dateTime: 1699967460000,
  slotDuration: 45,
  bookable: true,
  createdBy: 'testadmin@nashtechglobal.com',
  createdOn: 1698918238182,
  slotType: 'Knolx',
};

const approvePage: {
  [x: string]: any;
  id: string;
  presenterDetail: {
    fullName: string;
    email: string;
  };
  dateTime: number;
  sessionDurationInMins: number;
  topic: string;
  category: string;
  subCategory: string;
  feedbackFormId: string;
  feedbackExpriationDate: number;
  sessionType: string;
  sessionState: string;
  sessionDescription: string;
  youtubeURL: string;
  slideshareURL: string;
  slideURL: string;
  sessionTag: string[];
  remarks: string;
  isAttendanceUploaded: boolean;
  isFeedbackAvailable: boolean;
} = {
  id: '650afe5cce8ba4439b1697ef',
  presenterDetail: {
    fullName: 'test employee',
    email: 'testemployee@nashtechglobal.com',
  },
  dateTime: 1698748740000,
  sessionDurationInMins: 45,
  topic: 'Testing Title',
  category: 'AGILE COMPETENCY',
  subCategory: 'Remote and Hybrid working',
  feedbackFormId: '6335c19e58a2ac25916a20e4',
  feedbackExpriationDate: 1698949799000,
  sessionType: 'Knolx',
  sessionState: 'PendingForAdmin',
  sessionDescription: '',
  youtubeURL: '',
  slideshareURL: '',
  slideURL: 'www.amazon.com',
  sessionTag: [],
  remarks: 'Testing',
  isAttendanceUploaded: false,
  isFeedbackAvailable: false,
};

describe('Knolx|Sessions APIs', function () {
  const headers= admin.headers;
  const tokenHeaders = admin.tokenHeaders;
  const tokenBody = admin.tokenBody;
  const token_urls  = admin.techhubUrls;
  const urls  = baseURL;

  let createdSlotid: number;

  const commonExpectation = (startTimestamp: number, response: any) => {
    const endTimestamp = Date.now(); // Record the end time
    const responseTime = endTimestamp - startTimestamp; // Calculate response time in milliseconds
    expect(responseTime).to.be.below(5000); // Response time assertion
  };

  before(async function () {

    const response = await request(token_urls.token)
      .post("/token")
      .set(tokenHeaders) 
      .send(tokenBody)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response: any) {
        const token = response.body.access_token;
        headers['Authorization'] = 'Bearer ' + token;
      });

      it('create a new slot and store the slotId', async function () {
        //let createdSlotid: number;

        const startTimestamp = Date.now();
          request(urls.base_url)
         //request('https://knolx-backend.qa.go1percent.com/')
          .post("v02/slots")
          .set('source', headers.Source)
          .set(headers) 
        .expect(200) //Response code
        .expect('Content-Type', /json/)
        .then((response) => {
            assert.equal(response.body.slotTitle, data.slotTitle);
            assert.equal(response.body.slotDuration, data.slotDuration);
            assert.isTrue(response.body.bookable);
            assert.equal(response.body.createdBy, data.createdBy);
            assert.equal(response.body.slotType, newSlotPayload.slotType);
            assert.isNotEmpty(response.body.slotId);
             console.log(response);
             createdSlotid = response.body.slotId;
              });
      }),
      
      it('delete the created slot', async function () {
       
        if (createdSlotid) {
            const startTimestamp = Date.now();
             request(urls.base_url)
            .delete(`v02/slots/${createdSlotid}`) 
            .set('source', headers.Source)
            .set(headers) 
        .expect(200) //Response code
        .expect('Content-Type', /json/)
        .then((response) => {
          commonExpectation(startTimestamp, response);
              expect(response.body.status).to.be.true;
              expect(response.body.slotTitle).to.not.equal(data.slotTitle);
              expect(response.body.slotDuration).to.not.equal(data.slotDuration);
              expect(response.body.bookable).to.not.be.true; 
              expect(response.body.createdBy).to.not.equal(data.createdBy);
              expect(response.body.slotType).to.not.equal(newSlotPayload.slotType);
            });
        } else {
          console.log('No slotId available to delete.');
        }
      }),
    
      it('verify that upon clicking on free slot title, session type, title, date, and time can be updated.', async function () {
      
        if (createdSlotid) {
            const startTimestamp = Date.now();
           request(urls.base_url)
          .post(`v02/slots/${createdSlotid}`)
          .set('source', headers.Source)
          .set(headers) 
        .expect(200) //Response code
        .expect('Content-Type', /json/)
        .then((response) => {
          commonExpectation(startTimestamp, response);
            expect(response.body.slotId).to.be.not.empty;
            expect(response.body.slotTitle).to.equal(updatedSlotPayload.slotTitle);
            expect(response.body.dateTime).to.equal(updatedSlotPayload.dateTime);
            expect(response.body.slotType).to.equal(updatedSlotPayload.slotType);
          });
        } else {
          console.log('No slotId available to update.');
        }
      }),
      it('Automate Slot', async function () {
        const startTimestamp = Date.now();
           request(urls.base_url)
          .post("/v02/slots/automateSlot/3/Knolx") 
          .set('source', headers.Source)
            .set(headers) 
        .expect(200) //Response code
        .expect('Content-Type', /json/)
        .then((response) => {
          commonExpectation(startTimestamp, response);
           // expect(responseTime).to.be.lessThan(6000);
            expect(response.body.status).to.be.true;
            expect(response.type).to.equal('application/json');
    
    
           
          });
      }),
    
      it('getFourMonths Slot', async function () {
        const startTimestamp = Date.now();
           request(urls.base_url)
          .get("/v02/slots/getFourMonths") 
          .set('source', headers.Source)
            .set(headers) 
        .expect(200) //Response code
        .expect('Content-Type', /json/)
        .then((response) => {
          commonExpectation(startTimestamp, response);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('slots').to.be.an('array');
            expect(response.body).not.to.have.property('months');
                 
          })
        }),
    
          it('Verify when admin click on any slot it navigate to approved page', async function () {
            const startTimestamp = Date.now();
           request(urls.base_url)
              .get("/v02/getSession/6541fe998555d37c0a4f8f93") 
              .set('source', headers.Source)
            .set(headers) 
        .expect(200) //Response code
        .expect('Content-Type', /json/)
        .then((response) => {
          commonExpectation(startTimestamp, response);
                expect(approvePage.presenterDetail.fullName).to.equal('test employee');
                expect(approvePage.topic).to.equal(approvePage.topic);
                expect(approvePage.feedbackExpriationDate).to.equal(approvePage.feedbackExpriationDate);
                expect(approvePage.isAttendanceUploaded).to.equal(approvePage.isAttendanceUploaded);
                expect(approvePage.presenterDetail).to.equal(approvePage.presenterDetail);
                expect(approvePage.sessionState).to.equal(approvePage.sessionState);
                expect(approvePage.sessionType).to.equal(approvePage.sessionType);
                expect(approvePage.slideURL).to.equal(approvePage.slideURL);
                expect(approvePage.approvePage).to.equal(approvePage.approvePage);
                   
              });

       })

    });
});