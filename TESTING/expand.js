
window.addEventListener(
  "load",

  function(event) {
	var toc_toggler = document.getElementsByClassName("toc-caret");
	for (var i = 0; i < toc_toggler.length; i++) {
		if (toc_toggler[i].classList.contains("toc-blank-caret")) {
			continue;
		}
		toc_toggler[i].addEventListener(
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
	}
  }

);
