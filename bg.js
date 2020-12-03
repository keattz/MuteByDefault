var storage = chrome.storage.sync;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status == "loading") {
		var hostname = new URL(changeInfo.url).hostname;
		
		storage.get('urls', function(items) {
			for (var i = 0; i < items.urls.length; i++) {
				
				// Check if hostname ends with whitelisted hostname
				if (hostname.substr(-items.urls[i].length) === items.urls[i]) {
					chrome.tabs.update(tabId, {muted: false});
					return;
				}
			}
		});
		
		chrome.tabs.update(tabId, {muted: true});
	}
});