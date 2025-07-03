function refreshTabs() {
    try {
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(function(tab) {
                let pattern = /^https:\/\/[^.]*\.app\.netsuite\.com\/app\/center\/card.*/;
                if (pattern.test(tab.url)) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: () => {
                            try{
                                // Try multiple selectors to find refresh buttons
                                const selectors = [
                                    '.ns-portlet-icon-refresh[data-action="refresh"]', // Primary selector
                                    '.ns-portlet-refresh', // Alternative selector
                                    '[data-action="refresh"]', // Generic refresh action
                                    '.portlet-refresh', // Custom portlet refresh
                                    '.refresh-button', // Generic refresh button
                                    'button[title*="refresh" i]', // Button with refresh in title
                                    'a[title*="refresh" i]' // Link with refresh in title
                                ];
                                
                                let elements = [];
                                let refreshedCount = 0;
                                
                                // Try each selector until we find elements
                                for (const selector of selectors) {
                                    const found = document.querySelectorAll(selector);
                                    if (found.length > 0) {
                                        elements = Array.from(found);
                                        console.log(`SUCCESS: Found ${found.length} portlets using selector: ${selector}`);
                                        break;
                                    }
                                }
                                
                                if (elements.length === 0) {
                                    console.warn('WARNING: No refresh buttons found with any selector. Selectors tried:', selectors);
                                }
                                
                                elements.forEach(element => {
                                    try {
                                        const clickEvent = new MouseEvent('click', {
                                            bubbles: true,
                                            cancelable: true,
                                            view: window
                                        });
                                        element.dispatchEvent(clickEvent);
                                        refreshedCount++;
                                        console.log(`SUCCESS: Portlet ${refreshedCount} refreshed`);
                                    } catch (err) {
                                        console.warn('ERROR: Failed to refresh portlet:', err);
                                    }
                                });
    
                                // Remove existing UI Message if exists
                                let uiMessage = document.getElementById('portletRefresherActive');
                                if (uiMessage) {
                                    uiMessage.remove();
                                }
    
                                // Create a new UI Message
                                uiMessage = document.createElement('p');
                                uiMessage.id = 'portletRefresherActive';
                                uiMessage.style.marginLeft = '10px';
    
                                // Set last refresh Time
                                let lastRefreshTime = new Date();
                                let formattedTime = lastRefreshTime.toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });
    
                                // Set the UI Message inner HTML
                                const statusText = refreshedCount > 0 
                                    ? `Dashboard Refresher <span style="font-weight: bold; color: green;">Active</span> - ${refreshedCount} portlet${refreshedCount !== 1 ? 's' : ''} refreshed at ${formattedTime}`
                                    : `Dashboard Refresher <span style="font-weight: bold; color: orange;">Active</span> - No portlets found at ${formattedTime}`;
                                uiMessage.innerHTML = statusText;
    
                                // Insert the UI Message into the DOM
                                const targetElement = document.getElementById('ns-dashboard-heading-panel');
                                if (targetElement) {
                                    targetElement.appendChild(uiMessage);
                                }
                            } catch (error) {
                                console.error('Error updating element: ', error);
                            }
                        },
                    });
                }
            });
        });
    } catch (e) {
        console.log(e.message);
    }
}

// Function to start the refresh interval using alarms
function startRefreshInterval(interval) {
    chrome.alarms.create('refreshAlarm', { periodInMinutes: interval / 60000 }); // Convert interval to minutes
}

// Function to stop the refresh interval
function stopRefreshInterval() {
    chrome.alarms.clear('refreshAlarm');
}

// Listen for alarm events
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'refreshAlarm') {
        console.log(`...refreshing at ${new Date()}`)
        try {
            refreshTabs();
        } catch (e) {
            console.log(e.message);
        }
    }
});

chrome.runtime.onMessage.addListener(function(message) {

    if (message.action === 'startRefresh') {
        let intervalValue = message.interval;
        
        startRefreshInterval(intervalValue);
        console.log(`Selected interval: ${intervalValue} milliseconds`);

        // Perform initial refresh
        try {
            refreshTabs();
        } catch (e) {
            console.log(e.message);
        }
    }

    else if (message.action === 'stopRefresh') {
        // Loop through tabs and update UI Message
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(function(tab) {
                let pattern = /^https:\/\/[^.]*\.app\.netsuite\.com\/app\/center\/card.*/;
                if (pattern.test(tab.url)) {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: () => {    
                            let uiMessage = document.getElementById('portletRefresherActive');
                            uiMessage.innerHTML = `Dashboard Refresher <span style="font-weight: bold; color: red;">Inactive</span>`;
                        },
                    });
                }
            });
        });

        // Stop the interval
        stopRefreshInterval();
    }
    
});