document.addEventListener('DOMContentLoaded', function () {
    const configurationsList = document.getElementById('configurations');
    const addConfigurationForm = document.getElementById('addConfigurationForm');
    const sourceUrlInput = document.getElementById('sourceUrl');
    const destinationUrlInput = document.getElementById('destinationUrl');
    const addConfigurationButton = document.getElementById('addConfigurationButton');
    const clearConfigurationsButton = document.getElementById('clearConfigurationsButton');
  
    // Load configurations on page load
    loadConfigurations();
  
    addConfigurationForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const sourceUrl = sourceUrlInput.value.trim();
      const destinationUrl = destinationUrlInput.value.trim();
  
      if (sourceUrl && destinationUrl) {
        addOrUpdateConfiguration({ sourceUrl, destinationUrl });
      }
  
      // Clear the form inputs
      sourceUrlInput.value = '';
      destinationUrlInput.value = '';
    });
  
    clearConfigurationsButton.addEventListener('click', function () {
      clearConfigurations();
    });
  
    function loadConfigurations() {
      chrome.storage.sync.get({ configurations: [] }, function (options) {
        options.configurations.forEach((configuration, index) => {
          // Create an element for each configuration
          const configurationElement = document.createElement('div');
          configurationElement.classList.add('configuration');
  
          // Display the configuration details
          configurationElement.innerHTML = `
            <span>${index + 1}. Source: ${configuration.sourceUrl}, Destination: ${configuration.destinationUrl}</span>
            <button data-index="${index}" class="deleteButton">Delete</button>
          `;
  
          // Append the configuration element to the list
          configurationsList.appendChild(configurationElement);
  
          // Attach event listener for delete button
          const deleteButton = configurationElement.querySelector('.deleteButton');
  
          deleteButton.addEventListener('click', function () {
            // Handle delete button click
            deleteConfiguration(index);
          });
        });
      });
    }
  
    function addOrUpdateConfiguration(newConfiguration) {
      chrome.storage.sync.get({ configurations: [] }, function (options) {
        // Check if the configuration already exists
        const existingIndex = options.configurations.findIndex(
          config => config.sourceUrl === newConfiguration.sourceUrl
        );
  
        if (existingIndex !== -1) {
          // Update existing configuration
          options.configurations[existingIndex] = newConfiguration;
        } else {
          // Add the new configuration to the existing configurations
          options.configurations.push(newConfiguration);
        }
  
        // Save the updated configurations to storage
        chrome.storage.sync.set({ configurations: options.configurations }, function () {
          // Refresh the options page
          refreshOptionsPage();
        });
      });
    }
  
    function deleteConfiguration(index) {
      chrome.storage.sync.get({ configurations: [] }, function (options) {
        // Remove the configuration at the specified index
        options.configurations.splice(index, 1);
  
        // Save the updated configurations to storage
        chrome.storage.sync.set({ configurations: options.configurations }, function () {
          // Refresh the options page
          refreshOptionsPage();
        });
      });
    }
  
    function clearConfigurations() {
      // Clear configurations from storage
      chrome.storage.sync.set({ configurations: [] }, function () {
        // Refresh the options page
        refreshOptionsPage();
      });
    }
  
    function refreshOptionsPage() {
      // Reload the current page
      window.location.reload();
    }
  });
  