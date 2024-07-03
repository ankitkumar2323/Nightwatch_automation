import { addDays, format } from 'date-fns';
import { PageObjectModel, EnhancedPageObject,NightwatchBrowser, NightwatchCallbackResult} from 'nightwatch';

function generatedate(): string{
  var today= new Date();
   const futureDate = addDays(today,7);
 const futureDateString = format(futureDate,'dd/MM/yyyy');
 return futureDateString; 
}

const addContributionElements={
      body: 'body',
      submit:"button[type='submit']",
      cancel:".btn.btn-primary.button.cancel-button.mx-2",
      title:"input[formcontrolname='title']",
      description:"textarea[type='text']",
      url:".form-control.p-2.overall-txt-color.msg-section.ng-untouched.ng-pristine.ng-valid",
      bookurl:".form-control.p-2.overall-txt-color.msg-section.ng-untouched.ng-pristine.ng-invalid",
      videourl:"input[placeholder='Url*']",
      contributiontype:"#contributionType",
      dialogmessage:".modal-title.spanText.text-center.mt-4.mb-2",
      calendar:"#contributionDate",
      contributiontext:".addRewardTxt",
      Invalidcancel:".btn.btn-primary.button.cancel-button.mx-2"
    }
    const addContributionCommands={

      Submitdisabled(this:EnhancedPageObject,attributeName:string){
        return this
        .expect.element("@submit").to.have.attribute(attributeName);
        
      },
      Textcontain (this:EnhancedPageObject,message: string){
        return this
        .assert.textContains("@dialogmessage", message);     
      },
     Buttontext(this: EnhancedPageObject){
        return this
        .getText('@contributiontext', function(result:any) {
          const buttonText = result.value;
  
          // Compare the button text with the expected text
          this.assert.equal(buttonText, 'ADD A CONTRIBUTION');
        })    
      },
     Futuredate(this:EnhancedPageObject) {
      return this
        .setValue('@calendar',generatedate())
                
      },
        Alerttext (this:EnhancedPageObject) {
          return this
          .assert.textContains("@body", 'Contribution date is not valid');     
        }


    }
   
const addContribution : PageObjectModel = {
  elements: addContributionElements,
  commands: [addContributionCommands]
};
export default addContribution;
export interface TechhubPage
    extends EnhancedPageObject<
        typeof addContributionCommands,
        typeof addContributionElements
    > { }