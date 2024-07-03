module.exports = {

    url: "https://nashtechglobal.qa.go1percent.com/",

    elements: {
        emailInput: '#username',
        passwordInput: '#password',
        signIn: "#kc-login"

    },
    commands: [{
        enterCredentials(email, password) {
            return this
                .setValue('@emailInput', email)
                .pause(1000)
                .setValue('@passwordInput', password)
                .pause(1000)
        },
        signIn() {
            return this
                .click("@signIn")
        },
    }]
};