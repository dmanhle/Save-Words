// Service worker for Save Selected Text extension
// This handles context menu creation and saving selected text

// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  // Create a context menu item that appears when text is selected
  chrome.contextMenus.create({
    id: "save-selected-text",
    title: "Save Selected Text",
    contexts: ["selection"] // Only show when text is selected
  });
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Check if the clicked menu item is our "save-selected-text" item
  if (info.menuItemId === "save-selected-text") {
    // Get the selected text
    const selectedText = info.selectionText?.trim();
    
    // If no text or empty text, do nothing
    if (!selectedText || selectedText.length === 0) {
      return;
    }
    
    // Create a new saved item object
    const newItem = {
      id: Date.now().toString(), // Unique ID using timestamp
      text: selectedText,
      createdAt: Date.now() // Timestamp
    };
    
    // Read existing saved items from storage
    chrome.storage.local.get(["savedItems"], (result) => {
      // Get existing items or initialize empty array
      const savedItems = result.savedItems || [];
      
      // Add the new item to the array
      savedItems.push(newItem);
      
      // Save the updated array back to storage
      chrome.storage.local.set({ savedItems: savedItems }, () => {
        // Optional: Show a notification that item was saved
        // (Note: This requires "notifications" permission if you want to use it)
        console.log("Text saved:", selectedText);
      });
    });
  }
});

