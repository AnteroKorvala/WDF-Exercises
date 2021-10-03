import React, { useState } from 'react'

export default function AdminView(props) {

  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState("");

  const addNewProduct = () => {
    props.addNewProduct(newProductName, newProductPrice, newProductImage);
  }

  const onDeleteProductClick = (productId) => {
    console.log("clicked delete for product id " + productId);
    props.deleteProduct(productId);
  }

  return (
    <div>
      <div>
          <h1>Add new product</h1>
          <div>
            Name <input type="text" onChange={ (event) => setNewProductName(event.target.value) } />
          </div>
          <div>
            Price <input type="text" onChange={ (event) => setNewProductPrice(event.target.value) } />
          </div>
          <div>
            Product Image URL <input type="url" onChange={ (event) => setNewProductImage(event.target.value) } />
          </div>
          <button onClick={ addNewProduct }>Add Product</button>

        </div>
        <button onClick={ props.disableAdminMode }>Disable Admin Mode</button>

        <h1>List of products</h1>
        { props.products.map((product, index) => 
            <div key={ index }>
                <button onClick={() => onDeleteProductClick(product.id) }>X</button> {product.productName}, {product.price}
            </div>)}

    </div>
  )
}