chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
    chrome.storage.sync.get({
      sourceUrl: '',
      destinationUrl: ''
    }, function (options) {
      const sourceUrl = options.sourceUrl;
      const destinationUrl = options.destinationUrl;
  
      if (sourceUrl && details.url.startsWith(sourceUrl)) {
        chrome.tabs.update(details.tabId, { url: destinationUrl });
      }
    });
  });
  