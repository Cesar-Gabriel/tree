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

// Function to add trees planted by a company
async function addCompanyTrees(event) {
    event.preventDefault();
    const companyName = document.getElementById('company-name').value;
    const treesCount = parseInt(document.getElementById('trees-count').value);

    if (!companyName || isNaN(treesCount) || treesCount <= 0) {
        alert('Please enter valid company name and number of trees.');
        return;
    }

    let treeData = await loadTreeData();
    if (companyName in treeData) {
        treeData[companyName] += treesCount;
    } else {
        treeData[companyName] = treesCount;
    }

    saveTreeData(treeData);
    updateCounter();
    document.getElementById('tree-form').reset();
}

// Function to save the tree data to a JSON file
function saveTreeData(data) {
    fetch('tree_data.json', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Event listener for form submission
document.getElementById('tree-form').addEventListener('submit', addCompanyTrees);

// Call the function to update the counter when the page loads
window.onload = updateCounter;
