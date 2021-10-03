import React from 'react';
import ProductListing from './components/ProductListing';
import AdminView from './components/AdminView';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productSearchString: "",
      adminModeActive: false
    }
  }

  componentDidMount() {
    console.log('Mounted');
    axios.get('http://localhost:4000/products')
    .then(response => {
      console.log(response);
      this.setState({ products: response.data})
    })
    .catch(err => console.log(err));
  }

  onSearchFieldChange = (event) => {
    console.log('Keyboard event');
    console.log(event.target.value);

    this.setState({ productSearchString: event.target.value });
  }

  addNewProduct = (productName, price, image) => {
    axios.post('http://localhost:4000/products/create', { productName, price, image })
    .then(response => this.setState({ products: response.data }))
    .catch(err => console.log(err));
  
  };

  deleteProduct = (productId) => {
    axios.delete('http://localhost:4000/products/' + productId + '/delete')
    .then(response => this.setState({ products: response.data }))
    .catch(err => console.log(err));
  };


  render() {
    let output =
    
      <>
        <div>
          Search <input type="text" onChange={this.onSearchFieldChange} value={this.state.productSearchString} />
        </div>
        <ProductListing products={this.state.products.filter((product) => product !== undefined && product.productName !== undefined && product.productName.includes(this.state.productSearchString))} />
        <button onClick={() => this.setState({ adminModeActive: !this.state.adminModeActive })}>Admin Mode</button>
      </>

    if (this.state.adminModeActive) {
        output = <AdminView
                            disableAdminMode={() => this.setState({ adminModeActive: false })}
                            addNewProduct={this.addNewProduct}
                            products={this.state.products}
                            deleteProduct={this.deleteProduct}
                          />;
    }

    return (
      <>
        {output}
      </>
    )
  }
}
export default App;
