import {useContext} from 'react'

import {CustomerCurrencyItem} from "@/components/Customer/CustomerCurrencyItem.tsx";
import {VendorContext} from '@/context/VendorContext.tsx'
import {Currency} from '@/models/Currency.ts'
import {PurchaseStatus} from '@/models/PurchaseStatus.ts'

export const CustomerCurrencyList = () => {
    const {purchaseStatus, insertMoney, due} = useContext(VendorContext)
    const {viewList} = Currency()

    const isPaymentStep = purchaseStatus === PurchaseStatus.InsertMoney
    const orderAvailable = due > 0 && isPaymentStep

    return (
        <ul className="grid grid-cols-2 gap-2">
            {viewList.map(([caption, value]) => (
                <li key={value}>
                    <CustomerCurrencyItem insertMoney={insertMoney}
                                          caption={caption}
                                          orderAvailable={orderAvailable}
                                          money={value}
                    />
                </li>
            ))}
        </ul>
    )
}
