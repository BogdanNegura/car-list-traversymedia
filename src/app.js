// Define UI vars
const form = document.querySelector('#car-form');
const carList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-cars');
const filter = document.querySelector('#filter');
const carInput = document.querySelector('#car');

// Load all event listners
loadEventListners();

function loadEventListners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getCars);
    // Add car event
    form.addEventListener('submit', addCar);
    // Remove task event
    carList.addEventListener('click', removeCar);
    // Clear car event
    clearButton.addEventListener('click', clearCars);
    // Filter cars events
    filter.addEventListener('keyup', filterCars)
}

// Get cars from localStorage
function getCars() {
    let cars;
    if(localStorage.getItem('cars') === null){
        cars = [];
    } else {
        cars = JSON.parse(localStorage.getItem('cars'));
    }

    cars.forEach(function(cars){
    // Create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(cars));
    // create new element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append the link to li
    li.appendChild(link);

    // append to li to ul
    carList.appendChild(li);

    });
}

// Add Car
function addCar(e) {
    if(carInput.value === '') {
        alert('Add a car');
    }

    // Create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(carInput.value));
    // create new element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append the link to li
    li.appendChild(link);

    // append to li to ul
    carList.appendChild(li);

    // Store in Ls
    storeCarInLocalStorage(carInput.value);

    // clear input
    carInput.value = '';

    console.log(li);

    e.preventDefault();
}

// Store car

function storeCarInLocalStorage(car) {
    let cars;
    if(localStorage.getItem('cars') === null){
        cars = [];
    } else {
        cars = JSON.parse(localStorage.getItem('cars'));
    }

    cars.push(car);

    localStorage.setItem('cars', JSON.stringify(cars));
}

// Remove Car
function removeCar(e) {
    if(e.target.parentElement.classList.contains 
    ('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // Remove from LocalStorage
            removeCarFormLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeCarFormLocalStorage(carItem) {
    let cars;
    if(localStorage.getItem('cars') === null){
        cars = [];
    } else {
        cars = JSON.parse(localStorage.getItem('cars'));
    }

    cars.forEach(function(car, index){
        if(carItem.textContent === car){
            cars.splice(index, 1);
        }
    });

    localStorage.setItem('cars', JSON.stringify(cars));
}

// clear Cars

function clearCars() {
    // carList.innerHTML = '';   This is first way

    // Faster

    while(carList.firstChild) {
        carList.removeChild(carList.firstChild);
    }

    // https://jsperf.com/innerhtml-vs-removechild/47


    // Clear from LS
    clearCarsFromLocalStorage();
}

// Clear Cars from LS
function clearCarsFromLocalStorage() {
    localStorage.clear();
}



// Filter Cars
function filterCars(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(car) {
            const item = car.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                car.style.display = 'block';
            } else {
                car.style.display = 'none';
            }
        }
    );
}