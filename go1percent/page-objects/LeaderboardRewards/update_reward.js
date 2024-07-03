var updateRewardsCommands = {

    openUpdateTab : function () {
        return this
        .waitForElementPresent('@editButton', 5000)
        .click('@editButton')
        .waitForElementPresent('@updateRewardTitle', 5000);
    },

    editAvailableFor : function () {
        return this
        .waitForElementPresent('@availableForButton', 5000);
    },

    closeUpdateTab : function () {
        return this
        .waitForElementPresent('@cancelButton', 5000)
        .click('@cancelButton')
        .waitForElementNotPresent('@updateRewardTitle', 5000);
    },

    changeExpiryDate : function () {
        return this
        .waitForElementPresent('@expiryDate', 5000)
        .setValue('@expiryDate', new Date('2027-10-08'))
        .click('@updateButton');
    },

    deleteReward : function () {
        return this
        .moveToElement('@deleteButton', 0, 0)
        .click('@deleteButton');
    },

    switchToCompetency : function () {
        return this
        .waitForElementPresent('@editButton', 5000)
        .waitForElementPresent('@competencyOption', 5000)
        .click('@competencyOption');
    }
    
}

module.exports = {
    url: 'https://nashtechglobal.qa.go1percent.com',
    commands: [updateRewardsCommands],
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

