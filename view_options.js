document.addEventListener('DOMContentLoaded', function () {
    const configurationsContainer = document.getElementById('configurations');
  
    chrome.storage.sync.get({ configurations: [] }, function (options) {
      options.configurations.forEach(({ sourceUrl, destinationUrl }) => {
        const configEntry = document.createElement('div');
        configEntry.classList.add('config-entry');
  
        configEntry.innerHTML = `
          <p><strong>Source URL:</strong> ${sourceUrl}</p>
          <p><strong>Destination URL:</strong> ${destinationUrl}</p>
          <hr>
        `;
  
        configurationsContainer.appendChild(configEntry);
      });
    });
  });
  