document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const intervalSelect = document.getElementById('interval');
    const customIntervalInput = document.getElementById("customInterval");
    const body = document.body;

    // Function to handle the display of customIntervalInput based on the selected option
    function updateCustomIntervalInputDisplay() {
        if (intervalSelect.value === 'custom') {
            customIntervalInput.removeAttribute('hidden');
            body.style.height = '264px';
        } else {
            customIntervalInput.setAttribute('hidden', 'true');
            body.style.height = '230px';
        }
    }

    // Update the display of customIntervalInput
    updateCustomIntervalInputDisplay();

    // Add an event listener to the select element
    intervalSelect.addEventListener("change", function () {
        updateCustomIntervalInputDisplay();
    });

    // Add an input event listener to validate input
    customIntervalInput.addEventListener("input", function () {
        // Use a regular expression to allow only numbers
        const inputValue = customIntervalInput.value;
        const numericValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters
        customIntervalInput.value = numericValue; // Update the input value
    });

    // Retrieve stored state when the popup is loaded
    chrome.storage.local.get(['refreshState'], function(result) {
        const refreshState = result.refreshState || { started: false, interval: '', selectDisabled: false, customInputValue: customIntervalInput.value };

        // Set the selected option in the dropdown
        for (const option of intervalSelect.options) {
            if (option.value === refreshState.interval) {
                option.selected = true;
                break; // Exit the loop once the option is found
            }
        }

        // Update the display of customIntervalInput
        updateCustomIntervalInputDisplay();

        // Handle the initial state of the buttons and select and values
        startButton.hidden = refreshState.started;
        stopButton.hidden = !refreshState.started;
        intervalSelect.disabled = refreshState.selectDisabled;
        customIntervalInput.disabled = refreshState.selectDisabled;
        customIntervalInput.value = refreshState.customInputValue;

        startButton.addEventListener('click', function() {
            let selectedInterval = intervalSelect.value;
            let intervalToSend;

            if (selectedInterval === "1") {
                intervalToSend = 60000;
            }
            else if (selectedInterval === "5") {
                intervalToSend = 300000;
            }
            else if (selectedInterval === "10") {
                intervalToSend = 600000;
            }
            else if (selectedInterval === "custom") {
                if (customIntervalInput.value === "0" || customIntervalInput.value === "" || customIntervalInput.value === null) {
                    alert('You have to select a numeric value greater than \'0\'.\nTry again.')
                    return;
                }
                intervalToSend = parseInt(customIntervalInput.value) * 60000;
            }

            // Disable the select box and custom input
            intervalSelect.disabled = true;
            customIntervalInput.disabled = true;

            chrome.runtime.sendMessage({ action: 'startRefresh', interval: intervalToSend });
            startButton.hidden = true;
            stopButton.hidden = false;

            // Store the state when the button is clicked
            chrome.storage.local.set({ refreshState: { started: true, interval: selectedInterval, selectDisabled: true, customInputValue: customIntervalInput.value } });
        });

        stopButton.addEventListener('click', function() {
            const selectedInterval = intervalSelect.value;
            
            // Enable the select box and custom input
            intervalSelect.disabled = false;
            customIntervalInput.disabled = false;

            chrome.runtime.sendMessage({ action: 'stopRefresh' });
            startButton.hidden = false;
            stopButton.hidden = true;

            // Store the state when the button is clicked
            chrome.storage.local.set({ refreshState: { started: false, interval: selectedInterval, selectDisabled: false, customInputValue: customIntervalInput.value } });
        });
    });
});
