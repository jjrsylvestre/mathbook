
window.addEventListener(
  "load",

  function(event) {

	// add click handler to toc "expansion" arrows
	var toc_elem_array = document.getElementsByClassName("toc-caret");
	for (var i = 0; i < toc_elem_array.length; i++) {
		if (toc_elem_array[i].classList.contains("toc-blank-caret")) {
			continue;
		}
		toc_elem_array[i].addEventListener(
		  "click",
		  function () {
			this.parentElement.parentElement.classList.toggle("toc-nested-shown");
			var children = this.children;
			for (var j = 0; j < children.length; j++) {
				children[j].classList.toggle("toc-caret-show");
				children[j].classList.toggle("toc-caret-hide");
			}
		  }
		);
		toc_elem_array[i].addEventListener(
		  "keyup",
		  function(event) {
			// Number 13 is the "Enter" key on the keyboard
			if (event.keyCode === 13) {
				// Cancel the default action, if needed
				event.preventDefault();
				// Trigger the button element with a click
				this.click();
			}
		  });
	}

	// if we got here by clicking a link to a toc item *below* the chunk level,
	// expand that toc item and its parents, up to active toc item
	if (window.location.hash.length) {
		var cur_active = document.querySelector("li.active"); // there should be only one at a time
		cur_active.classList.remove('active');
		var link_name = window.location.hash.substring(1);
		var toc_a = document.querySelector('#toc a[data-scroll="' + link_name + '"]');
		toc_a.parentElement.parentElement.classList.add('active');
		while (toc_a.tagName != "NAV") {
			if (toc_a.tagName == "LI") {
				if (toc_a.classList.contains('toc-nested-shown')) {
					// if already expanded, everything else above should be as well,
					// so no need to go any further up the tree
					break;
				}
				if (toc_a.classList.contains('toc-contains-nested')) {
					console.log("adding toc-nested-shown to", toc_a);
					toc_a.classList.add('toc-nested-shown');
					var children = toc_a.querySelector('div.toc-caret').children;
					for (var j = 0; j < children.length; j++) {
						children[j].classList.toggle("toc-caret-show");
						children[j].classList.toggle("toc-caret-hide");
					}
				}
			}
			toc_a = toc_a.parentElement;
		}
	}

	// this is for the same purpose as above, but if the toc item below chunk
	// level that was clicked was in the active page, then we will have stayed
	// on the same page and the code above won't apply




	console.log("finished expand.js");

  }

);
