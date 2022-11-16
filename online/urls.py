from django.urls import path
from .views import index, contact, checkout, blog, cart, order_category, add_cart, remove_cart

urlpatterns = [
    path('', index, name='index'),
    path('blog/', blog, name='blog'),
    path('checkout/', checkout, name='checkout'),
    path('contact/', contact, name='contact'),
    path('cart/', cart, name='cart'),

    path('order_category/', order_category, name='order_category'),
    path('add_cart/', add_cart, name='add_cart'),
    path('remove_cart/', remove_cart, name='remove_cart'),
]