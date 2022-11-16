import json

from django.http import JsonResponse
from django.shortcuts import render

from online.models import Category, Product, Cart, Order_Product


# Create your views here.
def index(request):
    categories = Category.objects.all()
    cart = Cart.objects.filter(user=request.user).first()
    if cart:
        cart_list = cart.order_product.all()
    return render(request, 'index.html', context={"categories": categories, "cart_list": cart_list, "products": Product.objects.filter(category_id=categories.first().id)})


def blog(request):
    return render(request, 'blog-single-sidebar.html')


def cart(request):
    return render(request, 'cart.html')


def checkout(request):
    return render(request, 'checkout.html')


def contact(request):
    return render(request, 'contact.html')

# TODO: JS PART

def order_category(request):
    data = json.loads(request.body)
    cat_id = data.get('id')
    products = Product.objects.filter(category_id=int(cat_id))
    res = []

    for product in products:
        p = {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "image": product.imageURL,
            "discount": product.discount_price
        }
        res.append(p)
    return JsonResponse({"data": res})


def add_cart(request):
    data = json.loads(request.body)
    id = data.get('id')
    product = Product.objects.get(id=int(id))
    cart, cart_created = Cart.objects.get_or_create(user=request.user)
    if cart_created:
        cart.product.add(product)
        Order_Product.objects.create(cart=cart, product=product)
    
    try:
        order_product = Order_Product.objects.get(cart=cart, product=product)
        order_product.add
    except:
        order_product = Order_Product.objects.create(cart=cart, product=product)
    cart.product.add(product)
    data = [{
        "id": i.product.id,
        "order_id": i.id,
        "name": i.product.name,
        "image": i.product.imageURL,
        "price": i.product.price,
        "quantity": i.quantity,
    } for i in cart.order_product.all()]

    return JsonResponse({"data": data, "count": cart.product.count()})

def remove_cart(request):
    data = json.loads(request.body)
    id = data.get('id')
    cart = Cart.objects.get(user=request.user)
    product = Order_Product.objects.filter(id=int(id)).first()

    if product:
        cart.product.remove(product.product)
        product.delete()
        return JsonResponse({"success": True})
    return JsonResponse({"success": False})