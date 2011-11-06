function showHistory(arr, url) {

	console.log("arr.length=" + arr.length);
	console.log("url=" + url);

	arr = filterHistory(arr, url)

	var ul = document.createElement('ul');
	for (var i=0, item; item = arr[i]; i++) {
		var li = document.createElement('li');
		var a = document.createElement('a');
		a.href = item.url;
		a.title = item.title;
		if (a.title == undefined || a.title == '')
			a.title = a.href;
		var text = document.createTextNode(item.title);
		a.appendChild(text);
		li.appendChild(a);
		var spanURL = document.createElement('span');
		var spanDate = document.createElement('span');
		spanURL.className = "url";
		spanDate.className = "date";
		spanURL.appendChild(document.createTextNode(item.url));
		spanDate.appendChild(document.createTextNode(
				new Date(item.lastVisitTime).toRelativeTime()
			)
		)
		li.appendChild(spanURL);
		li.appendChild(spanDate);
		li.addEventListener("click", function(e) {
			gotoURL(this.getElementsByTagName('a')[0].href)
		});
		ul.appendChild(li);
	}
	document.body.appendChild(ul);

	if (arr.length == 0) {
		document.body.appendChild(
			document.createTextNode('No previous visits in history.')
		)
	}
}

function filterHistory(arr, url) {

	var arr_f = [];

	for (var i=0, item; item = arr[i]; i++) {
		var el = document.createElement('a');
		el.href = url;
		inputhost = el.hostname;
		el.href = item.url;
		itemhost = el.hostname;
		if (itemhost == inputhost)
			arr_f.push(item);
	}

	return arr_f;
}

function gotoURL(url) {
	console.log("popup::gotoURL() url="+ url)
	chrome.tabs.create(
		{'url': url, 'selected': true},
		function (tab) {
			window.close()
		}
	)
}



document.addEventListener('DOMContentLoaded', function() {
	console.log("popup.js:: DOMContentLoaded callback")
	chrome.tabs.getSelected(undefined, function (tab) {
		console.log("tabs.getSelected callback");
		url = tab.url;
		console.log("tab.url=" + url);

		chrome.history.search(
			{text:''},
			function (arr) {
				showHistory(arr,  url)
			}
		);
	})
});

/**
 * Returns a description of this past date in relative terms.
 * Takes an optional parameter (default: 0) setting the threshold in ms which
 * is considered "Just now".
 *
 * Examples, where new Date().toString() == "Mon Nov 23 2009 17:36:51 GMT-0500 (EST)":
 *
 * new Date().toRelativeTime()
 * --> 'Just now'
 *
 * new Date("Nov 21, 2009").toRelativeTime()
 * --> '2 days ago'
 *
 * // One second ago
 * new Date("Nov 23 2009 17:36:50 GMT-0500 (EST)").toRelativeTime()
 * --> '1 second ago'
 *
 * // One second ago, now setting a now_threshold to 5 seconds
 * new Date("Nov 23 2009 17:36:50 GMT-0500 (EST)").toRelativeTime(5000)
 * --> 'Just now'
 *
 */
Date.prototype.toRelativeTime = function(now_threshold) {
  var delta = new Date() - this;

  now_threshold = parseInt(now_threshold, 10);

  if (isNaN(now_threshold)) {
    now_threshold = 0;
  }

  if (delta <= now_threshold) {
    return 'Just now';
  }

  var units = null;
  var conversions = {
    millisecond: 1, // ms    -> ms
    second: 1000,   // ms    -> sec
    minute: 60,     // sec   -> min
    hour:   60,     // min   -> hour
    day:    24,     // hour  -> day
    month:  30,     // day   -> month (roughly)
    year:   12      // month -> year
  };

  for (var key in conversions) {
    if (delta < conversions[key]) {
      break;
    } else {
      units = key; // keeps track of the selected key over the iteration
      delta = delta / conversions[key];
    }
  }

  // pluralize a unit when the difference is greater than 1.
  delta = Math.floor(delta);
  if (delta !== 1) { units += "s"; }
  return [delta, units, "ago"].join(" ");
};

/*
 * Wraps up a common pattern used with this plugin whereby you take a String
 * representation of a Date, and want back a date object.
 */
Date.fromString = function(str) {
  return new Date(Date.parse(str));
};




