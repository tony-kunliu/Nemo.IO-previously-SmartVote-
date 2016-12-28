var	sender = new HttpAPI();
baseUrl = "/apis/SmartVote";

window.onload = init;


function init() {
	
	clearSession();
	
}



function login(identity){
	
	clearSession();
	
	var loginForm = document.getElementById("loginForm");
	var username = document.getElementById("username");
	var passWord = document.getElementById("password");
	

	if (username.value == "" || username.value == null) {
		window.alert("please enter the username");

	} else if (passWord.value == "" || passWord.value == null) {
		window.alert("please enter your password");
	
	}
    else {
	    var userinfo = { "identity":identity,"username" : username.value.toString() , "password" : passWord.value.toString() };
	    //userinfo.test = "1222333";
	    console.log(userinfo);
	
	
	    //for test
	    //Note that: browser in Eclipse doesnt support session storage,plz test in chrome
	
	//    sessionStorage.username = username.value;
	//    sessionStorage.identity = identity;
	    
/*	
	//for local test
	window.alert("userinfo.username:"+userinfo.username +"\nuserinfo.password: "+userinfo.password+"\nusername in session: "+ sessionStorage.username+"\nidentity insession: "+sessionStorage.identity);
	window.location.href = "templates/UserHome/UserHome.html";
*/
	    /*Data in "Login" request:
	     * 	"identity": the identity of logging in user
    	 *  "username": username
	     * 	"password": password
    	 * 
    	 * Data should be in "Login" response: 
	     *  "result" =  "success"(if username and password all good) (for voters and organisers)
	     *  			"successAno" (if username and password all good)(for anonymous voters)
	     *  			"userDoesntExist" (if user id doesnt exist)
    	 *  			"wrongPassWord" (if user id exist but the password is wrong)
	    
	    *
	    *	"pollName" = this data exists when result = successAno, this presents the poll name of the
	    *					second account belongs to
	    *
	    */
	    
	    
	    

	    sender.sendAsync("POST", baseUrl+ "/login", JSON.stringify(userinfo), function(res){ 
	    	
	    	clearSession();
	    	
	    	if (res.status == 200) {
		    	console.log(res);
	    		var body = res.response;
		    	body = JSON.parse(body);

	    		//var body = {"result":"success","pollName":"ssddd"};
	    
	    		
		    	if (body.result == "success" && identity !== "anonymousVoter") {  		
		    				    		
		    		sessionStorage.username = username.value;
		    		sessionStorage.identity = identity;
		    		sessionStorage.pollName = "";
				
		    		window.location.href = "templates/UserHome/UserHome.html";
				
		    	}else if(body.result == "success" && identity === "anonymousVoter"){
		    				    		
		    		sessionStorage.username = username.value;
		    		sessionStorage.identity = identity;
		    		sessionStorage.pollName = body.pollName[0];
					
		    		window.location.href = "templates/UserHome/UserHome.html";
		    	
		    	}else if (body.result == "userDoesntExist") {
		    		
		    		window.alert("Sorry, the user name does not exist");
		    		
		    		
		    	} else if (body.result == "wrongPassWord"){
		    		
		    		window.alert("Sorry, your password is wrong");
		    		
				
		    	} else {

		    		window.alert("bad response");
		    	}

	        } else {

		    	window.alert("failed to login");
		    }
    	});
    }	
	
}

function clearSession() {
		
	sessionStorage.username = "";
	sessionStorage.identity = "";
	sessionStorage.pollName = "";
	
}
