const uniqueId = `TestingNightwatchTestcase1-${Math.floor(Math.random() * 1000000)}`;

module.exports = {
    insertPayload: {
        "id": uniqueId,
        "name": uniqueId,
        "logoURL": uniqueId,
        "caption": uniqueId,
        "description": [
          uniqueId
        ],
        "resources": {
          "baseWebsite": uniqueId,
          "docLink": uniqueId,
          "twitterLink": uniqueId,
          "githubLink": uniqueId,
          "stackOverflowLink": uniqueId
        },
        "hits": 0,
        "allTechnology": {
          "id": uniqueId,
          "name": uniqueId,
          "logoURL": uniqueId,
          "caption": uniqueId
        },
        "technology": {
          "id": uniqueId,
          "name": uniqueId
        },
        "trending": {
          "id": uniqueId,
          "name": uniqueId,
          "hits": 0
        }
      },

    updatePayload: {
        "id": "string",
        "name": "string",
        "logoURL": "string",
        "caption": "string",
        "description": [
          "string"
        ],
        "resources": {
          "baseWebsite": "string",
          "docLink": "string",
          "twitterLink": "string",
          "githubLink": "string",
          "stackOverflowLink": "string"
        },
        "hits": 0,
        "allTechnology": {
          "id": "string",
          "name": "string",
          "logoURL": "string",
          "caption": "string"
        },
        "technology": {
          "id": "string",
          "name": "string"
        },
        "trending": {
          "id": "string",
          "name": "string",
          "hits": 0
        }
      },

      draftRepoPayload: {
        "id": "65321d9c3400003b269cc6bd",
        "repoName": "TestTechHubAutomationShra",
        "title": "SomeTestingTesting",
        "caption": "SomeTestingTesting",
        "description": ["sredtryugioyjgfhgchjklkgyfgchjuytfgcvhjbkuytfgchjbkuyfgchjkyutfgcvbnhjkuygtfgcvbnhjkyugtfhbjygfcvbnhjgfcvbnhjgfcvbnhjg"],
        "branch": "main",
        "tags": ["tags"],
        "baseLanguage": "kafka",
        "otherLanguages": [{ "tempId": "", "langName": "" }],
        "category": "learning", "infoUrl": ""
      }
}