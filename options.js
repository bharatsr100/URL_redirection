document.addEventListener('DOMContentLoaded', function () {
    const sourceUrlInput = document.getElementById('sourceUrl');
    const destinationUrlInput = document.getElementById('destinationUrl');
    const saveOptionsButton = document.getElementById('saveOptions');
  
    saveOptionsButton.addEventListener('click', function () {
      const sourceUrl = sourceUrlInput.value;
      const destinationUrl = destinationUrlInput.value;
  
      chrome.storage.sync.set({
        sourceUrl: sourceUrl,
        destinationUrl: destinationUrl
      }, function () {
        console.log('Options saved:', sourceUrl, destinationUrl);
      });
    });
  });
  