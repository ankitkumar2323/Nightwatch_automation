interface RequestData {
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
    grant_type: string;
}

interface Headers {
    'Authorization': string;
    'Source': string;
}

interface TokenHeaders {
    'Content-Type': string;
    'source': string;
}

interface TokenBody extends RequestData {
}

interface AdminConfig {
    base_url: string;
    requestData: RequestData;
    tokenHeaders: TokenHeaders;
    tokenBody: TokenBody;
}

interface EmployeeConfig {
    headers: {
        accept: string;
        Authorization: string;
        'content-type': string;
        source: string;
    };
}

interface Config {
    admin: AdminConfig;
    employee: EmployeeConfig;
}

const requestData: RequestData = {
    'client_id': 'leaderboard-ui',
    'client_secret': '8090ed15-4cd1-483c-9fee-2a8b35941852',
    'username': 'testemployee',
    'password': 'testemployee',
    'grant_type': 'password'
};


export const config: Config = {
    admin: {
        base_url: 'https://backend.qa.go1percent.com',
        requestData: {
            'client_id': 'leaderboard-ui',
            'client_secret': '8090ed15-4cd1-483c-9fee-2a8b35941852',
            'username': 'testemployee',
            'password': 'testemployee',
            'grant_type': 'password'
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
};