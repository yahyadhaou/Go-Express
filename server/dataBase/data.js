/**
 -product :
path : http://localhost:5000/products/addProduct
1
{
  "sellIerd": "TyqnWVKj5lYCjnGH7lOdYajt15t1",
  "buyerId": "null",
  "name": "M second Product",
  "category": "Kitchen",
  "price": 350,
  "description": "Its my second product in the store",
  "photo": "https://images.unsplash.com/photo-1673468199846-fb5572dfb862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  "quantity": 1,
  "id_user": "TyqnWVKj5lYCjnGH7lOdYajt15t1",
  "id_cart": 2,
  "productStatus": "Accepted",
  "Published_at": "now"
}



 -product_photo :
path : http://localhost:5000/products/addProduct/photo
{
  "photo1": "https://images.unsplash.com/photo-1673468199846-fb5572dfb862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  "photo2": "https://images.unsplash.com/photo-1673446392277-60959b6d7d99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "photo3": "https://plus.unsplash.com/premium_photo-1661549748158-dd66ec531b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "idproduct": 61
}





-user 
path : http://localhost:5000/users/addUser

{
  "id_user": "A",
  "name": "ahmed",
  "email": "ahmed@gmail.com"
}
-cart :
path : http://localhost:5000/carts/addCart

{
  "payment_type": "Cash",
  "date": "05/01/23",
  "user_id_user": "A",
  "state": "not done"
}


-admin : 
path : http://localhost:5000/admin/getallproduct







**/
