var redeemRewardCommands = {

    openRewardReport : function () {
        return this
        .click('@rewardReportButton')
        .waitForElementPresent('@employeeName');
    },

    openRedeemRequestWindow : function () {
        return this
        .click('@employeeName')
        .waitForElementPresent('@RedeemRequestWindowTitle', 5000);
    }, 

    closeRedeemRequestWindow : function () {
        return this
        .waitForElementPresent('@closeButton', 5000)
        .click('@closeButton');
    },  

    processReward : function(){
        return this
        .waitForElementPresent('@processButton', 5000)
        .click('@processButton');
    },

    switchToCompetency : function(){
        return this
        .waitForElementPresent('@iconGrid')
        .waitForElementPresent('@competencyButton', 5000) 
        .click('@competencyButton')
        .waitForElementPresent('@rewardReport', 5000);
    },

    switchToIndividual: function(){
        return this
        .waitForElementPresent('@individualButton', 5000) 
        .click('@individualButton');
    },

    setTimeFilterToToday: function(){
        return this
        .waitForElementPresent('@timeFilter', 5000) 
        .click('@timeFilter') 
        .waitForElementPresent('@todayOption', 5000)
        .click('@todayOption')
        .click('@timeFilter')
        .waitForElementPresent('@redeemedDate', 5000);
    },


    resetTimeFilter: function(){
        return this
        .waitForElementPresent('@timeFilter', 5000) 
        .click('@timeFilter') 
        .waitForElementPresent('@allTimeOption', 5000)
        .click('@allTimeOption')
        .click('@timeFilter');
    },

    setStatusFilterToProcessing: function(){
        return this
        .waitForElementPresent('@statusFilter', 5000) 
        .click('@statusFilter') 
        .waitForElementPresent('@processingOption', 5000)
        .click('@processingOption')
        .click('@statusFilter');
    },

    setStatusFilterToProcessed: function(){
        return this
        .waitForElementPresent('@statusFilter', 5000) 
        .click('@statusFilter') 
        .waitForElementPresent('@processedOption', 5000)
        .click('@processedOption')
        .click('@statusFilter');
    },

    resetStatusFilter: function(){
        return this
        .waitForElementPresent('@statusFilter', 5000) 
        .click('@statusFilter') 
        .waitForElementPresent('@allStatusOption', 5000)
        .click('@allStatusOption')
        .click('@statusFilter')
        .waitForElementPresent('@employeeName');
    },

    searchNasher: function(name){5
        return this
        .waitForElementPresent('@searchFeild', 5000) 
        .setValue('@searchFeild', name)
        .waitForElementPresent('@rewardReport', 5000);
    },


    getDetailsOfRedeemReward: function (callback) {
        var rewardDetails = {};
        return this
        .getText('@rewardOwner', function (result) {
            rewardDetails.owner = result.value;
        })
        // Add more getText calls for other details as needed
        .getText('@redeemedReward', function (result) {
            rewardDetails.reward = result.value;
        })
        .getText('@rewardOwnerCompetency', function (result) {
            rewardDetails.competency = result.value;
        })
        .getText('@redeemedOnDate', function (result) {
            rewardDetails.redeemedDate = result.value;
        })
        // Add more getText calls for other details as needed
        .perform(function () {
            // Pass the employee details back to the callback
            callback(rewardDetails);
        });
    }
    
}

module.exports = {
    url: 'https://nashtechglobal.qa.go1percent.com',
    commands: [redeemRewardCommands],
    elements: {
        rewardReportButton : {
            selector: 'button.reportRewardBtn'
        },
        iconGrid: {
            selector: '#icon-grid'
        }, 
        competencyName: {
            selector: '#icon-grid div:nth-child(1) small'  
        },
        rewardName: {
            selector: 'h6.mb-n1.me-1'
        },
        RedeemRequestWindowTitle: {
            selector: 'h5.modal-title'
        }, 
        closeButton: {
            selector: 'span.cancel-modal'
        }, 
        processButton: {
            selector: '#submitButton'
        },  
        competencyButton: {
            selector: 'li:nth-child(2) > a.cursor-pointer'
        },
        individualButton: {
            selector: 'li:nth-child(1) > a.cursor-pointer'
        },
        showMoreCard: {
            selector: 'div.show-more'
        }, 
        timeFilter: {
            selector: '#rewardType'
        },  
        allTimeOption: {
            selector: 'option.pb-3'
        }, 
        statusFilter: {
            selector: 'select.form-control.cursor-pointer.py-3.px-2.mb-2'
        },    
        searchFeild: {
            selector: 'input[type="text"]'
        }, 
        rewardOwner: {
            selector: '.card-body h5'
        }, 
        redeemedReward: {
            selector: '.modal-body h5'
        }, 
        rewardOwnerCompetency: {
            selector: 'small.font-weight-bold.ms-0'
        }, 
        redeemedOnDate: {
            selector: '.card-body strong'
        },
        redeemedDate: {
            selector: '#icon-grid div:nth-child(3)  small'  
        }, 
        rewardReport: {
            selector: 'div.card > h5'
        }, 
        todayOption: {
            selector: '#rewardType > option:nth-child(2)'
        }, 
        allStatusOption: {
            selector: 'select.form-control.cursor-pointer.py-3.px-2.mb-2 > option.pb-3'
        }, 
        processingOption: {
            selector: 'select.form-control.cursor-pointer.py-3.px-2.mb-2 > option:nth-child(2)'
        },  
        processedOption: {
            selector: 'select.form-control.cursor-pointer.py-3.px-2.mb-2 > option:nth-child(3)'
        }, 
        statusButton: {
            selector: '#icon-grid button'
        }, 
        employeeName: {
            selector: '#icon-grid div:nth-child(1)  h6'
        }, 
        redeemPoints: {
            selector: 'div.col-xxl-4.d-flex small'
        }, 
    }
}

