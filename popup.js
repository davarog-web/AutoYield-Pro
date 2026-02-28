document.getElementById('scrapeBtn').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Inject the scraping logic into the current lab inventory webpage
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrapeTableData,
    });
    
    document.getElementById('status').innerText = "Data copied to clipboard!";
});

// This function runs INSIDE the inventory website's page
function scrapeTableData() {
    // 1. Find the inventory table on the page (you will customize this selector)
    const rows = document.querySelectorAll("table tr");
    let inventoryData = [];

    // 2. Loop through the rows and extract the text
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].querySelectorAll("td");
        if (cells.length > 2) {
            inventoryData.push({
                name: cells[0].innerText.trim(),
                inStockMg: parseFloat(cells[1].innerText.replace(/[^0-9.]/g, '')) || 0,
                daysOpen: parseInt(cells[2].innerText) || 0
            });
        }
    }

    // 3. Convert to JSON and copy to the user's clipboard
    const jsonString = JSON.stringify(inventoryData, null, 2);
    navigator.clipboard.writeText(jsonString);
    alert("SynthScale: Successfully scraped " + inventoryData.length + " reagents to clipboard!");
          }
