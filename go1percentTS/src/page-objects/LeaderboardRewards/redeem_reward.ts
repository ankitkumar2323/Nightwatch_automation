import { PageObjectModel, EnhancedPageObject } from 'nightwatch';


const redeemRewardCommands = {

    openRewardReport : function (this: RedeemRewardPage) {
        return this
        .click('@rewardReportButton')
        .waitForElementPresent('@employeeName');
    },

    openRedeemRequestWindow : function (this: RedeemRewardPage) {
        return this
        .click('@employeeName')
        .waitForElementPresent('@RedeemRequestWindowTitle', 5000);
    }, 

    closeRedeemRequestWindow : function (this: RedeemRewardPage) {
        return this
        .waitForElementPresent('@closeButton', 5000)
        .click('@closeButton');
    },  

    processReward : function(this: RedeemRewardPage){
        return this
        .waitForElementPresent('@processButton', 5000)
        .click('@processButton');
    },

    switchToCompetency : function(this: RedeemRewardPage){
        return this
        .waitForElementPresent('@iconGrid')
        .waitForElementPresent('@competencyButton', 5000) 
        .click('@competencyButton')
        .waitForElementPresent('@rewardReport', 5000);
    },

    switchToIndividual: function(this: RedeemRewardPage){
        return this
        .waitForElementPresent('@individualButton', 5000) 
        .click('@individualButton');
    },

    setTimeFilterToToday: function(this: RedeemRewardPage){
        return this
        .waitForElementPresent('@timeFilter', 5000) 
        .click('@timeFilter') 
        .waitForElementPresent('@todayOption', 5000)
        .click('@todayOption')
        .click('@timeFilter')
        .waitForElementPresent('@redeemedDate', 5000);
    },


    resetTimeFilter: function(this: RedeemRewardPage){
        return this
        .waitForElementPresent('@timeFilter', 5000) 
        .click('@timeFilter') 
        .waitForElementPresent('@allTimeOption', 5000)
        .click('@allTimeOption')
        .click('@timeFilter');
    },

    setStatusFilterToProcessing: function(this: RedeemRewardPage){
        return this
        .waitForElementPresent('@statusFilter', 5000) 
        .click('@statusFilter') 
        .waitForElementPresent('@processingOption', 5000)
        .click('@processingOption')
        .click('@statusFilter');
    },

    setStatusFilterToProcessed: function(this: RedeemRewardPage){
        return this
        .waitForElementPresent('@statusFilter', 5000) 
        .click('@statusFilter') 
        .waitForElementPresent('@processedOption', 5000)
        .click('@processedOption')
        .click('@statusFilter');
    },

    resetStatusFilter: function(this: RedeemRewardPage){
        return this
        .waitForElementPresent('@statusFilter', 5000) 
        .click('@statusFilter') 
        .waitForElementPresent('@allStatusOption', 5000)
        .click('@allStatusOption')
        .click('@statusFilter')
        .waitForElementPresent('@employeeName');
    },

    searchNasher: function(this: RedeemRewardPage, name : string){
        return this
        .waitForElementPresent('@searchFeild', 5000) 
        .setValue('@searchFeild', name);
    },


    getCurrentFormattedDate: function () : string{
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentDate = new Date();
        const month = months[currentDate.getMonth()];
        const day = currentDate.getDate();
        const year = currentDate.getFullYear(); 
        // Return the formatted date
        return `${month} ${day}, ${year}`;
    },

    getDetailsOfRedeemReward(callback: (rewardDetails: Record<string, string>) => void) {
        const rewardDetails: Record<string, string> = {};
    
        browser
            .getText('.card-body h5', function (result) {
                rewardDetails.owner = String(result.value);
            })
            .getText('.modal-body h5', function (result) {
                rewardDetails.reward = String(result.value);
            })
            .getText('small.font-weight-bold.ms-0', function (result) {
                rewardDetails.competency = String(result.value);
            })
            .getText('.card-body strong', function (result) {
                rewardDetails.redeemedDate = String(result.value);
            })
            .perform(function () {
                // Pass the employee details back to the callback
                callback(rewardDetails);
            });
    }
}

const redeemRewardPage : PageObjectModel= {
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


export default redeemRewardPage;
 
export interface RedeemRewardPage
  extends EnhancedPageObject<typeof redeemRewardCommands,
  typeof redeemRewardPage.elements> { }
