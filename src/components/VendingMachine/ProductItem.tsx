import type {FC} from 'react';
import React, {useCallback, useContext} from 'react'

import {ChooseAmountWidget} from '@/components/VendingMachine/ChooseAmountWidget.tsx'
import {VendorContext} from '@/context/VendorContext.tsx'
import type {IProduct} from '@/models/Product.ts'
import {PurchaseStatus} from '@/models/PurchaseStatus.ts'

interface IProductItem {
   product: IProduct
   handleSelect: (product: IProduct) => void
   selected: boolean
   productAmount?: number
}

export const ProductItem: FC<IProductItem> = ({product, handleSelect, selected, productAmount,}) => {
   const {incrementProductAmount, decrementProductAmount, purchaseStatus} = useContext(VendorContext)

   const classes = [
      'flex-1',
      'flex',
      'flex-col',
      'items-stretch',
      'rounded-2xl',
      'border',
      'px-4',
      'py-3',
      'transition-colors',
   ]

   const stateChoosingAmount = PurchaseStatus.ChooseAmount === purchaseStatus
   const paymentInProgress = PurchaseStatus.InsertMoney === purchaseStatus
   const processPayment = PurchaseStatus.ProcessPayment === purchaseStatus
   const returnMoney = PurchaseStatus.ReturnMoney === purchaseStatus
   const paymentSuccess = PurchaseStatus.Success === purchaseStatus
   const isDisabled = paymentInProgress || processPayment || returnMoney || paymentSuccess || product.amount === 0

   if (selected) {
      classes.push("bg-blue-50 border-blue-400")
   } else if (isDisabled) {
      classes.push("opacity-50")
   } else {
      classes.push("hover:bg-gray-50")
   }

   const increment = useCallback((e: React.MouseEvent) => {
      e.stopPropagation()
      incrementProductAmount()
   }, [incrementProductAmount]);

   const decrement = useCallback((e: React.MouseEvent) => {
      e.stopPropagation()
      decrementProductAmount()
   }, [decrementProductAmount]);

   const clickHandler = useCallback(() => {
      handleSelect(product)
   }, [handleSelect, product])
   
   return (
      <button
         className={classes.join(' ')}
         onClick={clickHandler}
         disabled={isDisabled}
         type="button"
      >
         <div className="sm:text-xl font-bold mb-3">{product.name}</div>

         <div className="mt-auto">
            <div className="mb-2">price: {product.priceView}</div>
            <div className="flex items-end justify-between text-xs relative">
               <div className="italic mb-8 xs:mb-0">left: {product.amount}</div>

               {selected ? <ChooseAmountWidget
                  increment={increment}
                  decrement={decrement}
                  productAmount={productAmount}
                  visible={stateChoosingAmount}
               /> : null
               }
            </div>
         </div>
      </button>
   )
}
