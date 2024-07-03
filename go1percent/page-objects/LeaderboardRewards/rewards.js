var rewardsCommands = {

    goToRewards: function () {
        return this
        .click('@dropDownButton')
        .click('@rewardsOption');
    }

}

module.exports = {
    url: 'https://nashtechglobal.qa.go1percent.com',
   
    commands: [rewardsCommands],
    elements: {
        rewardsOption: {
            selector: 'a.nav-link[href="/rewards/list"]',
        },
        dropDownButton: {
            selector: 'li:nth-child(3) > div.collapsed',
        }

    }
}