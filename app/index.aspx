<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title>Dover Room Reserver</title>
  <link rel="SHORTCUT ICON" href="./favicon.svg" type="image/x-icon">

   <!-- msal.min.js can be used in the place of msal.js; included msal.js to make debug easy -->
  <script src="https://alcdn.msauth.net/browser/2.30.0/js/msal-browser.js"
    integrity="sha384-o4ufwq3oKqc7IoCcR08YtZXmgOljhTggRwxP2CLbSqeXGtitAxwYaUln/05nJjit"
    crossorigin="anonymous"></script>
  
  <!-- adding Bootstrap 4 for UI components  -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <link rel="SHORTCUT ICON" href="https://c.s-microsoft.com/favicon.ico?v2" type="image/x-icon">
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="/">Dover Room Reserver</a>
    <div class="btn-group ml-auto dropleft">
      <button type="button" id="SignIn" class="btn btn-secondary" onclick="signIn()">Sign In</button>
    </div>
  </nav>
  <br>
  <h5 class="card-header text-center">Schedule a time to use one of the Dover Office Rooms</h5>
  <br>
  <div class="row" style="margin:auto">
    <div id="card-div" class="col-sm" style="display:none">
      <div class="card text-center">
        <div class="card-body">
          <h5 class="card-title" id="WelcomeMessage">Please sign-in to reserve a room</h5>
          <h5 class="card-subtitle" id="WelcomeName"></h5>
          <div id="profile-div"></div>
          <br>
          <br>
          <button class="btn btn-primary" id="seeProfile" onclick="seeProfile()">See Profile</button>
          <br>
          <br>
          <button class="btn btn-primary" id="readMail" onclick="readMail()">Read Mails</button>
          <br>
          <br>

          <hr>
          
          <div id="roomsDrop">
            <label for="roomOptions">Choose a room:</label>
            <select id="roomOptions">
                <option value="1843room@WorkOpportunities.net">1843 Room</option>
                <option value="mosespaulroom@WorkOpportunities.net">Moses Paul Room</option>
            </select>
          </div>


          <div id="datesDrop">
            <label for="dateOption">Select a date:</label>
            <input type="date" id="dateOption"/>
          </div>


          <button class="btn btn-primary" id="findTimes" onclick="findTimes('start');">Find Available Times</button>
          
         
          <h5 id="inBetweenMessage" style="display: none;"></h5>
          <br>
          
          <div id="startTimesDrop" style="display: none;">
            <label for="timeStartOptions">Select start time:</label>
            <select id="timeStartOptions">
            </select>
          </div>
          
          <br>
          <button class="btn btn-primary" style="display:none;" id="nextTime" onclick="findTimes('end')">Next ></button>
          

          <div id="endTimesDrop" style="display: none;">
            <label for="timeEndOptions">Select end time:</label>
            <select id="timeEndOptions">
              
            </select>
          </div>
        
          <button class="btn btn-primary" id="createEvent" style="display: none;" onclick="createE()">Schedule Room</button>
          <br>
        </div>
      </div>
    </div>
    <br>
    <br>
    <div class="col-sm">
      <div class="list-group" id="list-tab" role="tablist">
      </div>
    </div>
    <div class="col-sm">
      <div class="tab-content" id="nav-tabContent">
      </div>
    </div>
  </div>
  <br>
  <br>
  <div class="row" style="margin:auto">
    <div class="col-sm">
      <div class="card text-center" id="done">
        
      </div>
    </div>
  </div>

  <!-- importing bootstrap.js and supporting js libraries -->
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
    integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
    crossorigin="anonymous"></script>

  <!-- importing app scripts (load order is important) -->
  <script type="text/javascript" src="./authConfig.js"></script>
  <script type="text/javascript" src="./graphConfig.js"></script>
  <script type="text/javascript" src="./ui.js"></script>

  <!-- <script type="text/javascript" src="./authRedirect.js"></script>   -->
  <!-- uncomment the above line and comment the line below if you would like to use the redirect flow -->
  <script type="text/javascript" src="./authPopup.js"></script>
  <script type="text/javascript" src="./graph.js"></script>
</body>

</html>