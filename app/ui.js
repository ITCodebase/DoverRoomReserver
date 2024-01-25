// Select DOM elements to work with
const firstWelcome = document.getElementById("firstWelcome");
const welcomeDiv = document.getElementById("WelcomeMessage");
const welcomeName = document.getElementById("WelcomeName")
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");
const eventButton = document.getElementById("createEvent");

const done = document.getElementById("done");
const inBetweenMessage = document.getElementById("inBetweenMessage");
const selectedRoom = document.getElementById("roomOptions");
const timeButton = document.getElementById("findTimes");
const nextButton = document.getElementById("nextTime");
const submitButton = document.getElementById("createEvent");
const selectedDate = document.getElementById("dateOption");
const tryAgainButton = document.getElementById("tryAgain");
const tryAgainButton2 = document.getElementById("tryAgain2");


const selectStartItem = document.getElementById("timeStartOptions");
const selectEndItem = document.getElementById("timeEndOptions");

function showWelcomeMessage(username) {
    // Reconfiguring DOM elements
    firstWelcome.remove();
    cardDiv.style.display = 'initial';
    welcomeDiv.innerHTML = 'Welcome';
    welcomeName.innerHTML = `${username}!`;
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sign Out";

    var today = new Date();
    document.querySelector('input[id="dateOption"]').value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

}


function findTimes(startOrEnd) {
    selectedRoom.disabled = true;
    selectedDate.disabled = true;

    inBetweenMessage.textContent = "";

    var passVar = 0;

    if (startOrEnd == "start"){
        const selectedDate = document.querySelector('input[id="dateOption"]').value;

        const selectedDateObj = new Date(selectedDate);
        selectedDateObj.setDate(selectedDateObj.getDate() + 1);
        const currDate = new Date();

        
        
        if (selectedDateObj >= currDate) {
            inBetweenMessage.innerText = "Please choose a start time";

            timeButton.remove();

            // Determine the times that are available to be scheduled and base the drop downs around them
            
            findAvailableTimes(passVar);

        } else {
            inBetweenMessage.innerText = "Please select a valid date!";
        }
    }

    if (startOrEnd == "end") {
        passVar = 1;

        inBetweenMessage.innerText = "Please choose an end time";

        selectStartItem.disabled = true;

        nextButton.remove();

        findAvailableTimes(passVar);
    }
    

    inBetweenMessage.style.display = 'inline';

}

function updateUI(responseData, endpoint, av = 0, passThru = 0) {
    console.log('Graph API responded at: ' + new Date().toString());

    if (endpoint === graphConfig.graphEventEnpoint) {
        // Say that the meeting is scheduled
        submitButton.remove();
        selectEndItem.disabled = true;
        inBetweenMessage.remove();


        const roomD = document.getElementById("roomDone");
        const dateD = document.getElementById("dateDone");
        const startD = document.getElementById("startDone");
        const endD = document.getElementById("endDone");

        var wholeDate = document.querySelector('input[id="dateOption"]').value.split("-");
        var newDate = wholeDate[1] + "/" + wholeDate[2] + "/" + wholeDate[0];

        roomD.innerText = roomD.innerText + $("#roomOptions option:selected").text();
        dateD.innerText = dateD.innerText + newDate;
        startD.innerText = startD.innerText + $("#timeStartOptions option:selected").text();
        endD.innerText = endD.innerText + $("#timeEndOptions option:selected").text();

        done.style.display = "inline";
        tryAgainButton2.style.display = "inline";

    } else if (endpoint === graphConfig.graphAvailabilityEnpoint) {
        //show the updated time dropdowns here based on the times in the api response
        var timeValues = [];
        var allTimes = [];
        var timesDict = {
            0 : [],
            1 : [],
            2 : [],
            3 : [],
            4 : [],
            5 : [],
            6 : [],
            7 : [],
            8 : [],
            9 : [],
            10 : [],
            11 : [],
            12 : [],
            13 : [],
            14 : [],
            15 : [],
            16 : [],
            17 : [],
            18 : []
        }

        var startHr = 8;
        while (startHr < 18) {
            timeValues.push(startHr);
            timeValues.push(startHr);
            startHr = startHr + 1;
        }
        timeValues.pop();

        startHr = 8;
        while (startHr <= 12) {
            allTimes.push(startHr);
            allTimes.push(startHr);
            startHr = startHr + 1;
        }

        startHr = startHr - 12;
        while (startHr < 6) {
           allTimes.push(startHr);
           allTimes.push(startHr);
           startHr = startHr + 1; 
        }
        allTimes.pop();


        for (i = 0; i < timeValues.length; i++) {
            if (timeValues[i] < 10) {
                var newV = "0" + timeValues[i].toString();
                timeValues.splice(i, 1, newV);
            }
        }

        var allTimesStr = allTimes.map(String);
        var timeValsStr = timeValues.map(String);
        
        var count = 0;
        for (each in allTimesStr) {
            if (count % 2 == 0) {
                var newTime = allTimes[each] + ":00";
                var newVal = timeValues[each] + ":00:00";
                if (count < 8) {
                    newTime = newTime + " AM";
                } else {
                    newTime = newTime + " PM";
                }
            } else {
                var newTime = allTimes[each] + ":30";
                var newVal = timeValues[each] + ":30:00";
                if (count < 8) {
                    newTime = newTime + " AM";
                } else {
                    newTime = newTime + " PM";
                }
            }

            allTimesStr.splice(count, 1, newTime);
            timeValsStr.splice(count, 1, newVal);

            timesDict[each] = [newTime, newVal];
            count = count + 1;
        }        
        
        // Filters the Start times
        if (passThru == 0) {
            for (i = 0; i < allTimesStr.length - 1; i++) {
                if (av[i] != 2) {
                    var el = document.createElement("option");
                    el.textContent = allTimesStr[i];
                    el.value = timeValsStr[i];
                    selectStartItem.appendChild(el);
                }
            }
            
            const dropLen = $('#timeStartOptions option').length;

            if (dropLen != 0) {
                var startDrop = document.getElementById("startTimesDrop");
                startDrop.style.display = 'inline';
                
                var next = document.getElementById("nextTime");
                next.style.display = "inline";
            } else {
                inBetweenMessage.innerText = "This room has no available timeslots for this day.\nPlease choose a different room or a different date";
                tryAgainButton.style.display = "inline";
            }
        }

        if (passThru == 1) {
            var keyVal = 0;
            for(each in timesDict) {
                if (selectStartItem.value == timesDict[each][1]) {
                    keyVal = each;
                }
            }

            keyVal = parseInt(keyVal) + 1;

            for (i = keyVal; i < allTimesStr.length; i++) {
                if (av[i] != 2) {
                    var el = document.createElement("option");
                    el.textContent = allTimesStr[i];
                    el.value = timeValsStr[i];
                    selectEndItem.appendChild(el);
                } else {
                    var el = document.createElement("option");
                    el.textContent = allTimesStr[i];
                    el.value = timeValsStr[i];
                    selectEndItem.appendChild(el);
                    break;
                }
            }

            var endDrop = document.getElementById("endTimesDrop");
            endDrop.style.display = 'inline';

            submitButton.style.display = "inline";
        }

        //console.log("Here is the var: " + av);
    }
}