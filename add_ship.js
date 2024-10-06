const form = document.getElementById('addShipForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('shipName').value.trim();
    const weight = document.getElementById('shipWeight').value;

    if (name.length < 3 || name.length > 20) {
        alert('Ship name must be between 3 and 20 characters.');
        return;
    }

    if (weight <= 0 || weight > 1000) {
        alert('Ship weight must be between 1 and 1000 tons.');
        return;
    }

    data.push({
        id: data.length + 1,
        Name: name,
        weight: parseFloat(weight)
    });

    saveData();
    alert('Ship added successfully!');
    form.reset();  
    window.location.href = 'lab4.html';
});
