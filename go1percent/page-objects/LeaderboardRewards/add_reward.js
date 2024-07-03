var addRewardCommands = {

    openAddRewardTab : function () {
        return this
        .waitForElementPresent('@addRewardButton', 5000)
        .click('@addRewardButton')
        .waitForElementPresent('@addRewardTitle', 5000); 
    },

    clickSaveButton : function () {
        return this
        .waitForElementPresent('@submitButton', 5000)
        .click('@submitButton');
    },

    closeAddRewardTab : function () {
        return this
        .waitForElementPresent('@cancelButton', 5000)
        .click('@cancelButton')
        .waitForElementNotPresent('@addRewardTitle', 5000);
    },

    addARewardDetails : function(rewardName, expiryDate){  
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

    setAvailableForIndividual : function(){
        return this
        .execute(function() {
            document.querySelector('button.yes-button').scrollIntoView();
        })
        .waitForElementVisible('@individualButton', 5000)
        .click('@individualButton');
    },
  
    setAvailableForCompetency : function(){
        return this
         .execute(function() {
            document.querySelector('button.no-button').scrollIntoView();
            })
        .waitForElementVisible('@competencyButton', 5000)
        .click('@competencyButton');
    },

  
    enableReward : function(){
        return this
        .waitForElementPresent('@enableButton', 5000)
        .click('@enableButton');
    },

    addImage : function (browser) {
        const path = require('path')
        // return this
        browser
        .isEnabled('input[type="file"]', function(result) {
            if (result.value) {
                // Element is interactable, proceed with file upload
                browser.uploadFile('input[type="file"]', path
                .resolve(__dirname ,'..','..','helpers/Go1PercentFEAutomation/LeaderboardRewards/imageFiles/Reward.jpeg'));
            } else {
                console.error('Element is not interactable');
            }
        });         
    }
    
}

module.exports = {
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
        submitButton: {
            selector: '#submitButton'
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

