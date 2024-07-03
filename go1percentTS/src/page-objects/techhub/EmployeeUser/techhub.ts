import { PageObjectModel, EnhancedPageObject } from 'nightwatch';

const techhubCommands = {
    
    loginGo1(this: TechhubTest, username: string, password: string) {
        return this
          .waitForElementVisible('#kc-page-title')
          .setValue('@username', username)
          .setValue('@password', password)
          .pause(1000);
      },
  
      signIn: function (this: TechhubTest) {
          return this
          .click('@submit')
      },

      navigateToSettings: function (this: TechhubTest) {
        return this
        .waitForElementVisible('@SettingsButton')
        .click('@SettingsButton')
      },

      navigateToProfile: function (this: TechhubTest) {
        return this
        .waitForElementVisible('@Profile')
        .click('@Profile')
      },

      navigateToTechhub: function (this: TechhubTest) {
        return this
        .waitForElementVisible('@TechhubPage', 5000)
        .click('@TechhubPage')
      },

      navigateToLogout: function (this: TechhubTest) {
        return this
        .waitForElementVisible('@SettingsButton')
        .click('@SettingsButton')
        .waitForElementVisible('@Logout')
        .click('@Logout')
      },

      navigateToPendingTechHubSearch: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@pendingTab')
        .click('@pendingTab')
        .click('@pendingTab')
        .click('@searchBar')
      },

      searchForPendingTechhub: function(this: TechhubTest) {
        return this
        .setValue('@searchBar', "Test")
        .pause(10000)
        .waitForElementVisible('@searchResultInPendingTab')
      },

      navigateToRequestARepoOrBranch: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@requestRepoOrBranchTab')
        .click('@requestRepoOrBranchTab')
        .waitForElementVisible('@descriptionTextarea')
      },

      setSmallDescriptionValue: function(this: TechhubTest) {
        return this
        .click('@descriptionTextarea')
        .setValue('@descriptionTextarea', 'testingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtesting')
      },

      setLargeDescriptionValue: function(this: TechhubTest) {
        return this
        .click('@descriptionTextarea')
        .setValue('@descriptionTextarea', 'testingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtesting')
      },

      closeRequestARepoOrBranch: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@closeTab')
        .click('@closeTab')
      },

      closeApprovedTechHub: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@closeApprovedTechhub')
        .click('@closeApprovedTechhub')
      },

      navigateToSearchInAllTechHub: function(this: TechhubTest) {
        return this
            .waitForElementVisible('@allTechHubTab')
            .click('@allTechHubTab')
            .click('@allTechHubSearchBar')
      },

      searchInAllTechhub: function(this: TechhubTest) {
        return this
        .setValue('@allTechHubSearchBar', "TestingTechHub")
        .pause(10000)
        .waitForElementVisible('@searchResultInAllTechhubTab')
      },

      navigateToPendingTechHub: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@pendingTab', 2000)
        .click('@pendingTab')
      },

      searchForTechhubInReview: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@inReviewTab')
        .click('@inReviewTab')
      },

      clearSearch: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@searchBar')
        .setValue('@searchBar', "")
      },

      navigateToGithubUrl: function(this: TechhubTest) {
        return this
            .waitForElementVisible('@approvedTab')
            .click('@approvedTab')
            .waitForElementPresent('@githubUrl')
            .click('@githubUrl')
      },
           
      verifyGithubTitle: function(this: TechhubTest) {
        return this
            .pause(2000)
            .getTitle(function name(title: string) {
                expect(title).to.contain('GitHub - NashTech-Labs/')
        })
      },
      
      allFieldsPendingPage: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@pendingTechhubRecords')
        .getText('@NoOfRecords', function totalRecords(records: any){
            expect(records.value).to.contain('Total Records:')
        })
        .pause(10000)
      },

      setTitleValue: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@techhubTitle')
        .click('@techhubTitle')
        .setValue('@techhubTitle', "TestAutomationPurpose")
      },

      setCaptionValue:function(this: TechhubTest) {
        return this
        .click('@techhubCaption')
        .setValue('@techhubCaption', "TestingTechHubSubmission")
        
      },

      setDescriptionValue: function(this: TechhubTest) {
        return this
        .click('@techhubDescription')
        .setValue('@techhubDescription', "testingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtesting")
      },

      setBranchValue: function(this: TechhubTest) {
        return this
        .click('@techhubBranch')
        .setValue('@techhubBranch', "main")
      },

      setTagsValue: function(this: TechhubTest) {
        return this
        .click('@techhubTags')
        .setValue('@techhubTags', "tagForTesting")
      },

      clickSubmitButton: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@submitButton')
        .click('@submitButton')
      },

      setBaseLanguage: function(this: TechhubTest) {
        return this
        .waitForElementPresent('@techhubBaseLanguage')
        .click('@techhubBaseLanguage')
        .waitForElementVisible('@baseLanguageJava')
        .click('@baseLanguageJava')
      },

      setCategory: function(this: TechhubTest) {
        return this
        .waitForElementPresent('@techhubCategory')
        .click('@techhubCategory')
        .waitForElementVisible('@learningCategory')
        .click('@learningCategory')
      },

      navigateToTechhubInDraft: function(this: TechhubTest) {
        return this
        .waitForElementPresent('@draftTab', 5000)
        .click('@draftTab')
        .pause(5000)
        .waitForElementPresent('@techhubPage')
      },


      techhubInreviewPage: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@pendingTab')
        .click('@pendingTab')
        .click('@searchBar')
        .setValue('@searchBar', "testing_title-repos")
        .waitForElementVisible('@searchResultInReview')
        .click('@searchResultInReview')
        .waitForElementNotPresent('@viewTechhub')
        .setValue('@searchBar', "")
      },

      openDetailsofApprovedTechHub: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@allTechHubTab')
        .click('@allTechHubTab')
        .waitForElementVisible('@approvedTab', 5000)
        .click('@approvedTab')
        .waitForElementPresent('@viewTechhub')
        .waitForElementPresent('@approvedStatusInTechhub')
        .click('@closeTab')
      },

      navigateToAllTechhub: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@allTechHubTab')
        .click('@allTechHubTab')
        .pause(5000)
      },

      clickOnapprovedTab: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@approvedTab', 5000)
        .click('@approvedTab')
      },

      verifyTechHubTitle: function(this: TechhubTest) {
        return this
        .waitForElementVisible('@techhubInreviewAfterReview')
        .getText('@techhubInreviewAfterReview', function verifyName(name: any){
          expect(name.value).to.equal("TestAutomationPurpose");
        })
      },

      verifyTechHubDate: function(this: TechhubTest) {
        const currentDate = new Date();
      // Convert the numeric month to the format used on the page
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentMonthOnPage = months[currentDate.getMonth()];

      return this
      .waitForElementVisible('@dateOfTechhubInreview')
      .getText('@dateOfTechhubInreview', function verifyDate(date: any) {
      const dateOnPage = date.value;
      var dateParts = dateOnPage.split(' ');
      const dayOnPage = dateParts[0];
      const currentDay = String(currentDate.getDate()).padStart(2, '0'); // Add leading zeros
      expect(dayOnPage).to.equal(currentDay);
      expect(dateParts[1]).to.equal(currentMonthOnPage);
      expect(dateParts[2]).to.equal(currentDate.getFullYear().toString());
        });
      },    
  };
  
  const techhubTest: PageObjectModel = {

    commands: [techhubCommands],

    elements: {
      username: '#username',
      password: '#password',
      submit: '#kc-login',
      SettingsButton: 'i[class="material-icons user-icon"]',
      Profile: 'div[class = "d-flex py-1 mt-1"]',
      Logout: '#navbar div:nth-child(2) > div:nth-child(2) h6 > span',
      TechhubPage: "li[class*='nav-item ']:nth-child(4)",
      pendingTab: 'li.mt-2:nth-child(2) > a:nth-child(1)',
      searchBar: 'div.row.g-2 input',
      pendingTechhubRecords: 'div[class="studio-member-card cursor-pointer my-4 px-2 py-3"]',
      NoOfRecords: 'span[class="ml-2"]',
      requestRepoOrBranchTab: 'span.addRewardTxt',
      descriptionTextarea: 'textarea[formcontrolname="description"]',
      closeTab: 'button.btn.btn-primary.button.cancel-button.mx-2',
      closeApprovedTechhub: 'button[class="btn btn-primary button cancel-button mx-2"]',
      allTechHubTab: 'li.mt-2:nth-child(1) > a:nth-child(1)',
      allTechHubSearchBar: 'div.row.g-2 input',
      approvedTab: 'h6[class="mb-0 rank status approvedStatus"]',
      githubUrl: 'div.col.mb-3.mx-2.d-flex.flex-column a',
      draftTechhub: 'h6[class="mb-0 rank status pendingStatus"]',
      techhubPage: 'div.modal-header.bg-gradient-dark.px-4.pt-4 h5',
      techhubTitle: 'input[formcontrolname="title"]',
      techhubCaption: 'input[formcontrolname="caption"]',
      techhubDescription: 'textarea[type = "text"]',
      techhubBranch: 'input[formcontrolname="branch"]',
      techhubTags: 'input[formcontrolname="tags"]',
      techhubCategory: '#category',
      learningCategory: '#category > option:nth-child(2)',
      techhubBaseLanguage: '#baseLanguage',
      baseLanguageJava: '#baseLanguage > option:nth-child(12)',
      approvedTechhub: 'h6[class="mb-0 rank status approvedStatus"]',
      searchResultInReview: 'body div.studio-member > div:nth-child(2)',
      viewTechhub: 'h5[class="fw-bold modal-title pull-left ms-2"]',
      approvedStatusInTechhub: 'span[class="status text-capitalize approvedStatus"]',
      techhubInreviewAfterReview: 'h6[class="topic-text"]',
      dateOfTechhubInreview: 'h6[class="mb-0 rank"]',
      draftTab: 'h6[class="mb-0 rank status pendingStatus"]',
      inReviewTab: 'h6[class="mb-0 rank status reviewStatus"]',
      searchResultInPendingTab: 'div[class="studio-member-card cursor-pointer my-4 px-2 py-3"]',
      searchResultInAllTechhubTab: 'div[class="col-xxl-4 col-lg-4 col-md-4 d-flex"]',
      submissionPopupAlert: "div[role='alert']",
      errorMessage: 'span[class="errorMessage"]',
      repoName: 'input[formcontrolname="name"]',
      repoTechnology: 'select[id="technology"]',
      repoDescription: 'textarea[formcontrolname="description"]',
      submitButton: 'button.btn.btn-primary.text-white.mx-2',
    }
  };
  
  export default techhubTest;
  
  export interface TechhubTest
    extends EnhancedPageObject<typeof techhubCommands,
    typeof techhubTest.elements> { }
