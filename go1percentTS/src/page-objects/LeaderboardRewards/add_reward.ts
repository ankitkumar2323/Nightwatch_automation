import { PageObjectModel, EnhancedPageObject } from 'nightwatch';
import { NightwatchBrowser } from 'nightwatch';

var addRewardCommands = {

    openAddRewardTab : function (this: AddRewardPage) {
        return this
        .waitForElementPresent('@addRewardButton', 5000)
        .click('@addRewardButton')
        .waitForElementPresent('@addRewardTitle', 5000); 
    },

    clickSaveButton : function (this: AddRewardPage) {
        return this
        .waitForElementPresent('@submitButton', 5000)
        .click('@submitButton');
    },

    closeAddRewardTab : function (this: AddRewardPage) {
        return this
        .waitForElementPresent('@cancelButton', 5000)
        .click('@cancelButton')
        .waitForElementNotPresent('@addRewardTitle', 5000);
    },

    addARewardDetails : function(this: AddRewardPage, rewardName : string, expiryDate: string){  
        return this

        //Reward name
        .waitForElementPresent('@nameField', 5000)
        .setValue('@nameField', rewardName)

        //Description
        .waitForElementPresent('@descriptionField', 5000)
        .setValue('@descriptionField', 'Testing Purpose')

        //Points needed to redeem
        .waitForElementPresent('@pointsNeededToRedeemField', 5000)
        .setValue('@pointsNeededToRedeemField', '1000')

        //Stock Quantity
        .waitForElementPresent('@quantityField', 5000)
        .setValue('@quantityField', '100')

        //Expiry on
        .waitForElementPresent('@expiryDateField', 5000)
        .setValue('@expiryDateField', expiryDate);
        
    },

    setAvailableForIndividual : function(this: AddRewardPage){
        return this
        .waitForElementVisible('@individualButton', 5000)
        .click('@individualButton');
    },
  
    setAvailableForCompetency : function(this: AddRewardPage){
        return this
        .waitForElementVisible('@competencyButton', 5000)
        .click('@competencyButton');
    },

  
    enableReward : function(this: AddRewardPage){
        return this
        .waitForElementPresent('@enableButton', 5000)
        .click('@enableButton');
    },

    addImage : function (this: AddRewardPage, browser : NightwatchBrowser) {
        const path = require('path')
        // return this
        browser
        .isEnabled('input[type="file"]', function(result) {
            if (result.value) {
                // Element is interactable, proceed with file upload
                browser.uploadFile('input[type="file"]', path
                .resolve(__dirname,'..', '..', '..', '..', '..', 'go1percent/helpers/Go1PercentFEAutomation/LeaderboardRewards/imageFiles/Reward.jpeg'));
            } else {
                console.error('Element is not interactable');
            }
        });         
    },
     
    getCurrentDate: (): string => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;   
    },


    generateRandomString: (): string => {
        const allowedChars = 'abcdefghijklmnopqrstuvwxyz';
        let randomString = '';
    
        // Generate the first character separately to ensure it's capitalized
        randomString += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)).toUpperCase();
    
        // Generate the rest of the string
        for (let charIndex = 1; charIndex < 6; charIndex++) {
          randomString += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
        }
        return randomString;
    },

    scrollToIndividual: function(this: AddRewardPage, browser : NightwatchBrowser){
        browser
        .execute(function() {
            document.querySelector('button.no-button')?.scrollIntoView();
        });
    }, 

    scrollToCompetency: function(this: AddRewardPage, browser : NightwatchBrowser){
        browser
        .execute(function() {
            document.querySelector('button.yes-button')?.scrollIntoView();
        });
    } 
}

const addRewardPage : PageObjectModel= {
    url: 'https://nashtechglobal.qa.go1percent.com',
    commands: [addRewardCommands],
    elements: {
        addRewardButton : {
            selector: 'button.addRewardBtn'
        },
        cancelButton : {
            selector: 'button.btn-light'
        },
        addRewardTitle: {
            selector: 'div.modal-header'  
        },
        imageContainer: {
            selector: 'div.ImageMinWidthClass'
        },
        imageCrossButton: {
            selector: 'i[title="Delete"]'
        }, 
        alert: {
            selector: "div[role = 'alert']"
        },
        submitButton: {
            selector: '#submitButton'
        },  
        errorMessage: {
            selector: 'span.errorMessage'
        }, 
        nameField: {
            selector: 'input[formcontrolname="name"]'
        }, 
        descriptionField: {
            selector: 'textarea[formcontrolname="description"]'
        }, 
        pointsNeededToRedeemField: {
            selector: 'input[formcontrolname="pointsNeededToRedeem"]'
        },
        quantityField: {
            selector: 'input[formcontrolname="quantity"]'
        }, 
        expiryDateField: {
            selector: '#expiryDate'
        }, 
        individualButton: {
            selector: 'button.yes-button'  
        }, 
        competencyButton: {
            selector: 'button.no-button'
        },
        imageInput: {
            selector: 'input[type="file"]'
        }
    }
}


export default addRewardPage;
 
export interface AddRewardPage
  extends EnhancedPageObject<typeof addRewardCommands,
  typeof addRewardPage.elements> { }