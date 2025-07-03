# NetSuite Dashboard Refresher Extension

A Chrome extension that automatically refreshes NetSuite dashboard portlets at configurable intervals, eliminating the need for manual refreshing.

## 🎯 Features

- **Automatic Portlet Refreshing**: Refreshes all NetSuite portlets automatically
- **Flexible Intervals**: Choose from 1, 5, 10 minutes or set a custom interval
- **Smart Detection**: Works with standard and custom NetSuite portlets
- **Visual Feedback**: Shows refresh status and portlet count in NetSuite dashboard
- **Cross-Tab Support**: Works across all open NetSuite tabs simultaneously
- **Persistent Settings**: Remembers your preferences between browser sessions

## 📋 System Requirements

- **Browser**: Google Chrome (version 88 or higher)
- **NetSuite Access**: Valid NetSuite account with dashboard access
- **Permissions**: Ability to install Chrome extensions in developer mode

## 🚀 Installation Instructions

### Step 1: Download the Extension
1. Download all extension files to a folder on your computer
2. Ensure the folder contains these files:
   - `manifest.json`
   - `popup.html`
   - `popup.js`
   - `background.js`
   - `images/` folder with icon files

### Step 2: Enable Developer Mode in Chrome
1. Open Google Chrome
2. Go to `chrome://extensions/` (type this in the address bar)
3. In the top-right corner, toggle **"Developer mode"** to ON
4. You should see new buttons appear: "Load unpacked", "Pack extension", "Update"

### Step 3: Install the Extension
1. Click the **"Load unpacked"** button
2. Navigate to the folder containing the extension files
3. Select the folder and click **"Select Folder"** (or "Open" on Mac)
4. The extension should now appear in your extensions list with the blue refresh icon

### Step 4: Verify Installation
1. Look for the NetSuite Dashboard Refresher icon in your Chrome toolbar
2. If you don't see it, click the puzzle piece icon (🧩) in Chrome toolbar
3. Pin the extension by clicking the pin icon next to "NetSuite Dashboard Refresher"

## 📖 How to Use

### Starting the Auto-Refresh
1. **Open NetSuite** in your browser and navigate to your dashboard
2. **Click the extension icon** in Chrome toolbar
3. **Select refresh interval**:
   - 1 minute (for urgent updates)
   - 5 minutes (recommended default)
   - 10 minutes (for background monitoring)
   - Custom (enter any number of minutes)
4. **Click "Start Refresh"**
5. The extension will immediately refresh all portlets and continue at your selected interval

### Monitoring Status
- **In NetSuite**: Look for the status message at the top of your dashboard:
  - `Dashboard Refresher Active - 5 portlets refreshed at Thu, Jul 03, 10:00 AM`
- **Extension Popup**: Shows current settings and status

### Stopping the Auto-Refresh
1. Click the extension icon
2. Click **"Stop Refresh"**
3. The status in NetSuite will change to "Inactive"

## 🔧 Troubleshooting

### Extension Icon Not Visible
- Go to `chrome://extensions/` and ensure the extension is enabled
- Click the puzzle piece icon (🧩) and pin the extension

### No Portlets Being Refreshed
- Check the browser console (F12) for error messages
- Ensure you're on a NetSuite dashboard page (URL contains `/app/center/card`)
- Try different refresh intervals
- Some custom portlets may not be detected - contact support for assistance

### Extension Not Working After Browser Restart
- Go to `chrome://extensions/` and click the refresh button on the extension
- Restart Chrome completely
- Re-enable the extension if needed

### Status Message Not Appearing
- Ensure you're on the correct NetSuite page (dashboard/center)
- Check that the page has fully loaded before starting the extension
- Try refreshing the NetSuite page and restarting the extension

## ⚙️ Technical Details

### Supported NetSuite URLs
- `https://*/app.netsuite.com/app/center/card*`
- Works with all NetSuite subdomains and instances

### Portlet Detection
The extension automatically detects refresh buttons using multiple methods:
- Standard NetSuite portlet refresh buttons
- Custom portlet refresh controls
- Generic refresh buttons and links

### Permissions Used
- **tabs**: To detect NetSuite tabs
- **scripting**: To click refresh buttons on NetSuite pages
- **storage**: To remember your settings
- **alarms**: To schedule automatic refreshes
- **host_permissions**: Access to NetSuite domains only

## 📞 Support

If you experience any issues:
1. Check the troubleshooting section above
2. Open browser console (F12) and look for error messages
3. Contact your IT administrator or extension provider

## 🔄 Version Information

**Current Version**: 2023.05
**Last Updated**: 2024
**Compatibility**: Chrome 88+, NetSuite 2023+

---

*This extension is designed specifically for NetSuite dashboard portlet management and does not collect or transmit any personal data.*