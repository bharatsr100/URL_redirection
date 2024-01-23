document.addEventListener('DOMContentLoaded', function () {
    const optionsButton = document.getElementById('optionsButton');
    const viewOptionsButton = document.getElementById('viewOptionsButton');
  
    optionsButton.addEventListener('click', function () {
      chrome.runtime.openOptionsPage();
    });
  
    viewOptionsButton.addEventListener('click', function () {
      chrome.runtime.sendMessage({ message: 'openViewOptions' });
    });
  });
  