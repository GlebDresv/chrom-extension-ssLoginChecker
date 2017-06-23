
var iterator=0;
var timerId;
var active;

checkLogined();

chrome.browserAction.onClicked.addListener(function() { 
	if (window.active) {
		chrome.browserAction.setIcon({path:"icon2.png"});
		window.active = false;
		clearTimeout(window.timerId);
	}else{
		chrome.browserAction.setIcon({path:"icon.png"});
		checkLogined();
	}
})

function myTimer() {
	console.log("hello World 777");
}

function myOnReadyStatus() {
	if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
		if ( JSON.parse(this.responseText).data === 'LOGIN_DEACTIVATE' ){
			alert("Нажми кнопку вернуться!!\n...или временно отключи плагин нажав на его иконку...\n...не забудь потом включить (нажать иконку плагина еще раз)...");
		};
		window.active = true;
		window.timerId = setTimeout(checkLogined, 300*1000);
	};
};

function checkLogined() {
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = myOnReadyStatus;

	xhr.open("GET", 'https://office.seo-studio.ua/test/vladsokolenko/StormAPI/Api.php', true);
	xhr.send();
}

