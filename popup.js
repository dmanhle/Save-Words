// Popup script for Save Selected Text extension
// Handles displaying saved items, copying, and deleting

// DOM elements
const itemsList = document.getElementById('items-list');
const emptyState = document.getElementById('empty-state');
const copyAllBtn = document.getElementById('copy-all-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const statusMessage = document.getElementById('status-message');

// Load and display saved items when popup opens
function loadSavedItems() {
  chrome.storage.local.get(['savedItems'], (result) => {
    const savedItems = result.savedItems || [];
    
    // Clear the list
    itemsList.innerHTML = '';
    
    // If no items, show empty state
    if (savedItems.length === 0) {
      emptyState.style.display = 'block';
      itemsList.style.display = 'none';
      return;
    }
    
    // Hide empty state and show list
    emptyState.style.display = 'none';
    itemsList.style.display = 'block';
    
    // Render each item
    savedItems.forEach((item) => {
      const itemElement = createItemElement(item);
      itemsList.appendChild(itemElement);
    });
  });
}

// Create a DOM element for a saved item
function createItemElement(item) {
  const div = document.createElement('div');
  div.className = 'item';
  
  // Text content
  const textDiv = document.createElement('div');
  textDiv.className = 'item-text';
  textDiv.textContent = item.text;
  div.appendChild(textDiv);
  
  // Delete button for individual item
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'item-delete';
  deleteBtn.textContent = '×';
  deleteBtn.title = 'Delete this item';
  deleteBtn.addEventListener('click', () => {
    deleteItem(item.id);
  });
  div.appendChild(deleteBtn);
  
  return div;
}

// Delete a single item
function deleteItem(itemId) {
  chrome.storage.local.get(['savedItems'], (result) => {
    const savedItems = result.savedItems || [];
    
    // Filter out the item with the matching ID
    const updatedItems = savedItems.filter(item => item.id !== itemId);
    
    // Save the updated array
    chrome.storage.local.set({ savedItems: updatedItems }, () => {
      // Reload the list
      loadSavedItems();
      showStatus('Item deleted');
    });
  });
}

// Copy all saved items to clipboard
copyAllBtn.addEventListener('click', async () => {
  chrome.storage.local.get(['savedItems'], async (result) => {
    const savedItems = result.savedItems || [];
    
    if (savedItems.length === 0) {
      showStatus('No items to copy');
      return;
    }
    
    // Format: one text per line (simple format for learning English)
    const textToCopy = savedItems.map(item => item.text).join('\n');
    
    try {
      // Use Clipboard API to copy
      await navigator.clipboard.writeText(textToCopy);
      showStatus('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      showStatus('Failed to copy');
    }
  });
});

// Delete all saved items (with confirmation)
deleteAllBtn.addEventListener('click', () => {
  // Show confirmation dialog
  const confirmed = window.confirm('Are you sure you want to delete all saved items?');
  
  if (confirmed) {
    // Clear all saved items from storage
    chrome.storage.local.set({ savedItems: [] }, () => {
      // Clear the UI
      itemsList.innerHTML = '';
      emptyState.style.display = 'block';
      itemsList.style.display = 'none';
      showStatus('All items deleted');
    });
  }
});

// Show a status message
function showStatus(message) {
  statusMessage.textContent = message;
  statusMessage.classList.add('show');
  
  // Hide after 2 seconds
  setTimeout(() => {
    statusMessage.classList.remove('show');
  }, 2000);
}

// Load items when popup opens
loadSavedItems();

// Listen for storage changes (in case items are added from another tab/window)
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.savedItems) {
    loadSavedItems();
  }
});

