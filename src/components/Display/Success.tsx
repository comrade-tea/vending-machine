import {useCallback, useContext} from 'react'

import {Button} from '@/components/_UI/Button.tsx'
import {ChangeTable} from '@/components/Display/Partial/ChangeTable.tsx'
import {Header} from '@/components/Display/Partial/Header.tsx'
import {VendorContext} from '@/context/VendorContext.tsx'
import {PurchaseStatus} from '@/models/PurchaseStatus.ts'

export const Success = () => {
    const {setPurchaseStatus, change} = useContext(VendorContext)

    const cancelHandler = useCallback(() => {
        setPurchaseStatus(PurchaseStatus.ChooseProduct)
    }, [setPurchaseStatus]);

    return (
        <>
            <Header text={<>Thanks! <br/> Enjoy your shopping! :)</>}/>

            {change.length > 0 && <div className="mb-2">Here&apos;s your change</div>}
            <ChangeTable
                moneyToReturn={change}
                totalChange={change.reduce((acc, current) => acc + current.value * current.count, 0)}
            />

            <div className="flex mt-10">
                <Button
                    clickHandler={cancelHandler}
                    attributes={{className: 'bg-red-500 hover:bg-red-600'}}
                >
                    <span>Ok</span>
                </Button>
            </div>
        </>
    )
}
