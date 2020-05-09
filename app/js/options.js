'use strict';

const fq = document.querySelector('#frequency');

fq.addEventListener('change', (event) => {
  $("#freq").html(event.target.value)
  $('#message').show()
  chrome.runtime.sendMessage({type: "options", data: event.target.value})
});
