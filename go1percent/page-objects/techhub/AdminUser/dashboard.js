module.exports = {
    url: "",

    elements: {
        Approvals: ".navbar-nav .nav-item:nth-child(4) h6",
        TechHub: 'a[href="/tech-hub/view"]',
    },
    commands: [{
        Navigate_To_TechHub() {
            return this
                .click("@Approvals")
                .click("@TechHub")
        },
    }]
};