import {FC, useContext} from 'react'
import {Button} from "@/components/_UI/Button";
import {MachineContext} from "@/context/MachineContext.tsx";
import {PurchaseStatus} from "@/models/PurchaseStatus.ts";
import {If} from "@/helpers/utils.ts";

interface IMachineControls {
   unpaidOrder: boolean
}

export const MachineControls: FC<IMachineControls> = ({unpaidOrder}) => {
   const {nextStep, resetMachine, purchaseStatus} = useContext(MachineContext);

   const nextStepText = (): string => {
      switch (purchaseStatus) {
         case PurchaseStatus.paymentInProgress:
            return "Pay"
         case PurchaseStatus.purchaseCompleted:
            return "OK!"
         default:
            return "To payment"
      }
   }


   return (
      <div className="flex mt-10">
         <Button clickHandler={resetMachine} attributes={{className: "bg-red-500 hover:bg-red-600"}}>
            <span>Cancel</span>
         </Button>

         <Button clickHandler={nextStep}
                 attributes={{
                    className: `bg-teal-500 ${If(!unpaidOrder, "hover:bg-teal-600")}`,
                    disabled: unpaidOrder
                 }}>
            {nextStepText()}
         </Button>
      </div>
   )
}
