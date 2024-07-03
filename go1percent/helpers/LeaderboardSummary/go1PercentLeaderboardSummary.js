
const requestData = {
    'client_id': 'leaderboard-ui',
    'client_secret': '8090ed15-4cd1-483c-9fee-2a8b35941852',
    'username': 'testemployee',
    'password': 'testemployee',
    'grant_type': 'password'
}

module.exports = {

    admin: {
      
        base_url:'https://backend.qa.go1percent.com',
       requestData : {
        'client_id': 'leaderboard-ui',
        'client_secret': '8090ed15-4cd1-483c-9fee-2a8b35941852',
        'username': 'testemployee',
        'password': 'testemployee',
        'grant_type': 'password'
      },
        headers: {
            'Authorization': '',
            'Source': 'https://nashtechglobal.qa.go1percent.com'
        },
        tokenHeaders: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'source': 'https://nashtechglobal.qa.go1percent.com'
        },
        tokenBody: {
            client_id: 'leaderboard-ui',
            client_secret: '8090ed15-4cd1-483c-9fee-2a8b35941852',
            username: 'testadmin',
            password: 'testadmin',
            grant_type: 'password',
        },
    },
  
    employee: {
        headers: {
            "accept": "application/json, text/plain, */*",
            "Authorization": "",
            "content-type": "application/json",
            "source": "https://nashtechglobal.qa.go1percent.com",
        }
    },
}