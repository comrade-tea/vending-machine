import React, {useContext} from 'react'
import {VendorContext} from "@/context/VendorContext.tsx";
import {currencyView} from "@/models/Currency.ts";

export const PurchaseInfo = () => {
    const {currentProduct, productAmount} = useContext(VendorContext);
    
    if (!currentProduct)
        return
    
    const totalPrice = currentProduct.price * productAmount
    
    return (
        <div className="mt-4">
            <div><span>Product: {currentProduct?.name}</span></div>
            <div>Total: {currentProduct?.priceView} x {productAmount} = {currencyView(totalPrice)}</div>
        </div>
    )
}
