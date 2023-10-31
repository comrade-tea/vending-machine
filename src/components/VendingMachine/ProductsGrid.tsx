import {useContext} from 'react'

import {ProductItem} from '@/components/VendingMachine/ProductItem.tsx'
import {VendorContext} from '@/context/VendorContext.tsx'

export const ProductsGrid = () => {
    const {currentProduct, selectProduct, productAmount, products, productsLoading} =
        useContext(VendorContext)

    if (productsLoading) {
        return <div>Loading..</div>
    }

    if (products.length === 0) {
        return <div>There are no products</div>
    }

    return (
        <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3">
            {products.map(product => {
                const isSelected = product.id === currentProduct?.id

                return (
                    <li className="flex" key={product.id}>
                        <ProductItem
                            product={product}
                            selected={isSelected}
                            productAmount={productAmount}
                            handleSelect={selectProduct}
                        />
                    </li>
                )
            })}
        </ul>
    )
}
