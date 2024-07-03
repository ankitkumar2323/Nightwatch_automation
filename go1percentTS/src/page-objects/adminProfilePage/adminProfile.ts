import { PageObjectModel, EnhancedPageObject } from "nightwatch";

const adminProfileCommands = {

    adminProfileGetText(this: AdminProfilePage, textLocator : string){
        return this
        .waitForElementPresent('@rewardImg', 10000)
        .getText(textLocator, (textValue)=>{
             console.log("textValue : " + textValue.value)
            return textValue.value;
        })                                                                                                                                                              
    }
}

const admin_profile : PageObjectModel = {

    elements : {
        studioName : 'span.studio',
        adminPoints : {
            selector : "//span[text()='Points']/preceding-sibling::h4",
            locateStrategy : 'xpath'
        },
        adminRank : { 
            selector : " //span[text()='Overall Rank']/preceding-sibling::h4",
            locateStrategy : 'xpath'
        },
        adminMonthlyScore : {
            selector : "//span[text()='Monthly Score']/preceding-sibling::h4",
            locateStrategy : 'xpath'
        },
        rewardImg : 'img[alt=reward]'
    },
    commands : [adminProfileCommands]
}

export default admin_profile;
export interface AdminProfilePage extends EnhancedPageObject <typeof adminProfileCommands, typeof admin_profile.elements>{}
