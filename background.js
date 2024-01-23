chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    if (details.url.startsWith("https://www.youtube.com/")) {
      chrome.tabs.update(details.tabId, {url: "https://music.youtube.com/"});
    }
  });
  