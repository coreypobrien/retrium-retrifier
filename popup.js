// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var script = `
function changeit() {
  var caesarShift = function(r, a) {
    if (0 > a) return caesarShift(r, a + 26);
    for (var t = "", e = 0; e < r.length; e++) {
      var f = r[e];
      if (f.match(/[a-z]/i)) {
        var i = r.charCodeAt(e);
        65 > i || i > 90 // lowercase
          ? 97 > i ||
            i > 122 ||
            (f = String.fromCharCode(((i - 97 + a) % 26) + 97))
          : (f = String.fromCharCode(((i - 59 + a) % 26) + 65));
      }
      t += f;
    }
    return t;
  };
  for (
    var divs = document.getElementsByTagName("div"), i = 0;
    i < divs.length;
    i++
  ) {
    if (divs[i].parentElement.parentElement.hasAttribute("user_id")) {
      var origtext = divs[i].nextSibling.innerHTML;
      for (var asdf=0; asdf<26; asdf++) {
        var maybe = caesarShift(origtext, asdf);
        chrome.i18n.detectLanguage(maybe, function f(out) {
          if (out.isReliable && out.languages[0].language == "en") {
            // console.info(origtext);
            // console.info(out);
            // console.info(asdf + " " + maybe);
            divs[i].innerHTML = maybe
          }
        });
      }
      divs[i].parentElement.parentElement.style.height = null;
      divs[i].style.color = "white";
      divs[i].style.textShadow = "none";
      divs[i].style.visibility = "visible";
      divs[i].nextSibling.style.visibility = "hidden";
    }
  }
}
changeit();
`

function click(e) {
  chrome.tabs.executeScript(null, {code:script});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
   click(); 
});
