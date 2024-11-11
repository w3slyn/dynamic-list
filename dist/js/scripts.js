// Get the input and item list elements when html file is loaded
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const itemList = document.getElementById('item-list');
    
    // When input is provided list will be updated
    quantityInput.addEventListener('input', function() {
        const quantity = parseInt(quantityInput.value);
        itemList.innerHTML = '';
        
        for (let i = 1; i <= quantity; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = `Item ${i}`;
            itemList.appendChild(listItem);
        }
    });
});