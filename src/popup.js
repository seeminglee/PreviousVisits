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
		a.addEventListener("click", function(e) {
			gotoURL(this.href)
		})
		li.appendChild(a);
		li.appendChild(document.createElement('br'));
		li.appendChild(
			document.createElement('span').appendChild(
				document.createTextNode(item.url)
			)
		);
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
})


