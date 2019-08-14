// Define UI vars
const form = document.querySelector('#car-form');
const carList = document.querySelector('.collection');
const clearButton = document.querySelector('clear-cars');
const filter = document.querySelector('#filter');
const carInput = document.querySelector('#car');

// Load all event listners
loadEventListners();

function loadEventListners() {
    // Add car event
    form.addEventListener('submit', addCar);
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
    // clear input
    carInput.value = '';

    console.log(li);

    e.preventDefault();
}