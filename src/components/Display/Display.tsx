import React, {useContext} from 'react'

import {ChooseAmount} from '@/components/Display/ChooseAmount.tsx'
import {InsertMoney} from '@/components/Display/InsertMoney.tsx'
import {ReturnMoney} from '@/components/Display/ReturnMoney.tsx'
import {Success} from '@/components/Display/Success.tsx'
import {VendorContext} from '@/context/VendorContext.tsx'
import {PurchaseStatus} from '@/models/PurchaseStatus.ts'

import {ChooseProduct} from './ChooseProduct'

export const Display = () => {
    const {purchaseStatus} = useContext(VendorContext)
    const getStateView = (state: PurchaseStatus): React.ReactNode => {
        switch (state) {
            case PurchaseStatus.ChooseProduct: {
                return <ChooseProduct/>
            }
            case PurchaseStatus.ChooseAmount: {
                return <ChooseAmount/>
            }
            case PurchaseStatus.InsertMoney: {
                return <InsertMoney/>
            }
            case PurchaseStatus.Success: {
                return <Success/>
            }
            case PurchaseStatus.ReturnMoney: {
                return <ReturnMoney/>
            }

            default: {
                return <div>...</div>
            }
        }
    }

    return (
        <div className="text-white bg-black p-4 border-8 border-gray-700">
            <code>{getStateView(purchaseStatus)}</code>
        </div>
    )
}
