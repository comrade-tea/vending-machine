import {useCallback, useContext} from 'react'

import {Button} from '@/components/_UI/Button.tsx'
import {ChangeTable} from '@/components/Display/Partial/ChangeTable.tsx'
import {Header} from '@/components/Display/Partial/Header.tsx'
import {VendorContext} from '@/context/VendorContext.tsx'
import {PurchaseStatus} from '@/models/PurchaseStatus.ts'

export const ReturnMoney = () => {
   const {insertedMoney, setPurchaseStatus, isPaymentFailed} = useContext(VendorContext)

   const cancelHandler = useCallback(() => {
      setPurchaseStatus(PurchaseStatus.ChooseProduct)
   }, [setPurchaseStatus])

   const moneyToReturn = Array.from(insertedMoney.denominations, item => ({
      value: item[0],
      count: item[1],
   }));

   return (
      <>
         <Header text="Return money"/>

         <div className="text-red-500">
            {isPaymentFailed ? "Sorry, your payment failed: we don't have enough change" : null}
         </div>

         <div className="mt-2">Here&apos;s your money back</div>

         <ChangeTable
            moneyToReturn={moneyToReturn}
            totalChange={moneyToReturn.reduce((acc, current) => acc + current.value * current.count, 0)}
         />

         <div className="flex mt-10">
            <Button
               clickHandler={cancelHandler}
               attributes={{className: 'bg-red-500 hover:bg-red-600'}}>
               <span>Ok</span>
            </Button>
         </div>
      </>
   )
}
