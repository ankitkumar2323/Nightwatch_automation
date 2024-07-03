import { PageObjectModel, EnhancedPageObject } from "nightwatch";


    const techhubDetailElements = {
        Approve_Button: '.modal-footer .btn.success-color',
        Reject_Button: '.modal-footer .btn.btn-danger',
        Approve_Toast: '#toast-container',
        Reviewer_Comment: '.modal-body textarea.reward-controls',
        Reviewer_Comment_error_message: '.errorMessage',
        GitHub_Url: '.modal-body div>label+u>a.text-size',

    };

    const techhubDetailCommands = 
    {
        Approve_Request(this: TechhubDetailPage) {
            return this
                .click("@Approve_Button")
        },

        Reject_Request(this:TechhubDetailPage) {
            return this
                .setValue('@Reviewer_Comment', 'Rejected')
                .click("@Reject_Button")
        },

        Reject_Request_Without_Reviewer_Comment(this: TechhubDetailPage) {
            return this
                .click("@Reject_Button")
        },
        
        Navigate_to_GitHUb_URL(this: TechhubDetailPage) {
            return this
                .click('@GitHub_Url')
                .pause(5000)
        }
    };

        const techhubDetailPage: PageObjectModel = {
            elements: techhubDetailElements,
            commands:[techhubDetailCommands]
    }

    export default techhubDetailPage;
    export interface TechhubDetailPage
    extends EnhancedPageObject<
        typeof techhubDetailCommands,
        typeof techhubDetailElements
    > { }
