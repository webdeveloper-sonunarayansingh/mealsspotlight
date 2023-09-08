// Function to make the API request
var fav = JSON.parse(localStorage.getItem('fav')) || []; // Load fav array from local storage, or initialize it as an empty array

function updateFavorite(mealName, buttonElement) {
    const index = fav.indexOf(mealName);

    if (index === -1) {
        // Meal not in favorites, add it
        fav.push(mealName);
        buttonElement.classList.add('red-button'); // Add a class to change button color
    } else {
        // Meal already in favorites, remove it
        fav.splice(index, 1);
        buttonElement.classList.remove('red-button'); // Remove the class to revert button color
    }

    localStorage.setItem('fav', JSON.stringify(fav)); // Save updated fav array in local storage
    console.log(fav);
}

var meal = {};
//const jsonData = JSON.parse(meal);;
function fetchData(data) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(data)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the API response here, e.g., display it on the page
            meals = data.meals; // Store all meals in the array
            const mealsContainer = document.getElementById('meals');
            mealsContainer.innerHTML = ''; // Clear previous content

            for (let i = 0; i < meals.length; i++) {
                const meal = meals[i];
                const mealName = meal.strMeal;

                // Create a new container for each button pair
                const buttonPairContainer = document.createElement('div');
                buttonPairContainer.className = 'button-pair'; // Add a class for styling

                // Create a new button element
                const buttonElement = document.createElement('button');
                buttonElement.className = 'card';
                buttonElement.textContent = mealName;

                // Create a new favorite button element
                const favElement = document.createElement('button');
                favElement.className = 'material-symbols-outlined';
                favElement.textContent = 'favorite';

                // Attach event listeners to the buttons (you can keep your existing code here)
                buttonElement.addEventListener('click', function () {
                    // Get the value of the clicked button (meal name in this case)
                    const clickedMealName = meal.strMeal;


                    // Do something with the clicked meal name, for example, display it

                    //displayMealDetails(meal);
                    openMealDetailsPage(meal);
                });
                favElement.addEventListener('click', function () {
                    // Get the value of the clicked button (meal name in this case)
                    const clickedMealName = meal.strMeal;
                    const buttonElement = this; // 'this' refers to the clicked button element

                    updateFavorite(clickedMealName, buttonElement);
                    console.log(fav);

                    buttonElement.classList.toggle('favorited');

                    // Do something with the clicked meal name, for example, display it

                    //displayMealDetails(meal);
                    //openMealDetailsPage(meal);
                });

                // Append the button pair container to the meals container
                mealsContainer.appendChild(buttonPairContainer);

                // Append the buttons to the button pair container
                buttonPairContainer.appendChild(buttonElement);
                buttonPairContainer.appendChild(favElement);
                
            }


           



        })

        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'Error occurred while fetching data.';
        });
}
//document.getElementById('meal_name').textContent = meal.strMeal;
//console.log(meal);

// Event listener for form submission
document.getElementById('apiForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the user-entered data from the input field
    const inputData = document.getElementById('dataInput').value;

    // Call the fetchData function with the user input
    fetchData(inputData);
});


// Function to display meal details
function displayMealDetails(meal) {
    // Get the selected meal details
    const mealName = meal.strMeal;
    const mealInstructions = meal.strInstructions;
    const mealPhoto = meal.strMealThumb;

    // Update the HTML to display the details
    document.getElementById('mealName').textContent = mealName;
    document.getElementById('mealInstructions').textContent = mealInstructions;
    document.getElementById('mealPhoto').src = mealPhoto;

    // Show the meal details container
    document.getElementById('mealDetails').style.display = 'block';
}

// Function to open the meal details page
function openMealDetailsPage(meal) {
    // Create a query string with meal details
    const queryString = `?mealName=${encodeURIComponent(meal.strMeal)}&mealInstructions=${encodeURIComponent(meal.strInstructions)}&mealPhoto=${encodeURIComponent(meal.strMealThumb)}`;

    // Open the meal-details.html page with the query string
    window.open(`meal-details.html${queryString}`, '_self');
}


// Function to display favorite meals on a separate HTML page
function displayFavoriteMeals() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    const favList = document.createElement('ul');

    for (let i = 0; i < fav.length; i++) {
        const mealName = fav[i];
        const listItem = document.createElement('li');
        listItem.className = "favButton"
        listItem.textContent = mealName;
        favList.appendChild(listItem);
    }

    // Append the list of favorite meals to the container in favorites.html
    favoritesContainer.appendChild(favList);
}

// Call the function to display favorite meals when needed (e.g., when navigating to favorites.html)
// Ensure that you have an element with the id 'favoritesContainer' in favorites.html
