// tree_tracker.js

// Initial total number of trees planted worldwide before this repository
const initialTotalTrees = 1000000; // Example initial number

// Function to load trees data from a JSON file
async function loadTreeData() {
    try {
        const response = await fetch('tree_data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load tree data:', error);
        return {};
    }
}

// Function to get the total number of trees planted by all companies
async function getTotalTrees() {
    const data = await loadTreeData();
    let totalTrees = initialTotalTrees;
    for (const trees of Object.values(data)) {
        totalTrees += trees;
    }
    return totalTrees;
}

// Function to update the counter on the webpage
async function updateCounter() {
    const totalTrees = await getTotalTrees();
    document.getElementById('tree-counter').textContent = totalTrees;
}

// Call the function to update the counter when the page loads
window.onload = updateCounter;
