import { PageObjectModel, EnhancedPageObject } from 'nightwatch';

const updateRewardCommands = {

    openUpdateTab : function (this: UpdateRewardPage) {
        return this
        .waitForElementPresent('@editButton', 5000)
        .click('@editButton')
        .waitForElementPresent('@updateRewardTitle', 5000);
    },

    editAvailableFor : function (this: UpdateRewardPage) {
        return this
        .waitForElementPresent('@availableForButton', 5000);
    },

    closeUpdateTab : function (this: UpdateRewardPage) {
        return this
        .waitForElementPresent('@cancelButton', 5000)
        .click('@cancelButton')
        .waitForElementNotPresent('@updateRewardTitle', 5000);
    },

    changeExpiryDate : function (this: UpdateRewardPage) {
        return this
        .waitForElementPresent('@expiryDate', 5000)
        .setValue('@expiryDate', '10-08-2027')
        .click('@updateButton');
    },

    deleteReward : function (this: UpdateRewardPage) {
        return this
        .moveToElement('@deleteButton', 0, 0)
        .click('@deleteButton');
    },

    switchToCompetency : function (this: UpdateRewardPage) {
        return this
        .waitForElementPresent('@editButton', 5000)
        .waitForElementPresent('@competencyOption', 5000)
        .click('@competencyOption');
    }
    
}

const updateRewardPage : PageObjectModel = {
    url: 'https://nashtechglobal.qa.go1percent.com',
    commands: [updateRewardCommands],
    elements: {
        currentButton: {
            selector: 'a.newTabs'
        },
        rewardName: {
            selector: 'input[formcontrolname="name"]'
        },
        deleteButton: {
            selector: '#disableButton'
        }, 
        cancelButton: {
            selector: 'button.btn-light'
        }, 
        updateButton: {
            selector: '#updateButton'
        }, 
        alert: {
            selector: "div[role = 'alert']"
        },
        expiryDate: {
            selector: '#expiryDate'
        }, 
        editButton : {
            selector: '.editIcon'
        },
        updateRewardTitle: {
            selector: 'h5.modal-title'
        },
        availableForButton: {
            selector: 'button.no-button'
        },
        expiryDateOfReward: {
            selector: 'div.card-expiry > strong'
        }, 
        competencyOption: {
            selector: 'li:nth-child(2) > a.cursor-pointer'
        }
    }
}

export default updateRewardPage;
export interface UpdateRewardPage
  extends EnhancedPageObject<typeof updateRewardCommands,
  typeof updateRewardPage.elements> { }

  
