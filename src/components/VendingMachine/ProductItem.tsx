import React, {FC, useContext} from 'react'
import {IProduct} from "@/models/Product.ts";
import {VendorContext} from "@/context/VendorContext.tsx";
import {PurchaseStatus} from "@/models/PurchaseStatus.ts";
import {ChooseAmountWidget} from "@/components/VendingMachine/ChooseAmountWidget.tsx";

interface IProductItem {
    product: IProduct
    handleSelect: (product: IProduct) => void
    selected: boolean,
    productAmount?: number
}

export const ProductItem: FC<IProductItem> = ({product, handleSelect, selected, productAmount}) => {
    const {incrementProductAmount, decrementProductAmount, purchaseStatus} = useContext(VendorContext)

    const classes = ["flex-1", "flex", "flex-col", "items-stretch", "rounded-2xl", "border", "px-4", "py-3", "transition-colors"]

    const stateChoosingAmount = PurchaseStatus.ChooseAmount === purchaseStatus
    const paymentInProgress = PurchaseStatus.InsertMoney === purchaseStatus
    const purchaseCompleted = PurchaseStatus.ProcessPayment === purchaseStatus
    const stepReturnMoney = PurchaseStatus.ReturnMoney === purchaseStatus
    const isDisabled = paymentInProgress || purchaseCompleted || stepReturnMoney || product.amount === 0

    if (selected) {
        classes.push("bg-blue-50 border-blue-400")
    } else {
        if (isDisabled) {
            classes.push("opacity-50")
        } else {
            classes.push("hover:bg-gray-50")
        }
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
                disabled={isDisabled}
                type="button">

            <div className="sm:text-xl font-bold mb-3">{product.name}</div>

            <div className="mt-auto">
                <div className="mb-2">price: {product.priceView}</div>
                <div className="flex items-end justify-between text-xs relative">
                    <div className="italic mb-8 xs:mb-0">left: {product.amount}</div>

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
