import {useCallback, useContext} from 'react'

import {Button} from '@/components/_UI/Button.tsx'
import {AmountTuner} from '@/components/Display/Partial/AmountTuner.tsx'
import {Header} from '@/components/Display/Partial/Header.tsx'
import {PurchaseInfo} from '@/components/Display/Partial/PurchaseInfo.tsx'
import {VendorContext} from '@/context/VendorContext.tsx'
import {PurchaseStatus} from '@/models/PurchaseStatus.ts'

export const ChooseAmount = () => {
    const {setPurchaseStatus} = useContext(VendorContext)

    const nextStepHandler = useCallback(() => {
        setPurchaseStatus(PurchaseStatus.InsertMoney)
    }, [setPurchaseStatus])
    
    const cancelHandler = useCallback(() => {
        setPurchaseStatus(PurchaseStatus.ChooseProduct)
    }, [setPurchaseStatus])

    return (
        <>
            <Header text="Choose amount:"/>
            
            <PurchaseInfo/>
            
            <AmountTuner/>

            <div className="flex mt-10">
                <Button
                    clickHandler={cancelHandler}
                    attributes={{className: 'bg-red-500 hover:bg-red-600'}}
                >
                    <span>Cancel</span>
                </Button>

                <Button
                    clickHandler={nextStepHandler}
                    attributes={{className: 'flex-1 bg-teal-500 hover:bg-teal-600'}}
                >
                    <span>To payment</span>
                </Button>
            </div>
        </>
    )
}
