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


		const foods = Store.getFoods();

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

	static deleteFood(el) {
		if (el.classList.contains('delete')) {
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message, className) {
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector('.container');
		const form = document.querySelector('#food-form');
		container.insertBefore(div, form);

		// Vanish in 2 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 2000);
	}

	static clearFields() {
		document.querySelector('#item').value = '';
		document.querySelector('#meal').value = '';
		document.querySelector('#calories').value = '';
	}
}

//UI Class: Handle UI Tasks

//Storage Class: Handles storage
class Store {
	static getFoods() {
		let foods;
		if (localStorage.getItem('foods') === null) {
			foods = [];
		} else {
			foods = JSON.parse(localStorage.getItem('foods'));
		}
		return foods;
	}

	static addFood(food) {
		const foods = Store.getFoods();
		foods.push(food);

		localStorage.setItem('foods', JSON.stringify(foods));
    }
    
	static removeFood(food) {

        const foods = Store.getFoods();

        foods.forEach((food, index) => {
            if(food.calories === calories){
                foods.splice(index, 1);
            }
            
        });
        
        localStorage.setItem('books', JSON.stringify(books));

    }
}

//Event: Display Foods

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayFoods);

// Event: Add a Book
document.querySelector('#food-form').addEventListener('submit', (e) => {
	// Prevent actual submit
	e.preventDefault();
	// get values from form
	const item = document.querySelector('#item').value;
	const meal = document.querySelector('#meal').value;
	const calories = document.querySelector('#calories').value;

	//Validate

	if (item === '' || meal === '' || calories === '') {
		UI.showAlert('Please fill in all fields', 'danger');
	} else {
		// Initialize new book
		const food = new Food(item, meal, calories);

		// Add book to UI

        UI.addFoodToList(food);
        
        // Add book to store

        Store.addFood(food);

		// Show success msg

		UI.showAlert('Food Added', 'success');

		//Clear fields
		UI.clearFields();
	}
});

document.querySelector('#food-list').addEventListener('click', (e) => {
    //Remove food from UI

    
    UI.deleteFood(e.target);


    // Remove food from storage

    Storage.removeFood(e.target.parentElement.previousElementSibling.textContent);

	UI.showAlert('Food Removed', 'success');
});
