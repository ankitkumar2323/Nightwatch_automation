module.exports = {
    url: "",

    elements: {
        Approve_Button: '.modal-footer .btn.success-color',
        Reject_Button: '.modal-footer .btn.btn-danger',
        Approve_Toast: '#toast-container',
        Reviewer_Comment: '.modal-body textarea.reward-controls',
        Reviewer_Comment_error_message: '.errorMessage',
        GitHub_Url: '.modal-body div>label+u>a.text-size',

    },

    commands: [{
        Approve_Request() {
            return this
                .click("@Approve_Button")
        },
        Reject_Request(browser) {
            return this
                .setValue('@Reviewer_Comment', 'Rejected')
                .click("@Reject_Button")
        },
        Reject_Request_Without_Reviewer_Comment(browser) {
            return this
                .click("@Reject_Button")
        },
        Navigate_to_GitHUb_URL(browser) {
            return this
                .click('@GitHub_Url')
                .pause(5000)
        },
    }]
};