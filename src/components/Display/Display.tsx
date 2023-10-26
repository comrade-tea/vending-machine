import {useContext} from "react"
import {PurchaseStatus} from "@/models/PurchaseStatus.ts"
import {MachineContext} from "@/context/MachineContext.tsx"
import {MachineControls} from "@/components/Display/MachineControls.tsx"
import {AmountTuner} from "@/components/Display/AmountTuner.tsx";
import {MULTIPLIER} from "@/models/Currency.ts";
import {ChangeDetails} from "@/components/Display/ChangeDetails.tsx";
import {DisplayStatus} from "@/components/Display/DisplayStatus.tsx";


export const Display = () => {
    const {
        productAmount,
        purchaseStatus,
        currentProduct,
        due,
        change,
        incrementProductAmount,
        decrementProductAmount,
    } = useContext(MachineContext)
    
    
    const isChoosingAmount: boolean = PurchaseStatus.choosingAmountOfProduct === purchaseStatus
    const isPaymentInProgress: boolean = PurchaseStatus.paymentInProgress === purchaseStatus
    const isPurchaseCompleted: boolean = PurchaseStatus.purchaseCompleted === purchaseStatus

    const totalPrice = (currentProduct?.price ?? 0) * productAmount
    const unpaidOrder = isPaymentInProgress && due !== null && due > 0
    
    const formattedDue = due !== null && due / MULTIPLIER

    return (
        <div className="text-white bg-black p-4 border-8 border-gray-700">
            <code>
                <DisplayStatus status={purchaseStatus}/>

                {currentProduct && !isPurchaseCompleted &&
                    <div className="mt-4">
                        <div><span>Product: {currentProduct.name}</span></div>
                        <div>Total: {+currentProduct?.price} x {productAmount} = {totalPrice}$</div>
                    </div>
                }

                {isPaymentInProgress && due && (
                    <div className="mt-3 border-t-2 pt-4">
                        {due > 0 ?
                            <div>your due: {formattedDue}$</div>
                            :
                            <div>your change: {Math.abs(Number(formattedDue))}$</div>
                        }
                    </div>)
                }

                {isPurchaseCompleted && <ChangeDetails change={change}/>}
            </code>

            {isChoosingAmount && <AmountTuner productAmount={productAmount} increase={incrementProductAmount}
                                                decrease={decrementProductAmount}/>}

            {currentProduct && <MachineControls unpaidOrder={unpaidOrder}/>}
        </div>
    )
}
