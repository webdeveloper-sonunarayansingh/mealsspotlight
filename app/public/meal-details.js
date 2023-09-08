// Function to get query parameters from the URL
function getQueryParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return {
        mealName: urlParams.get("mealName"),
        mealInstructions: urlParams.get("mealInstructions"),
        mealPhoto: urlParams.get("mealPhoto")
    };
}

// Function to populate meal details
function populateMealDetails() {
    const mealDetails = getQueryParameters();

    // Check if mealName is present in the query parameters
    if (mealDetails.mealName) {
        document.getElementById('mealName').textContent = mealDetails.mealName;
    }

    // Check if mealInstructions is present in the query parameters
    if (mealDetails.mealInstructions) {
        document.getElementById('mealInstructions').textContent = mealDetails.mealInstructions;
    }

    // Check if mealPhoto is present in the query parameters
    if (mealDetails.mealPhoto) {
        document.getElementById('mealPhoto').src = mealDetails.mealPhoto;
    }
}

// Call the populateMealDetails function when the page loads
window.addEventListener('load', populateMealDetails);
