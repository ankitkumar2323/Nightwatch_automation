
module.exports={
    elements:{
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
    },
    commands:[{

      Submitdisabled: function(attributeName) {
        return this
        .expect.element("@submit").to.have.attribute(attributeName);
        
      },
      Textcontain: function(message) {
        return this
        .assert.containsText("@dialogmessage", message);     
      },
     Buttontext: function() {
        return this
        .getText('@contributiontext', function(result) {
          const buttonText = result.value;
  
          // Compare the button text with the expected text
          this.assert.equal(buttonText, 'ADD A CONTRIBUTION');
        })    
      },
      Futuredate: function() {
        return this
        .execute(function() {
          var inputElement = document.querySelector('#contributionDate');
          if (inputElement) {
            var today= new Date();
            today.setDate(today.getDate()+7);
            const futureDate = today.toISOString().split('T')[0];
            inputElement.value = futureDate; 
            // Optionally, trigger the "input" event to mimic user input
            var event = new Event('input', { bubbles: true });
         inputElement.dispatchEvent(event);
           } 
         })
      },

      Alerttext: function() {
        return this
        .assert.containsText("@body", 'Contribution date is not valid');     
      }
    

      
     

    }]
};