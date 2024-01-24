chrome.runtime.onInstalled.addListener(function () {
    /*
    chrome.contextMenus.create({
      id: "viewOptions",
      title: "View Options",
      contexts: ["browser_action"]
    });
  
    chrome.contextMenus.onClicked.addListener(function (info, tab) {
      if (info.menuItemId === "viewOptions") {
        chrome.runtime.sendMessage({ message: "openViewOptions" });
      }
    });*/
  });
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "openViewOptions") {
      chrome.tabs.create({ url: chrome.runtime.getURL("view_options.html") });
    }
  });
  
  chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
    // Check if the navigation is happening in the main frame
    if (details.frameId === 0) {
      chrome.storage.sync.get({ configurations: [] }, function (options) {
        options.configurations.forEach(({ sourceUrl, destinationUrl }) => {
          if (sourceUrl && details.url.startsWith(sourceUrl)) {
            chrome.tabs.update(details.tabId, { url: destinationUrl });
          }
        });
      });
    }
  });
  