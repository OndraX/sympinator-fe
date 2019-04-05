import React from "react";
import validate from "validate.js"
const FreshTokenExpiryTime = function() {
return new Date(new Date().getTime()+24*60*60*1000);
}

var UserLoginSession = (function() {
	var UserData;
	var getData = function() {
		var data = localStorage.getItem('UserData');
		//console.log("getData Called",data);
		if (!data) {
			UserData = {"id":null,"name":null,"token":""};
			return UserData;
		}
		else{
		UserData = JSON.parse(data)
		}
		// TODO: check expired  here
		return UserData    // Or pull this from cookie/localStorage
	};
	// var UserData = getData();	

	var unsetData= function(data) {
		UserData = data
		//console.log("unsetData called",UserData);
		// TODO: check expired  here
		localStorage.removeItem('UserData');
	};

	var setData= function(data) {
		//console.log("setData called",UserData);
		//console.log(data);
		UserData = data
		if( data.hasOwnProperty("expires")){
			if( data.expires == null){
				data.expires = FreshTokenExpiryTime()
			}
		}else {
			data.expires = FreshTokenExpiryTime()
		}
		// TODO: check expired  here
		localStorage.setItem('UserData', JSON.stringify(data));
	};

	// meant to be universal way of sending queries to backend -- takes care of user data header
	var authenticatedQuery = function(url, parameters) {
		if(!parameters.header){
			parameters.header = {};
	}
		parameters.header.Authorization = UserData.token;
		if(!validate.isEmpty(UserData.id) || parameters.ignoreUnauthenticated){
		return fetch(url, parameters);
		}
		else return (function(){
			//console.log("User not authenticated -- if you want to send queries this way, please specify parameters.ignoreUnauthenticated: true (or use default fetch API).");
		})();
	}

window.onbeforeunload = function() {
	localStorage.setItem("UserData", JSON.stringify(UserData));
	//console.log("SVAVING DVATA",localStorage.getItem("UserData"));
};

window.onload = function() {
    UserData = localStorage.getItem("UserData");
};
	return {
		getData: getData,
		setData: setData,
		unsetData: unsetData,
		query: authenticatedQuery
	}

})();

export default UserLoginSession;

