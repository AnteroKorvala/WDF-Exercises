import React, { Component } from 'react'
import styles from './GetProduct.module.css'

export default class GatherProduct extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={ styles.product }>
            <div><img  className={ styles.imge } src={ this.props.image } alt="productImage" /></div>
            <div className={ styles.productInfoItem }>
                
                <div className={ styles.text }>
                        <div className={ styles.productName }>{ this.props.productName }</div>
                        <div>${ this.props.price }</div>
                        <div>{ this.props.pricePerCount }</div>
                        <div>Rating: { this.props.rating }</div>
                </div>
            </div>
        </div>
        )
    }
}

