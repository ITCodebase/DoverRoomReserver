/** 
 * Helper function to call MS Graph API endpoint
 * using the authorization bearer token scheme
*/
function callMSGraphGet(endpoint, token, updateTheUI) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());
    
    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => updateTheUI(response, endpoint))
        .catch(error => console.log(error));
    
}

function callMSGraphPostEvent(endpoint, token, updateTheUI, eventParams) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);
    headers.append("Content-type", "application/json");

    const start = eventParams[1] + "T" + eventParams[2];
    const end = eventParams[1] + "T" + eventParams[3];

    const subAndBod = "Room Reservation - " + eventParams[0][1];

    const event = JSON.stringify({
      "subject": subAndBod.toString(),
      "body": {
        "contentType": "HTML",
        "content": subAndBod.toString()
      },
      "start": {
          "dateTime": start.toString(),
          "timeZone": "Eastern Standard Time"
      },
      "end": {
        "dateTime": end.toString(),
        "timeZone": "Eastern Standard Time"
      },
      "location": {
          "displayName": eventParams[0][1].toString()
      },
      "attendees": [
        {
          "emailAddress": {
            "address": eventParams[0][0].toString(),
            "name": eventParams[0][1].toString()
          },
          "type": "required"
        }
      ]
    });


    const options = {
      method: "POST",
      headers: headers,
      body: event
    };

    console.log('request made to Graph API at: ' + new Date().toString());
  
    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => updateTheUI(response, endpoint))
        .catch(error => console.log(error));
}



function callMSGraphGetTimes(endpoint, token, updateTheUI, eventParams) {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;

  headers.append("Authorization", bearer);
  headers.append("Content-type", "application/json");
  headers.append("Prefer", 'outlook.timezone="Eastern Standard Time"');

  const start = eventParams[1] + "T08:00:00";
  const end = eventParams[1] + "T17:00:00";


  const event = JSON.stringify({
    "schedules": [eventParams[0].toString()],
    "startTime": {
        "dateTime": start.toString(),
        "timeZone": "Eastern Standard Time"
    },
    "endTime": {
        "dateTime": end.toString(),
        "timeZone": "Eastern Standard Time"
    },
    "availabilityViewInterval": 30
  });

  

  const options = {
    method: "POST",
    headers: headers,
    body: event
  };

  console.log('request made to Graph API at: ' + new Date().toString());


  fetch(endpoint, options)
      .then(response => response.json())
      .then(response => updateTheUI(response, endpoint, response.value[0].availabilityView, eventParams[2]))
      .catch(error => console.log(error));
}