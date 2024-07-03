elements = {

    settings: {
        selector: "#navbar div.desktop-header app-dropdown-wrapper i"
    },

    profile: {
        selector: "div[class = 'd-flex py-1 mt-1']"
    },

    contributionsButton: {
        selector: "div.tabs-card>ul>li:nth-child(3)>a"
    },

    onlineCourseContribution: {
        selector: "div.studio-member div:nth-child(2)  div.col-xxl-3.col-lg-3.col-md-3.col-sm-6.d-flex"
    },

    contribution: {
        selector: "div.studio-member div:nth-child(3)  div.col-xxl-3.col-lg-3.col-md-3.col-sm-6.d-flex"
    },
        
    editButton: {
        selector: "button.btn.btn-primary.text-white.mx-2",
    },

    title: {
        selector: "form > div:nth-child(2) > input"
    },

    description: {
        selector: "form > div:nth-child(4) > textarea"
    },

    url: {
        selector: "body modal-container:nth-child(12) div app-add-contribution form div.col.form-group.mb-3.mx-2 input"
    },

    saveButton: {
        selector: "modal-container:nth-child(12) > div.modal-dialog > div > div.modal-footer > button"
    },

    contributionType: {
        selector: "#contributionType"
    },

    contributionDate: {
        selector: "#contributionDate"
    },

    searchBar: {
        selector: "div.col-lg-8 div:nth-child(3) app-contribution div.row.g-2 div:nth-child(2) input"
    }, 

    alert: {
        selector: "div[role = 'alert']"
    },

    results: {
        selector: 'div.studio-member div div div.col-xxl-3.col-lg-3.col-md-3.col-sm-6.d-flex.flex-column.text-center'
    }
};

commands = [
    {
        clickSettings(){
            return this.
                waitForElementVisible('@settings')
                .click('@settings')
        },

        clickProfile(){
            return this.
                waitForElementVisible('@profile')
                .click('@profile')
        },

        clickContributions(){
            return this.
                waitForElementVisible('@contributionsButton')
                .click('@contributionsButton')
        },

        clickContribution(){
            return this.
                waitForElementVisible('@contribution')
                .click('@contribution')
        },

        clickEditButton(){
            return this.
                waitForElementVisible('@editButton')
                .click('@editButton')
        },

        editTitle(){
            return this.
                waitForElementVisible('@title')
                .clearValue('@title')
                .setValue('@title', 'test contri')
        },

        editDesciption(){
            return this.
                waitForElementVisible('@description')
                .clearValue('@description')
                .setValue('@description', 'test contribution')
        },

        editUrl(url){
            return this.
                waitForElementVisible('@url')
                .clearValue('@url')
                .setValue('@url', url)
        },

        clickOnlineCourseContribution(){
            return this.
            waitForElementVisible('@onlineCourseContribution')
            .click('@onlineCourseContribution')
        },

        clickSearchBar() {
            return this.
            waitForElementVisible('@searchBar')
            .click('@searchBar')
        },

        searchContribution(value){
            return this.
            waitForElementVisible('@searchBar')
            .setValue('@searchBar', value)
            .pause(3000)
        }, 

    }
]

module.exports = {
    elements: elements,
    commands: commands,
    url: "https://nashtechglobal.qa.go1percent.com"
}
