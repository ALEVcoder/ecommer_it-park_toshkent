function order_category(id) {
    console.log("ID", id)
    url = `/order_category/`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            id: id,
        }),
    }).then((response) => {
        response.json().then((data) => {
            html = ``
            if (data.data.length == 0) {
                alert('Mahsulot topilmadi!');
                return
            }
            for (let i = 0; i < data.data.length; i++) {
                html += `<div class="col-xl-3 col-lg-4 col-md-4 col-12">
                <div class="single-product">
                    <div class="product-img">
                        <a href="#">
                            <img class="default-img"
                                 src="${data.data[i].image}" alt="#">
                            <img class="hover-img"
                                 src="${data.data[i].image}"
                                 alt="#">`
                if (data.data[i].discount != data.data[i].price) {
                    html += `<span class="out-of-stock">Sale</span>`
                }
                html += `</a>
                        <div class="button-head">
                            <div class="product-action">
                                <a data-toggle="modal" data-target="#exampleModal"
                                   title="Quick View" href="#"><i
                                        class=" ti-eye"></i><span>Quick Shop</span></a>
                                <a title="Wishlist" href="#"><i
                                        class=" ti-heart "></i><span>Add to Wishlist</span></a>
                                <a title="Compare" href="#"><i
                                        class="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                            </div>
                            <div class="product-action-2">
                                <a title="Add to cart" href="#">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div class="product-content">
                        <h3><a href="#">${data.data[i].name}</a>
                        </h3>
                        <div class="product-price">`
                if (data.data[i].discount != data.data[i].price) {
                    html += `<span class="old">${data.data[i].price}</span>
                                <span>${data.data[i].discount}</span>`
                } else {
                    html += `<span>${data.data[i].price}</span>`
                }
                html += `
                        </div>
                    </div>
                </div>
            </div>`
            }
            document.getElementById('order_product').innerHTML = html;
        })
    })
}

function add_cart(id) {
    url = `/add_cart/`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            id: id,
        }),
    }).then((response) => {
        response.json().then((data) => {
            html = ``
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                html += `
                    <li id="remove${data.data[i].order_id}">
                        <a onclick="remove_cart"(${data.data[i].order_id})" class="remove" title="Remove this item"><i class="fa fa-remove"></i></a>
                        <a class="cart-img" href="#"><img src="${data.data[i].image}"
                                                        alt="alevcoder"></a>
                        <h4><a href="#">${data.data[i].name}</a></h4>
                        <p class="quantity"><span id="quantity${data.data[i].id}">${data.data[i].quantity}x</span> - <span class="amount">${data.data[i].price}</span></p>
                    </li>
                `
            }
            document.getElementById('shopping_list').innerHTML = html;
            // document.getElementById('quantity${id}').innerHTML = data.quantity;
            document.getElementById('cart_product_quantity').innerHTML = data.count;
        })
    })
}


function remove_cart(id) {
    url = `/remove_cart/`
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            id: id,
        }),
    }).then((response) => {
        document.getElementById('remove${id}').style.display = 'none';
    })
}