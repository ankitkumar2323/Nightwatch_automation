module.exports = {

  generateRandomString: function () {
    const allowedChars = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
  
    // Generate the first character separately to ensure it's capitalized
    randomString += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)).toUpperCase();
  
    // Generate the rest of the string
    for (let charIndex = 1; charIndex < 6; charIndex++) {
      randomString += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    return randomString;     
  },

  getCurrentDate: function (){
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;   
  },

  getCurrentFormattedDate: function () {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear(); 
    // Return the formatted date
    return `${month} ${day}, ${year}`;
  }

};
  
 
  

  