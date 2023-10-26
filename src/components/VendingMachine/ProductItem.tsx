import React, {FC, useContext} from 'react'
import {IProduct} from "@/models/Product.ts";
import {MachineContext} from "@/context/MachineContext.tsx";
import {PurchaseStatus} from "@/models/PurchaseStatus.ts";
import {ChooseAmountWidget} from "@/components/VendingMachine/ChooseAmountWidget.tsx";

interface IProductItem {
   product: IProduct
   handleSelect: (product: IProduct) => void
   selected: boolean,
   productAmount?: number
}

export const ProductItem: FC<IProductItem> = ({product, handleSelect, selected, productAmount}) => {
   const {incrementProductAmount, decrementProductAmount, purchaseStatus} = useContext(MachineContext)

   const classes = ["flex-1", "flex", "flex-col", "items-stretch", "rounded-2xl", "border", "px-4", "py-3", "transition-colors"]

   const stateChoosingAmount = PurchaseStatus.choosingAmountOfProduct === purchaseStatus;
   const paymentInProgress = PurchaseStatus.paymentInProgress === purchaseStatus;
   const purchaseCompleted = PurchaseStatus.purchaseCompleted === purchaseStatus;

   if (selected) {
      classes.push("bg-blue-50 border-blue-400")
   } else if (!paymentInProgress) {
      classes.push("hover:bg-gray-50")
   } else {
      classes.push("opacity-50")
   }

   function increment(e: React.MouseEvent) {
      e.stopPropagation()
      incrementProductAmount()
   }

   function decrement(e: React.MouseEvent) {
      e.stopPropagation()
      decrementProductAmount()
   }

   return (
      <button className={classes.join(" ")}
              onClick={() => handleSelect(product)}
              disabled={paymentInProgress || purchaseCompleted}
              type="button">

         <div className="text-xl font-bold mb-3">{product.name}</div>

         <div className="mt-auto">
            <div className="mb-2">price: {Number(product.price).toFixed()}$</div>
            <div className="flex items-end justify-between text-xs relative">
               <div className="italic">left: {product.amount}</div>

               {selected &&
                  <ChooseAmountWidget increment={increment}
                                      decrement={decrement}
                                      productAmount={productAmount}
                                      visible={stateChoosingAmount}
                  />
               }
            </div>
         </div>
      </button>
   )
}
