import React from "react";
import {data} from '../data'

const ProductList = ({allProducts, setAllProducts}) => {

    const onAddProduct = (product) => { 
        setAllProducts([...allProducts, product])
    };
        console.log(allProducts)
    return (
        <>
		<div className='container-items'>
			{data.map(product => (
				<div className='item' key={product.id}>
					<figure>
						<img src={product.img} alt={product.nameProduct} />
					</figure>
					<div className='info-product'>
						<h2>{product.nameProduct}</h2>
						<p className='price'>cantidad maxima de participantes: {product.cantidad_max_participantes}</p>
						<button onClick={()=> onAddProduct(product)}>
							inscribirse
						</button>
					</div>
				</div>
			))}
		</div>
        </>  
	);
};

export default ProductList;