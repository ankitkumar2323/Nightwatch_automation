const { forEach } = require('lodash');
const globals = require('../../../globals')
// ----------------------------------------------------------------------
//   >> using command "npx nightwatch ./test/Feedback-form-automation/ --env api_testing"
// -------------------------------------------------------------------------
describe('Feedback-form API tests', function () {


  const headers = globals.admin.headers;
  const token_headers = globals.admin.tokenHeaders;
  const urls = globals.urls;
  const apiUrls = globals.feedbackForm.apiUrls;
  const token_body = globals.admin.tokenBody;
  var form_id = "";

  function expectedResponseTime(startTime, expectedTime){
    expect(performance.now()-startTime).to.be.lessThan(expectedTime);
  }

  function assertData(expected, actual){
    Object.keys(expected).forEach(field => {
      expect(actual).to.have.property(field);
      if (actual[field] || 0) {
        expect(typeof actual[field]).to.be.eq(expected[field]);
      }
    });
  }



  // CONFIGURATION OF BEARER TOKEN
  it('Configuring Bearer Token', async function ({ supertest }) {

    await supertest
      .request(urls.token)
      .post("/token")
      .send(token_body)
      .set(token_headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(function (response) {
        const token = response.body.access_token;
        headers['Authorization'] = 'Bearer ' + token;
      });
  });


  // ==================================================  GET ALL FEEDBACK FORM
  it('GET - all feedback forms', async function ({ supertest }) {

    const startTime = performance.now();  //capturing timestamp before calling API

    await supertest
      .request(apiUrls.requestUrl)
      .get("/fetch?pageNumber=1&pageSize=1000&search=")
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        //capturing time after getting API response
        expectedResponseTime(startTime, 2000);


        const formData = response.body;  // storing response body in formData

        // expected GET body attributes and their types
        const expectedGetFields = {
          "forms": 'object',
          "count": "number",
          "pages": "number"
        };

        assertData(expectedGetFields, formData);

        //Assertion for GET body --> form attribute
        const formAttributesFields = {
          "id": "string",
          "name": "string"
        };


        if (formData['forms'].length > 0) {
          formData['forms'].forEach(form => {

            assertData(formAttributesFields, form);

          });
        }

      })




  });


  // ==================> CREATE A NEW FEEDBACK-FORM =====================================
  it('POST - Create a new feedback forms', async function ({ supertest }) {

    const startTime = performance.now(); // capturing timestamp before calling API

    const response = await supertest
      .request(apiUrls.requestUrl)
      .post("/create-feedback-form")
      .send(
        {
          "name": "new form 3",
          "questions": [
            {
              "question": "hello",
              "questionType": "NPS",
              "mandatory": true,
              "options": [
                "0"
              ]
            }
          ]
        }
      )
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {

        expectedResponseTime(startTime, 2000);

        // storing created data id to delete the created data
        form_id = res.body.id;
        // new_form_id['created_form_id'] = res.body.id;

        const responseBody = res.body;

        // expect response body attributes
        const expected_responseBodyAttributes = {
          "id": "string",
          "name": "string",
          "questions": "object",
          "active": "boolean",
          "previewLink": "string"
        };

        // assertion for response body
        assertData(expected_responseBodyAttributes, responseBody);

        // expected response.body.attributes
        const expected_questionsAttributes = {
          "question": "string",
          "options": "object",
          "questionType": "string",
          "mandatory": "boolean"
        }

        // assertions for response.body.attributes
        if (responseBody['questions'].length > 0) {

          responseBody['questions']
            .forEach(question => {
              assertData(expected_questionsAttributes, question);
            })
        }


      });

    //  deleting created data
    await supertest
      .request(apiUrls.requestUrl)
      .delete("/delete" + "/" + form_id)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
  });

  // ==========================UPDATE ========================
  // UPDATE AN EXISTING FORM
  it('PUT a new feedback form', async function ({ supertest }) {

    // creating a new form to update
    await supertest
      .request(apiUrls.requestUrl)
      .post("/create-feedback-form")
      .send(
        {
          "name": "new form 3",
          "questions": [
            {
              "question": "hello",
              "questionType": "NPS",
              "mandatory": true,
              "options": [
                "0"
              ]
            }
          ]
        }
      )
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        form_id = res.body.id;

      });

    // updating an existing form
    const startTime = performance.now();

    await supertest
      .request(apiUrls.requestUrl)
      .put("/" + form_id)
      .send(
        {
          "name": "new form 3",
          "questions": [
            {
              "question": "hello 2",
              "questionType": "NPS",
              "mandatory": true,
              "options": [
                "0"
              ]
            }
          ]
        }
      )
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        
        expectedResponseTime(startTime, 2000);

        const responseBody = response.body;

        //expected response attributes
        const expected_responseBody_attributes = {
          "id": "string"
        };

        //assertion for response attributes
        assertData(expected_responseBody_attributes, responseBody);

      });

    //deleting the form
    await supertest
      .request(apiUrls.requestUrl)
      .delete("/delete" + "/" + form_id)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  // ===========================DELETE AN EXISTING FORM===================
  it('DELETE an existing feedback form', async function ({ supertest }) {

    // creating a form to delete
    await supertest
      .request(apiUrls.requestUrl)
      .post("/create-feedback-form")
      .send(
        {
          "name": "new form 3",
          "questions": [
            {
              "question": "hello",
              "questionType": "NPS",
              "mandatory": true,
              "options": [
                "0"
              ]
            }
          ]
        }
      )
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        console.log(res.body.id);
        // new_form_id['created_form_id'] = res.body.id;
        form_id = res.body.id;

      });

    // deleting the form
    const startTime = performance.now();

    await supertest
      .request(apiUrls.requestUrl)
      .delete("/delete" + "/" + form_id)
      .set(headers)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {

        expectedResponseTime(startTime, 2000);

        const responseBody = response.body;

        // expected response attributes
        const expected_responseBody_attributes = {
          "id": "string"
        };


        //assertion for response attributes
        assertData(expected_responseBody_attributes, responseBody);

      })

  });

});