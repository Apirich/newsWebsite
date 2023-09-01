//Array to store username, password, and subscribe
var usersArr = [{names: "", pass: "", sub: ""}];
//localStorage Array
var storedArr = [{names: "", pass: "", sub: ""}];

//Display login button
var disLogBtn = document.getElementById("disLoginBut");
//Logout button
var logoutBtn = document.getElementById("logoutBut");

//Subscribe button
var subBtn = document.getElementById("subscribeBut");
//Store subscribe status of the last login
var subStatus = "";
//localStorage value
var storedSub = "";

//Get HTML elements
var loginForm = document.getElementById("loginForm");
var subLogBtn = document.getElementById("subLoginBut");
var closeBtn = document.getElementById("cloBut");

var usName = document.getElementById("username");
//localStorage value
var storedNames = "";

var pssWord = document.getElementById("password");
//localStorage value
var storedPss = "";



//Click Login button to display Login form
function popupLog(){
    if(disLogBtn.innerHTML == "Log in"){
        loginForm.style.display = "block";
    }
    else{
        if(logoutBtn.style.display == "block"){
            logoutBtn.style.display = "none";
        }
        else{
            logoutBtn.style.display = "block";
        }
    }
}

disLogBtn.addEventListener("click", popupLog);



//Check if all fields are filled and changed buttons when login on the form is clicked
function welUser(){
    if(usName.value == ""){
        alert("Name must be filled out");
    }
    else if(pssWord.value == ""){
        alert("Password must be filled out");
    }
    else{
        for(var i = 0; i < usersArr.length; i++){
            //First login (sign up)
            if((i == (usersArr.length - 1)) && (usName.value !== usersArr[i].names) && (pssWord.value !== usersArr[i].pass)){
                usersArr.push({names: usName.value, pass: pssWord.value, sub: ""});

                disLogBtn.style.width = "max-content";
                disLogBtn.style.backgroundColor = "rgb(52, 165, 156)";
                disLogBtn.innerHTML = "Hi " + usName.value;
            
                loginForm.style.display = "none";

                subBtn.disabled = false;
                subBtn.title = "Subscribe to read more."
                subBtn.style.backgroundColor = "rgb(255, 0, 0)";

                break
            }
            //Incorrect username or password
            else if(((usName.value == usersArr[i].names) && (pssWord.value !== usersArr[i].pass)) || ((usName.value !== usersArr[i].names) && (pssWord.value == usersArr[i].pass))){
                loginForm.reset();
                alert("Your username or password is incorrect. Please try again.");

                break
            }
            //Valid username and password (successful login)
            else if((usName.value == usersArr[i].names) && (pssWord.value == usersArr[i].pass)){
                disLogBtn.style.width = "max-content";
                disLogBtn.innerHTML = "Hi " + usName.value;
                disLogBtn.style.backgroundColor = "rgb(52, 165, 156)";
            
                loginForm.style.display = "none";

                subBtn.disabled = false;
                
                //Check the latest subscribe status
                if(usersArr[i].sub == "true" + usName.value){
                    subBtn.innerHTML = "Subscribed";
                    subBtn.title = "";
                    subBtn.style.width = "max-content";
                    subBtn.style.backgroundColor = "rgb(149, 200, 204)";
                }
                else{
                    subBtn.innerHTML = "Subscribe";
                    subBtn.title = "Subscribe to read more."
                    subBtn.style.backgroundColor = "rgb(255, 0, 0)";
                }

                break
            }
        }
    }
}

subLogBtn.addEventListener("click", welUser);



//Close login form
function cloLog(){
    loginForm.reset();
    loginForm.style.display = "none";
}

closeBtn.addEventListener("click", cloLog);



//Logout
function refreshLog(){
    loginForm.reset();

    logoutBtn.style.display = "none";
    disLogBtn.innerHTML = "Log in";
    disLogBtn.style.backgroundColor = "rgb(34, 124, 241)";
    
    subBtn.disabled = true;
    subBtn.innerHTML = "Subscribe";
    subBtn.title = "Please log in to subscribe."
    subBtn.style.backgroundColor = "rgb(204, 65, 65)";

}

logoutBtn.addEventListener("click", refreshLog);



//Get HTML element
var deTag = document.getElementsByTagName("details");

//Unable details tag (not allow user to read articles) if not subscribe
function preDef(event){
    if(subBtn.innerHTML == "Subscribe"){
        event.preventDefault();
    }
}

for(var i = 0; i < deTag.length; i++){
    deTag[i].addEventListener("click", preDef);
}



//Subscribe & unsubscribe
function subClick(){
    //Subscribe
    if(subBtn.innerHTML == "Subscribe"){
        for(var i = 0; i < usersArr.length; i++){
            if((usName.value == usersArr[i].names) && (pssWord.value == usersArr[i].pass)){
                usersArr[i].sub = "true" + usName.value;
                subStatus = usersArr[i].sub;
            }
        }

        subBtn.innerHTML = "Subscribed";
        subBtn.title = ""
        subBtn.style.width = "max-content";
        subBtn.style.backgroundColor = "rgb(149, 200, 204)";
    }
    //Unsubscribe
    else{
        for(var i = 0; i < usersArr.length; i++){
            if((usName.value == usersArr[i].names) && (pssWord.value == usersArr[i].pass)){
                usersArr[i].sub = "false" + usName.value;
                subStatus = usersArr[i].sub;
            }
        }

        subBtn.innerHTML = "Subscribe";
        subBtn.title = "Subscribe to read more."
        subBtn.style.backgroundColor = "rgb(255, 0, 0)";
    }
}

subBtn.addEventListener("click", subClick);



//localStorage values before refresh or change pages
window.onbeforeunload = function(){
    localStorage.setItem("usN", usName.value);    
    localStorage.setItem("pssW", pssWord.value);    
    localStorage.setItem("usersA", JSON.stringify(usersArr)); 
    localStorage.setItem("subT", subStatus);  
}

//Get values from localStorage when refresh or change pages
window.onload = function(){
    storedNames = localStorage.getItem("usN");
    storedPss = localStorage.getItem("pssW");
    storedArr = JSON.parse(localStorage.getItem("usersA"));
    storedSub = localStorage.getItem("subT");

    //Assigns localStorage values to variable values that are using in the functions (copy and paste codes)
    usName.value = storedNames;
    pssWord.value = storedPss;
    usersArr = storedArr;
    subStatus = storedSub;

    if((usName.value !== "") && (pssWord.value !== "")){
        disLogBtn.style.width = "max-content";
        disLogBtn.innerHTML = "Hi " + usName.value;
        disLogBtn.style.backgroundColor = "rgb(52, 165, 156)";

        subBtn.disabled = false;

        if(subStatus == "true" + usName.value){
            subBtn.innerHTML = "Subscribed";
            subBtn.title = ""
            subBtn.style.width = "max-content";
            subBtn.style.backgroundColor = "rgb(149, 200, 204)";
        }
        else{
            subBtn.innerHTML = "Subscribe";
            subBtn.title = "Subscribe to read more."
            subBtn.style.backgroundColor = "rgb(255, 0, 0)";
        }
    }

}



//Get HTML elements
var meSym = document.getElementById("menuSym");
var colMe = document.getElementById("colMenu");

// Collapsible menu for mobile & small tablets
function menuClick(){
    if(colMe.className == "norNav"){
        colMe.className = "resNav";
    }
    else{
        colMe.className = "norNav";
    }
}

meSym.addEventListener("click", menuClick);



//Simple search engine to return results on search page -------- UNSUCCESSFUL, STILL WORKING ON!

// var searForm = document.getElementById("searchForm");
// var searIn = document.getElementById("search");

// var nodeList = document.body.childNodes;
// var wholeCont = document.body.textContent;

// var x = document.getElementById("searchRel");

// function searEnter(event){
//     if(event.key == "Enter"){
//         if(wholeCont.includes(searIn.value)){
//             // console.log(true);
//             for(var i = 0; i < nodeList.length; i++){
//                 var noLiCont = nodeList[i].innerHTML;
//                 if(noLiCont.includes(searIn.value)){
//                     x.innerHTML = nodeList[i];
//                 }
//             }
//         }
//         // console.log(wholeCont);
//     }
// }

// searIn.addEventListener("keydown", searEnter);