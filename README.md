# Save Selected Text - Chrome Extension

A Chrome Extension (Manifest V3) that allows you to save selected text from any webpage via a context menu and manage all saved items in a popup.

## Features

- **Context Menu Integration**: Right-click on selected text to save it
- **Local Storage**: All saved items are stored locally in your browser
- **Popup Management**: View, copy all, or delete all saved items
- **Individual Item Deletion**: Delete specific items with the × button
- **Confirmation Dialog**: Prevents accidental deletion of all items

## Installation

### Step 1: Generate Icons

1. Open `generate-icons.html` in your web browser
2. Click the "Generate All Icons" button
3. Save all downloaded PNG files to the `icons/` folder:
   - `icon16.png`
   - `icon32.png`
   - `icon48.png`
   - `icon128.png`

### Step 2: Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `SaveWord` folder (this directory)
5. The extension should now appear in your extensions list

## Usage

### Saving Text

1. Select any text on a webpage
2. Right-click on the selected text
3. Click **"Save Selected Text"** from the context menu
4. The text is now saved with the page URL

### Managing Saved Items

1. Click the extension icon in the Chrome toolbar
2. The popup will show all your saved items
3. **Copy all**: Copies all saved texts to clipboard (formatted as "text — url" per line)
4. **Delete all**: Deletes all saved items (requires confirmation)
5. **Delete individual item**: Click the × button on any item to delete it

## Project Structure

```
SaveWord/
├── manifest.json          # Extension manifest (Manifest V3)
├── background.js          # Service worker for context menu
├── popup.html             # Popup UI structure
├── popup.css              # Popup styling
├── popup.js               # Popup functionality
├── icons/                 # Extension icons (16, 32, 48, 128px)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── generate-icons.html    # Tool to generate placeholder icons
└── README.md             # This file
```

## Technical Details

- **Manifest Version**: 3
- **Storage**: Uses `chrome.storage.local` API
- **Permissions**: `contextMenus`, `storage`, `activeTab`
- **No external dependencies**: Pure HTML, CSS, and JavaScript

## Development

The extension uses:
- **Service Worker** (`background.js`) for context menu handling
- **Popup** (`popup.html/js/css`) for managing saved items
- **Chrome Storage API** for persistent local storage

## Notes

- All saved items are stored locally in your browser
- Items persist across browser sessions
- The extension works on all websites
- No data is sent to external servers

