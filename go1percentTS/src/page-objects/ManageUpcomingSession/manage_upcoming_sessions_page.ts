import { PageObjectModel, EnhancedPageObject } from 'nightwatch';

const commands = {

  enterCredentials(this: RewardsPage, email: string, password: string) {
      return this
          .setValue('@emailInput', email)
          .setValue('@passwordInput', password)
      },
      signIn(this: RewardsPage) {
      return this.click("@signIn")
      },
      //navigating to the session details
      clickAdmin(this: RewardsPage) {
      return this.click('@adminLink')
      },
      clickKnolx(this: RewardsPage) {
      return this.click('@knolx')
      },
      clickmanageSession(this: RewardsPage) {
      return this.click('@manageSessions')
      },
      clickRequested(this: RewardsPage) {
      return this.click('@requested')
      },
      clickUpcoming(this: RewardsPage) {
      return this.click('@upcoming')
      },

      //title edit
      clickEditTitleButton(this: RewardsPage) {
      return this.click('@edittitlebutton')
      },
      clickTitleupdate(this: RewardsPage) {
      return this.click('@titleupdate')
      },
      updateTitle(this: RewardsPage, text:string) {
      return this.clearValue('@newtitle').setValue('@newtitle', text)
      },
      clickSaveTitle(this: RewardsPage) {
      return this.click('@savetitle')
      },

      //tag edit
      clickEditTagButton(this: RewardsPage) {
      return this.click('@addtags')
      },
      TagUpdate(this: RewardsPage, text:string) {
      return this.setValue('@newtag', text)
      },
      clickSaveTag(this: RewardsPage) {
      return this.click('@savetag')
      },

      //description edit
      clickEditdescriptionButton(this: RewardsPage) {
      return this.click('@adddescription')
      },
      DescriptionUpdate(this: RewardsPage, text:string) {
      return this.clearValue('@newdescription').setValue('@newdescription', text)
      },
      clickSavedesciption(this: RewardsPage) {
      return this.click('@savedescription')
      },

      //SliderUrl edit
      clickEditSliderUrlButton(this: RewardsPage) {
      return this.click('@addsliderurl')
      },
      SliderUrlUpdate(this: RewardsPage, text:string) {
      return this.clearValue('@newsliderurl').setValue('@newsliderurl', text)
      },
      clickSaveSliderUrl(this: RewardsPage) {
      return this.click('@savesliderurl')
      },

      //YoutubeUrl edit
      clickEditYoutubeUrlButton(this: RewardsPage) {
      return this.click('@addyturl')
      },
      YoutubeUrlUpdate(this: RewardsPage, text:string) {
      return this.clearValue('@newyturl').setValue('@newyturl', text)
      },
      clickSaveYoutubeUrl(this: RewardsPage) {
      return this.click('@saveyturl')
      },

      //canceling the session
      clickEditsessioncancelButton(this: RewardsPage) {
      return this.click('@sessioncancelling')
      },
      SessionreportUpdate(this: RewardsPage, text:string) {
      return this.setValue('@commentforsession', text)
      },
      clickReport(this: RewardsPage) {
      return this.click('@report')
      },

      //session feedback
      clickEditfeedbackformButton(this: RewardsPage, optionvalue: string) {
      return this
          .click('@feedbackform')
          .setValue('@feedbackform',optionvalue)
      },
      clickUpdateform(this: RewardsPage) {
      return this.click('@updateform')
      },

      //sending instructions
      clicksendinstructions(this: RewardsPage) {
      return this.click('@sendinstructions')
      },

};

const RewardSectionPage: PageObjectModel = {

  url: "https://nashtechglobal.qa.go1percent.com/my-dashboard",

  commands: [commands],

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
        selector :"div[class='d-flex justify-content-end'] button[class='btn btn-primary save-session-button']",
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
    },

};

export default RewardSectionPage;

export interface RewardsPage
    extends EnhancedPageObject<typeof commands,
        typeof RewardSectionPage.elements> { }