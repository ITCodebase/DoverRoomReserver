// Create the main myMSALObj instance

// const { response } = require("express");

// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

function selectAccount() {
    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();
    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add choose account code here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
}

function handleResponse(response) {
    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */

    if (response !== null) {
        username = response.account.username;
        showWelcomeMessage(username);
    } else {
        selectAccount();
    }
}

function signIn() {
    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */
    
    myMSALObj.ssoSilent(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.error(error);

            myMSALObj.loginPopup(loginRequest)
                .then(handleResponse)
                .catch(error => {
                    console.error(error);
            });
    });
    
}

function signOut() {
    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username),
        postLogoutRedirectUri: msalConfig.auth.redirectUri,
        mainWindowRedirectUri: msalConfig.auth.redirectUri
    };

    myMSALObj.logoutPopup(logoutRequest);
}

function getTokenPopup(request) {
    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccountByUsername(username);
    
    return myMSALObj.acquireTokenSilent(request)
        .catch(error => {
            console.warn("silent token acquisition fails. acquiring token using popup");
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj.acquireTokenPopup(request)
                    .then(tokenResponse => {
                        console.log(tokenResponse);
                        return tokenResponse;
                    }).catch(error => {
                        console.error(error);
                    });
            } else {
                console.warn(error);   
            }
    });
}

function seeProfile() {
    getTokenPopup(loginRequest)
        .then(response => {
            callMSGraphGet(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}

function readMail() {
    getTokenPopup(tokenRequest)
        .then(response => {
            callMSGraphGet(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
        }).catch(error => {
            console.error(error);
        });
}

function createE() {
    const selectedRoom = document.getElementById("roomOptions");
    const selectedRoomText = $("#roomOptions option:selected").text();
    const selectedDate = document.querySelector('input[id="dateOption"]').value;
    const startTime = document.querySelector("#timeStartOptions").value;
    const endTime = document.querySelector("#timeEndOptions").value;


    getTokenPopup(tokenRequest)
        .then(response => {
            callMSGraphPostEvent(graphConfig.graphEventEnpoint, response.accessToken, updateUI, [[selectedRoom.value, selectedRoomText], selectedDate, startTime, endTime]);
        }).catch(error => {
            console.error(error);
        });
}

function findAvailableTimes(passVar) {

    const selectedRoom = document.getElementById("roomOptions");
    const selectedDate = document.querySelector('input[id="dateOption"]').value;

    getTokenPopup(tokenRequest)
        .then(response => {
            callMSGraphGetTimes(graphConfig.graphAvailabilityEnpoint, response.accessToken, updateUI, [selectedRoom.value, selectedDate, passVar]);
        }).catch(error => {
            console.error(error);
        });
}

selectAccount();