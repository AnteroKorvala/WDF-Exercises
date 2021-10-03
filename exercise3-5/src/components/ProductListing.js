import React, { Component } from 'react'
import GatherProduct from './GatherProduct';
import styles from './ProductList.module.css'

export default class ProductListing extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <div className={ styles.productPlacement }>
               {
                   this.props.products.map(item => <GatherProduct key={ item.id } {...item} />)
               } 
            </div>
        </div>
        )
    }
}
