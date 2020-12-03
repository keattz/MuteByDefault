var storage = chrome.storage.sync;

var submitButton = document.querySelector('button.submit');
var textarea = document.querySelector('textarea');

loadChanges();

submitButton.addEventListener('click', saveChanges);

function saveChanges() {
  var urls = [];
  var lines = textarea.value.split('\n');
  for (var i = 0; i < lines.length; i++) {
	// Removes http(s)://www.
	line = lines[i].replace(/(https?:\/\/)?(www\.)?/, '');
	
	// Basic URL syntax check
    if (/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/.test(line)) {
      urls.push(line.toLowerCase());
    }
  }

  storage.set({'urls': urls}, function() {
    message('Settings saved');
  });
  
  storage.get('urls', function(items) {
    if (items.urls) {
	  textarea.value = items.urls.join('\n');
	}
  });
}

function loadChanges() {
  storage.get('urls', function(items) {
    if (items.urls) {
      textarea.value = items.urls.join('\n');
      message('Loaded saved settings.');
    }
  });
}

function message(msg) {
  var message = document.querySelector('.message');
  message.innerText = msg;
  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}
