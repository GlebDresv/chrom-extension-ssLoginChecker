

var timerId;
var active;

checkLogined();

chrome.browserAction.onClicked.addListener(function() { 
	if (active) {
		chrome.browserAction.setIcon({path:"icon2.png"});
		active = false;
		clearTimeout(timerId);
	}else{
		chrome.browserAction.setIcon({path:"icon.png"});
		
		checkLogined();
	}
})


function checkLogined(){
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			if ( JSON.parse(xhr.responseText).data === 'LOGIN_DEACTIVATE' ){
				alert("Нажми кнопку вернуться!!\n...или временно отключи плагин нажав на его иконку...\n...не забудь потом включить (нажать иконку плагина еще раз)...");
			};
			console.log(xhr.responseText);
			active = true;
			timerId = setTimeout(checkLogined, 300*1000);
		};
    };

	xhr.open("GET", 'https://office.seo-studio.ua/test/vladsokolenko/StormAPI/Api.php', true);
	xhr.send();
}
