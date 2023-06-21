
const Cart = require('../models/cart');
const CartItem = require('../models/cartitem');

// Add item to cart
addItemToCart = (req, res) => {
  const { userId, items } = req.body;

  // Create an array to hold the cart items
  const cartItems = [];
  const cartItemsIds = [];

  // Loop through each item and create a new cart item
  for (const item of items) {
    const cartItem = new CartItem.cartitem({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    });
    cartItems.push(cartItem);
  }

  // Save the cart items to the database
  CartItem.cartitem.insertMany(cartItems, { ordered: false })
    .then(savedItems => {
      // Get the generated IDs for the cart items
      for (const savedItem of savedItems) {
        cartItemsIds.push(savedItem._id);
      }

      Cart.cart.findOne({ user: userId })
        .then(cart => {
          if (cart) {
            // If the cart exists, add the cart item IDs to the cart's items array
            cart.items = cart.items.concat(cartItemsIds);
          } else {
            // If the cart doesn't exist, create a new cart and add the cart item IDs
            cart = new Cart.cart({
              user: userId,
              items: cartItemsIds
            });
          }

          // Save the cart to the database
          cart.save()
            .then(savedCart => {
              res.status(200).json({
                message: 'Items added to cart successfully',
                cart: savedCart
              });
            })
            .catch(error => {
              res.status(500).json({ error: 'Error saving cart' });
            });
        })
        .catch(error => {
          res.status(500).json({ error: 'Error finding cart' });
        });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error saving cart items' });
    });
};

getallItems= async(req,res)=>{
  const userId = req.params.UserID;
  try{
    const carts = await Cart.cart.findOne({user:userId}).populate('items');
    res.status(200).json({
      message: 'Retrieved items',
      cart: carts.items
    });


  } catch(error){
    res.status(500).json({ message: 'Error retrieving cart details', error: error.message });
  }



};

cancelCartItems = async (req,res)=>{
  const { itemIds } = req.body;
  let Items =[];
  Items = Items.concat(itemIds);
  if(Items.length === 1){
    CartItem.cartitem.updateOne({ _id:Items[0] }, { isCancelled: true })
    .then(result => {
      if (result.nModified === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(200).json({ message: 'Item updated successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating item' });
    });

  } else if(Items.length){
    CartItem.cartitem.updateMany({ _id: { $in: itemIds } }, { isCancelled: true })
    .then(result => {
      if (result.nModified === 0) {
        return res.status(404).json({ error: 'Items not found' });
      }
      res.status(200).json({ message: 'Items updated successfully' });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error updating items' });
    });

  }

}

module.exports = {
  addItemToCart,
  getallItems,
  cancelCartItems
};
