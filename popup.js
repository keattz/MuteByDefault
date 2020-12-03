chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var hostname = new URL(tabs[0].url).hostname;
	console.log(hostname);
	hostname = hostname.replace(/(https?:\/\/)?(www\.)?/, '');
	console.log(hostname);
	var storage = chrome.storage.sync;

	storage.get('urls', function(items) {
		var index = items.urls.indexOf(hostname);
		if (index > -1) {
			items.urls.splice(index, 1);
			storage.set({'urls': items.urls}, function() {
				chrome.tabs.update(tabs[0].id, {muted: true});
				message('Removed ' + hostname + ' from the whitelist');
			});
		} else if (/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/.test(hostname)) {
			items.urls.push(hostname);
			storage.set({'urls': items.urls}, function() {
				chrome.tabs.update(tabs[0].id, {muted: false});
				message('Added ' + hostname + ' to the whitelist');
			});
		}
	});
});

function message(msg) {
  var message = document.querySelector('.message');
  message.innerText = msg;
}
