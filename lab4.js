const itemList = document.querySelector('.content-itemList');
const searchField = document.querySelector('.content-menu-search');
const totalWeightField = document.querySelector('.content-totalweight');
const sortButton = document.querySelector('.content-menu-button:nth-child(2)');
const calculateButton = document.querySelector('.content-menu-button:nth-child(3)');

function renderData(items) {
    itemList.innerHTML = "";
    items.forEach(item => {
        itemList.insertAdjacentHTML(
            "beforeend", 
            `<div class="content-item">
                <div>Name: ${item.Name}</div>
                <div>Weight: ${item.weight}t</div>
                <button class="edit-button" data-id="${item.id}">Edit</button>
                <button class="remove-button" data-id="${item.id}">Remove</button>
            </div>`
        );
    });

    // Add event listeners to all "Edit" buttons
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', handleEdit);  // Assign handleEdit function to each edit button
    });
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', handleRemove);
    });
}

function handleEdit(event) {
    const shipId = parseInt(event.target.getAttribute('data-id'));  // Get the ship ID from the button's data-id attribute
    const ship = data.find(item => item.id === shipId);  // Find the corresponding ship in the data array

    // Prompt the user to edit the ship's name and weight
    const newName = prompt('Edit Ship Name:', ship.Name);
    const newWeight = prompt('Edit Ship Weight (in tons):', ship.weight);

    // Validate the new values
    if (newName && newName.length >= 3 && newName.length <= 20 && newWeight > 0 && newWeight <= 1000) {
        // Update the ship in the data array
        ship.Name = newName;
        ship.weight = parseFloat(newWeight);

        // Save the updated data to localStorage (if using it)
        saveData();

        // Re-render the ship list to reflect the changes
        renderData(data);
    } else {
        alert('Invalid input. Please enter a valid name and weight.');
    }
}
function handleRemove(event) {
    const shipId = parseInt(event.target.getAttribute('data-id'));
    const shipIndex = data.findIndex(item => item.id === shipId); // Find the index of the ship

    if (shipIndex > -1) {
        data.splice(shipIndex, 1); // Remove the ship from the data array

        saveData(); // Save the updated data to localStorage
        renderData(data); // Re-render the ship list
    } else {
        alert('Ship not found.');
    }
}

// Save the current data array to localStorage
function saveData() {
    localStorage.setItem('ships', JSON.stringify(data));
}

// Sorting and calculation buttons
let isSorted = false;
sortButton.addEventListener('click', () => {
    if (isSorted) {
        renderData(data);
    } else {
        const sorted = [...data].sort((a, b) => a.Name.localeCompare(b.Name));
        renderData(sorted);
    }
    isSorted = !isSorted;
});

calculateButton.addEventListener('click', () => {
    const totalWeight = data.reduce((sum, item) => sum + item.weight, 0);
    totalWeightField.textContent = `Total Weight: ${totalWeight}t`;
});

// Search field
searchField.addEventListener('input', () => {
    const query = searchField.value.toLowerCase();
    const filtered = data.filter(item => item.Name.toLowerCase().includes(query));
    renderData(filtered);
});

// Initial rendering of the ship list
renderData(data);
