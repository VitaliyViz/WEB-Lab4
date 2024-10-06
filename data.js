const savedData = localStorage.getItem('ships');
const data = savedData ? JSON.parse(savedData) : [
    { id: 1, Name: "White Pearl", weight: 20 },
    { id: 2, Name: "Black_Maria", weight: 15 },
    { id: 3, Name: "Flintfolk", weight: 35 },
    { id: 4, Name: "Brusal", weight: 25 },
    { id: 5, Name: "Armadillo", weight: 20 },
];

function saveData() {
    localStorage.setItem('ships', JSON.stringify(data));
}
