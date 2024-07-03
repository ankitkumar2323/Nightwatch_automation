import request from 'supertest';
import { assert, expect } from 'chai';
import { admin } from '../../../globals'
import { baseURL } from '../../../globals';
let upcomingEpochTime: number, upcomingDay: number, upcomingBadgeName: string, upcomingNasherName: string, upcomingTitle: string, upcomingDate;
let pastEpochTime: number, pastDay: number, pastBadgeName: string, pastSessionDescription: string, pastID: string, pastTitle: string, pastDate;

describe('Knolx|Sessions APIs', function () {
  const headers = admin.headers;
  const tokenHeaders = admin.tokenHeaders;
  const tokenBody = admin.tokenBody;
  const token_urls = admin.techhubUrls;
  const urls = baseURL;

  const commonExpectation = (startTimestamp: number, response: any) => {
    const endTimestamp = Date.now(); // Record the end time
    const responseTime = endTimestamp - startTimestamp; // Calculate response time in milliseconds
    expect(responseTime).to.be.below(5000); //Response time assertion 
  }

  //Generate Bearer Token
  before(async function () {
    const response: any = await request(token_urls.token)
      .post("/token")
      .set(tokenHeaders) // Set your custom headers here
      .send(tokenBody)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response: any) {
        const token = response.body.access_token;
        headers['Authorization'] = 'Bearer ' + token;
      });
    // send request for get the 1st row data from the upcoming sessions page
    await request(urls.base_url)
      .get('v02/sessions')
      .query({
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'approved',
        'search': ''
      })
      .set(tokenHeaders)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        // Epoch time in milliseconds
        upcomingEpochTime = response.body.knolx[0].dateTime
        upcomingDate = new Date(upcomingEpochTime);
        upcomingDay = upcomingDate.getDate();
        upcomingBadgeName = response.body.knolx[0].sessionType
        upcomingNasherName = response.body.knolx[0].presenterDetail.fullName
        upcomingTitle = response.body.knolx[0].topic
      })

    // send request for get the 1st row data for the past sessions page
    await request(urls.base_url)
      .get('v02/sessions')
      .query({
        'pageNumber': '1',
        'pageSize': '10',
        'filter': 'past',
        'search': ''
      })
      .set(tokenHeaders)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        // Epoch time in milliseconds
        pastEpochTime = response.body.knolx[0].dateTime
        pastDate = new Date(pastEpochTime);
        pastDay = pastDate.getDate();
        pastBadgeName = response.body.knolx[0].sessionType
        pastSessionDescription = response.body.knolx[0].sessionDescription
        pastID = response.body.knolx[0].id
        pastTitle = response.body.knolx[0].topic
      })
  }),
    it('Search session using Session Title in Upcoming Sessions Page', async function () {
      const startTimestamp = Date.now();
      const response = await request(urls.base_url)
        .get('v02/sessions')
        .query({
          'pageNumber': '1',
          'pageSize': '10',
          'filter': 'approved',
          'search': upcomingTitle
        })
        .set('source', headers.Source)
        .expect(200) //Response code
        .expect('Content-Type', /json/)
        .then((response) => {
          commonExpectation(startTimestamp, response);
          expect(response.body.knolx).length.to.be.greaterThan(0);
          expect(response.body.knolx).length.to.be.greaterThan(0);
          expect(response.body.knolx[0]).to.have.property("id");
          expect(response.body.knolx[0]).to.have.property("presenterDetail");
          expect(response.body.knolx[0]).to.have.property("dateTime");
          expect(response.body.knolx[0]).to.have.property("sessionDurationInMins");
          expect(response.body.knolx[0]).to.have.property("topic");
          expect(response.body.knolx[0]).to.have.property("category");
          expect(response.body.knolx[0]).to.have.property("subCategory");
          expect(response.body.knolx[0]).to.have.property("feedbackExpriationDate");
          expect(response.body.knolx[0]).to.have.property("sessionType");
          expect(response.body.knolx[0]).to.have.property("sessionState");
          expect(response.body.knolx[0]).to.have.property("sessionDescription");
          expect(response.body.knolx[0]).to.have.property("contentAvailable");
          expect(response.body.knolx[0]).to.have.property("content");
          expect(response.body.knolx[0].topic).to.contains(upcomingTitle);
        })
    }),

    it('Filter Session using Competency as TEST AUTOMATION COMPETENCY in Upcoming Sessions Page', async function () {
      const startTimestamp = Date.now();
      const response = await request(urls.base_url)
        .get('v02/sessions/filters')
        .query({
          'pageNumber': '1',
          'pageSize': '10',
          'filter': 'upcoming',
          'studio': 'testautomation'
        })
        .set('source', headers.Source)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          commonExpectation(startTimestamp, response);
          expect(Object.keys(response.body).length).to.be.greaterThan(0);
          expect(response.body.knolx).length.to.be.greaterThan(0);
          expect(response.body.knolx[0]).to.have.property("id");
          expect(response.body.knolx[0]).to.have.property("presenterDetail");
          expect(response.body.knolx[0]).to.have.property("dateTime");
          expect(response.body.knolx[0]).to.have.property("sessionDurationInMins");
          expect(response.body.knolx[0]).to.have.property("topic");
          expect(response.body.knolx[0]).to.have.property("category");
          expect(response.body.knolx[0]).to.have.property("subCategory");
          expect(response.body.knolx[0]).to.have.property("feedbackExpriationDate");
        });
    }),

    it('Filter Session using All Sessions in Upcoming Sessions Page', async function () {
      const startTimestamp = Date.now();
      const response = await request(urls.base_url)
        .get('v02/sessions/filters')
        .query({
          'pageNumber': '1',
          'pageSize': '10',
          'filter': 'upcoming',
          'session': upcomingBadgeName
        })
        .set('source', headers.Source)
        .expect(200)
        .expect('Content-Type', /json/)

        .then((response) => {
          commonExpectation(startTimestamp, response);
          expect(Object.keys(response.body).length).to.be.greaterThan(0);
          expect(response.body.knolx).length.to.be.greaterThan(0);
          expect(response.body.knolx[0]).to.have.property("id");
          expect(response.body.knolx[0]).to.have.property("presenterDetail");
          expect(response.body.knolx[0]).to.have.property("dateTime");
          expect(response.body.knolx[0]).to.have.property("sessionDurationInMins");
          expect(response.body.knolx[0]).to.have.property("topic");
          expect(response.body.knolx[0]).to.have.property("category");
          expect(response.body.knolx[0]).to.have.property("subCategory");
          expect(response.body.knolx[0]).to.have.property("feedbackExpriationDate");
          expect(response.body.knolx[0]).to.have.property("sessionType");
          expect(response.body.knolx[0]).to.have.property("sessionState");
          expect(response.body.knolx[0]).to.have.property("sessionDescription");
          expect(response.body.knolx[0]).to.have.property("contentAvailable");
          expect(response.body.knolx[0]).to.have.property("content");

          expect(response.body.knolx[0].sessionType).to.be.eq(upcomingBadgeName)
        })

    }),

    it('Filter Session using All Time in Upcoming Sessions Page', async function () {
      const startTimestamp = Date.now();
      const response = await request(urls.base_url)
        .get('v02/sessions/filters')
        .query({
          'pageNumber': '1',
          'pageSize': '10',
          'filter': 'upcoming',
          'time': upcomingEpochTime
        })
        .set('source', headers.Source)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          commonExpectation(startTimestamp, response);
          expect(Object.keys(response.body).length).to.be.greaterThan(0);
          expect(response.body.knolx).length.to.be.greaterThan(0);
          expect(response.body.knolx[0]).to.have.property("id");
          expect(response.body.knolx[0]).to.have.property("presenterDetail");
          expect(response.body.knolx[0]).to.have.property("dateTime");
          expect(response.body.knolx[0]).to.have.property("sessionDurationInMins");
          expect(response.body.knolx[0]).to.have.property("topic");
          expect(response.body.knolx[0]).to.have.property("category");
          expect(response.body.knolx[0]).to.have.property("subCategory");
          expect(response.body.knolx[0]).to.have.property("feedbackExpriationDate");
          expect(response.body.knolx[0]).to.have.property("sessionType");
          expect(response.body.knolx[0]).to.have.property("sessionState");
          expect(response.body.knolx[0]).to.have.property("sessionDescription");
          expect(response.body.knolx[0]).to.have.property("contentAvailable");
          expect(response.body.knolx[0]).to.have.property("content");
          // Convert Epoch time 
          const responsEpochTime = response.body.knolx[0].dateTime
          const responseDate = new Date(responsEpochTime);
          const responseDay = responseDate.getDate();
          expect(responseDay).to.be.eq(upcomingDay)
        })

    }),

    it('GET session Details about first sessions in Past Sessions Page', async function () {
      const startTimestamp = Date.now();
      const response = await request(urls.base_url)
        .get('v02/getSession/' + pastID)
        .query({
          'pageNumber': '1',
          'pageSize': '10',
          'filter': 'upcoming',
          'time': pastEpochTime
        },)
        .set('source', headers.Source)
        .set(headers) //Authorization Token and Source 
        .expect(200)
        .expect('Content-Type', /json/)

        .then((response) => {
          commonExpectation(startTimestamp, response);
          expect(Object.keys(response.body).length).to.be.greaterThan(0);
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("presenterDetail");
          expect(response.body).to.have.property("dateTime");
          expect(response.body).to.have.property("sessionDurationInMins");
          expect(response.body).to.have.property("topic");
          expect(response.body).to.have.property("category");
          expect(response.body).to.have.property("subCategory");
          expect(response.body).to.have.property("feedbackExpriationDate");
          expect(response.body).to.have.property("sessionType");
          expect(response.body).to.have.property("sessionState");
          expect(response.body).to.have.property("sessionDescription");
          expect(response.body).to.have.property("youtubeURL");
          expect(response.body).to.have.property("slideshareURL");
          expect(response.body).to.have.property("slideURL");
          expect(response.body).to.have.property("sessionTag");
          expect(response.body).to.have.property("isAttendanceUploaded");
          expect(response.body).to.have.property("isFeedbackAvailable");
          expect(response.body).to.have.property("isHighlightedAttendeeAvailable");
          expect(response.body).to.have.property("feedbackFormName");
          expect(response.body).to.have.property("presenterPic");
          expect(response.body).to.have.property("coPresenterPic");

          expect(response.body.sessionDescription).to.be.eq(pastSessionDescription)
        })
    }),
    it('Search session using Session Title in Past Sessions Page', async function () {
      const startTimestamp = Date.now();
      const response = await request(urls.base_url)
        .get('v02/sessions')
        .query({
          'pageNumber': '1',
          'pageSize': '10',
          'filter': 'past',
          'search': pastTitle
        },)
        .set('source', headers.Source)
        .expect(200)
        .expect('Content-Type', /json/)

        .then((response) => {
          commonExpectation(startTimestamp, response);
          expect(Object.keys(response.body).length).to.be.greaterThan(0);
          expect(response.body.knolx).length.to.be.greaterThan(0);
          expect(response.body.knolx[0]).to.have.property("id");
          expect(response.body.knolx[0]).to.have.property("presenterDetail");
          expect(response.body.knolx[0]).to.have.property("dateTime");
          expect(response.body.knolx[0]).to.have.property("sessionDurationInMins");
          expect(response.body.knolx[0]).to.have.property("topic");
          expect(response.body.knolx[0]).to.have.property("category");
          expect(response.body.knolx[0]).to.have.property("subCategory");
          expect(response.body.knolx[0]).to.have.property("feedbackExpriationDate");
          expect(response.body.knolx[0]).to.have.property("sessionType");
          expect(response.body.knolx[0]).to.have.property("sessionState");
          expect(response.body.knolx[0]).to.have.property("sessionDescription");
          expect(response.body.knolx[0]).to.have.property("contentAvailable");
          expect(response.body.knolx[0]).to.have.property("content");

          expect(response.body.knolx[0].topic).to.be.eq(pastTitle)
        })

    }),
    it('Filter Session using Competency as TEST AUTOMATION COMPETENCY in Past Sessions Page', async function () {
      const startTimestamp = Date.now();
      const response = await request(urls.base_url)
        .get('v02/sessions/filters')
        .query({
          'pageNumber': '1',
          'pageSize': '10',
          'filter': 'past',
          'studio': 'testautomation'
        })
        .set('source', headers.Source)
        .expect(200)
        .expect('Content-Type', /json/)

        .then((response) => {
          commonExpectation(startTimestamp, response);
          expect(Object.keys(response.body).length).to.be.greaterThan(0);
          expect(response.body.knolx).length.to.be.greaterThan(0);
          expect(response.body.knolx[0]).to.have.property("id");
          expect(response.body.knolx[0]).to.have.property("presenterDetail");
          expect(response.body.knolx[0]).to.have.property("dateTime");
          expect(response.body.knolx[0]).to.have.property("sessionDurationInMins");
          expect(response.body.knolx[0]).to.have.property("topic");
          expect(response.body.knolx[0]).to.have.property("category");
          expect(response.body.knolx[0]).to.have.property("subCategory");
          expect(response.body.knolx[0]).to.have.property("feedbackExpriationDate");
          expect(response.body.knolx[0]).to.have.property("sessionType");
          expect(response.body.knolx[0]).to.have.property("sessionState");
          expect(response.body.knolx[0]).to.have.property("sessionDescription");
          expect(response.body.knolx[0]).to.have.property("contentAvailable");
          expect(response.body.knolx[0]).to.have.property("content");

          expect(response.body.knolx[0].category).to.contains('TEST AUTOMATION COMPETENCY')
        })

    }),
    it('Filter Session using All Sessions in Past Sessions Page', async function () {
      const startTimestamp = Date.now();
      const response = await request(urls.base_url)
        .get('v02/sessions/filters')
        .query({
          'pageNumber': '1',
          'pageSize': '10',
          'filter': 'past',
          'session': pastBadgeName
        })
        .set('source', headers.Source)
        .expect(200)
        .expect('Content-Type', /json/)

        .then((response) => {
          commonExpectation(startTimestamp, response);
          expect(Object.keys(response.body).length).to.be.greaterThan(0);
          expect(response.body.knolx).length.to.be.greaterThan(0);
          expect(response.body.knolx[0]).to.have.property("id");
          expect(response.body.knolx[0]).to.have.property("presenterDetail");
          expect(response.body.knolx[0]).to.have.property("dateTime");
          expect(response.body.knolx[0]).to.have.property("sessionDurationInMins");
          expect(response.body.knolx[0]).to.have.property("topic");
          expect(response.body.knolx[0]).to.have.property("category");
          expect(response.body.knolx[0]).to.have.property("subCategory");
          expect(response.body.knolx[0]).to.have.property("feedbackExpriationDate");
          expect(response.body.knolx[0]).to.have.property("sessionType");
          expect(response.body.knolx[0]).to.have.property("sessionState");
          expect(response.body.knolx[0]).to.have.property("sessionDescription");
          expect(response.body.knolx[0]).to.have.property("contentAvailable");
          expect(response.body.knolx[0]).to.have.property("content");

          expect(response.body.knolx[0].sessionType).to.be.eq(pastBadgeName)
        })

    }),
    it('Filter Session using All Time in Past Sessions Page', async function () {
      const startTimestamp = Date.now();
      const response = await request(urls.base_url)
        .get('v02/sessions/filters')
        .query({
          'pageNumber': '1',
          'pageSize': '10',
          'filter': 'past',
          'time': pastEpochTime
        })
        .set('source', headers.Source)
        .expect(200)
        .expect('Content-Type', /json/)

        .then((response) => {
          commonExpectation(startTimestamp, response);
          expect(Object.keys(response.body).length).to.be.greaterThan(0);
          expect(response.body.knolx).length.to.be.greaterThan(0);
          expect(response.body.knolx[0]).to.have.property("id");
          expect(response.body.knolx[0]).to.have.property("presenterDetail");
          expect(response.body.knolx[0]).to.have.property("dateTime");
          expect(response.body.knolx[0]).to.have.property("sessionDurationInMins");
          expect(response.body.knolx[0]).to.have.property("topic");
          expect(response.body.knolx[0]).to.have.property("category");
          expect(response.body.knolx[0]).to.have.property("subCategory");
          expect(response.body.knolx[0]).to.have.property("feedbackExpriationDate");
          expect(response.body.knolx[0]).to.have.property("sessionType");
          expect(response.body.knolx[0]).to.have.property("sessionState");
          expect(response.body.knolx[0]).to.have.property("sessionDescription");
          expect(response.body.knolx[0]).to.have.property("contentAvailable");
          expect(response.body.knolx[0]).to.have.property("content");

          // Convert Epoch time 
          const responsEpochTime = response.body.knolx[0].dateTime
          const responseDate = new Date(responsEpochTime);
          const responseDay = responseDate.getDate();

          expect(responseDay).to.be.eq(pastDay)
        })
    })
});
