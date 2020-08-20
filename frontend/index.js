const btn = document.getElementById('submitBtn');

btn.addEventListener('click', (e) => {
    e.preventDefault();

    const url = 'http://localhost:5000/api/catalogo';
    const item = {
        catalogoItem: {
            "sku": document.getElementById('sku').value,
            "stock": document.getElementById('stock').value,
            "size": document.getElementById('size').value,
            "name": document.getElementById('name').value,
            "price": document.getElementById('price').value
        }
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    document.forms[0].reset();
})