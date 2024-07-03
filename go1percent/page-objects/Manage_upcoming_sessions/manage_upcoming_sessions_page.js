module.exports = {
  url: "https://auth.go1percent.com/auth/realms/nashtech/protocol/openid-connect/auth?client_id=leaderboard-qa-ui&redirect_uri=https%3A%2F%2Fnashtechglobal.qa.go1percent.com%2Fmy-dashboard&state=7de7e7bd-6b8d-4b0c-8830-45de7ac2fc04&response_mode=fragment&response_type=code&scope=openid&nonce=4aac895f-3ab1-4306-8adb-ba8da25c147b",

  elements: {
    emailInput: '#username',
    passwordInput: '#password',
    signIn: "#kc-login",
    adminLink: {
      selector :"//h6[normalize-space()='ADMIN']", 
      locateStrategy: 'xpath'
      },
    knolx: {
      selector :"//span[normalize-space()='Knolx']", 
      locateStrategy: 'xpath'
      },
    manageSessions: {
      selector :"//a[@href='/knolx/requested-sessions']", 
      locateStrategy: 'xpath'
      },
    requested: {
      selector :"//a[normalize-space()='Requested']", 
      locateStrategy: 'xpath'
      },
    upcoming: {
      selector :"//a[normalize-space()='Upcoming']", 
      locateStrategy: 'xpath'
      },
    totalrecords: '.ml-2',

    edittitlebutton: {
      selector :"(//span[@title='Edit'][normalize-space()='edit'])[1]", 
      locateStrategy: 'xpath'
      },
    
    titleupdate: {
      selector :"div[class='mt-2'] button[class='btn btn-primary edit-session-button']", 
      },
    newtitle:{
      selector :"input[type='text']",
      },
    savetitle: {
      selector :"div[class='mt-2'] button[class='btn btn-primary save-session-button']",
      },
    titlecheck: "div[class='topic-div'] h3",
    
    addtags: {
      selector :"a[role='button']",
      },
    newtag: {
      selector :".bg-transparent.spanText.text-sm.px-1.mr-2.tag-form-control.ng-untouched.ng-pristine.ng-valid",
      },
    savetag: {
      selector :"button[type='submit']",
      },
    tagcheck:".items",

    adddescription: {
      selector :"div[class='d-flex justify-content-end'] button[class='btn btn-primary edit-session-button']",
      },
    newdescription: {
      selector :"textarea[type='text']",
      },
    savedescription: {
      selector :"div[class='d-flex justify-content-end'] button[class='btn btn-primary save-session-button ng-star-inserted']",
      },
    descriptioncheck: 'div[class="desc-outline-div ng-star-inserted"]',
    
    //both slider and youtube url keep switching and swapping the input field selector we im using the full path for no conflicts during updates
    addsliderurl: {
      selector :"div[class='slide-url-button-div mt-3'] button[class='btn btn-primary edit-session-button']",
      },
    newsliderurl: {
      selector :"(//input[@class='bg-transparent spanText text-sm px-1 mr-2 session-input div-item ng-touched ng-pristine ng-valid ng-star-inserted'])[1]",
      locateStrategy: 'xpath'
      },
    savesliderurl: {
      selector :".btn.btn-primary.save-session-button.ng-star-inserted",
      },
    sliderurlcheck: ".outline-div.div-item.ng-star-inserted",
    
    addyturl: {
      selector :"div[class='youtube-url-button-div mt-3'] button[class='btn btn-primary edit-session-button']",
      },
    newyturl: {
      selector :"(//input[@class='bg-transparent spanText text-sm px-1 mr-2 session-input w-100 ng-star-inserted ng-dirty ng-valid ng-touched'])[1]",
      locateStrategy: 'xpath'
      },
    saveyturl: {
      selector :"div[class='youtube-url-button-div mt-3'] button[class='btn btn-primary save-session-button']",
      },
    yturlcheck:".outline-div.w-100.ng-star-inserted",

    sessioncancelling: {
      selector :".bg-transparent.border.border-white.spanText.mt-1.yes-button",
      },
    commentforsession: {
      selector :"(//textarea[@placeholder='Please specify why the session has been cancelled'])[1]",
      locateStrategy: 'xpath'
      },
    report: {
      selector :"div[class='cancel-button-div d-flex justify-content-end'] button[class='btn btn-primary save-session-button ng-star-inserted']",
      },


    feedbackform: {
      selector :"select[name='quarter']",
      },
    updateform: {
      selector :".btn.btn-primary.save-session-button.save-session",
      },
    formcheck: "select[name='quarter']",

    sendinstructions: {
      selector :".btn.btn-secondary.instructionButton",
      },

    sendinstructions: {
      selector :"div[class='approveAndInstruction'] button:nth-child(1)",
    },

  },

  commands: [{
          //login
          enterCredentials(email, password) {
          return this
              .setValue('@emailInput', email)
              .setValue('@passwordInput', password)
          },
          signIn() {
          return this.click("@signIn")
          },
          //navigating to the session details
          clickAdmin() {
          return this.click('@adminLink')
          },
          clickKnolx() {
          return this.click('@knolx')
          },
          clickmanageSession() {
          return this.click('@manageSessions')
          },
          clickRequested() {
          return this.click('@requested')
          },
          clickUpcoming() {
          return this.click('@upcoming')
          },

          //title edit
          clickEditTitleButton() {
          return this.click('@edittitlebutton')
          },
          clickTitleupdate() {
          return this.click('@titleupdate')
          },
          updateTitle(text) {
          return this.clearValue('@newtitle').setValue('@newtitle', text)
          },
          clickSaveTitle() {
          return this.click('@savetitle')
          },

          //tag edit
          clickEditTagButton() {
          return this.click('@addtags')
          },
          TagUpdate(text) {
          return this.setValue('@newtag', text)
          },
          clickSaveTag() {
          return this.click('@savetag')
          },

          //description edit
          clickEditdescriptionButton() {
          return this.click('@adddescription')
          },
          DescriptionUpdate(text) {
          return this.clearValue('@newdescription').setValue('@newdescription', text)
          },
          clickSavedesciption() {
          return this.click('@savedescription')
          },

          //SliderUrl edit
          clickEditSliderUrlButton() {
          return this.click('@addsliderurl')
          },
          SliderUrlUpdate(text) {
          return this.clearValue('@newsliderurl').setValue('@newsliderurl', text)
          },
          clickSaveSliderUrl() {
          return this.click('@savesliderurl')
          },

          //YoutubeUrl edit
          clickEditYoutubeUrlButton() {
          return this.click('@addyturl')
          },
          YoutubeUrlUpdate(text) {
          return this.clearValue('@newyturl').setValue('@newyturl', text)
          },
          clickSaveYoutubeUrl() {
          return this.click('@saveyturl')
          },

          //canceling the session
          clickEditsessioncancelButton() {
          return this.click('@sessioncancelling')
          },
          SessionreportUpdate(text) {
          return this.setValue('@commentforsession', text)
          },
          clickReport() {
          return this.click('@report')
          },

          //session feedback
          clickEditfeedbackformButton(optionvalue) {
          return this
              .click('@feedbackform')
              .setValue('@feedbackform',optionvalue)
          },
          clickUpdateform() {
          return this.click('@updateform')
          },

          //sending instructions
          clicksendinstructions() {
          return this.click('@sendinstructions')
          },

  }]
};
