//Food Class: Represents a food

class Food {
    constructor(item, meal, calories) {
        this.item = item;
        this.meal = meal;
        this.calories = calories;
    }
}

class UI {
    static displayFoods() {
        const StoredFoods = [{
                item: 'Banana',
                meal: 'Breakfast',
                calories: '120'
            },
            {
                item: 'Apple',
                meal: 'Lunch',
                calories: '70'
            },
        ];

        const foods = StoredFoods;

        foods.forEach((food) => UI.addFoodToList(food));
    }

    static addFoodToList(food) {
        const list = document.querySelector('#food-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${food.item}</td>
        <td>${food.meal}</td>
        <td>${food.calories}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector('#item').value ='';
        document.querySelector('#meal').value ='';
        document.querySelector('#calories').value ='';

    }
}

//UI Class: Handle UI Tasks

//Storage Class: Handles storage

//Event: Display Foods

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayFoods);

// Event: Add a Book
document.querySelector('#food-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
    // get values from form
    const item = document.querySelector('#item').value;
    console.log(item);
    const meal = document.querySelector('#meal').value;
    console.log(meal);
    const calories = document.querySelector('#calories').value;
    console.log(calories);



    // Initialize new book
    const food = new Food(item, meal, calories);

    // Add book to UI

    
    UI.addFoodToList(food);

    //Clear fields
    UI.clearFields();

});

//Event: Remove a Food-item