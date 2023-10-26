import {useContext} from "react";
import {Currency} from "@/models/Currency.ts";
import {MachineContext} from "@/context/MachineContext.tsx";
import {PurchaseStatus} from "@/models/PurchaseStatus.ts";
import {If} from "@/helpers/utils.ts";

export const CustomerDenominations = () => {
   const {purchaseStatus, insertMoney, due} = useContext(MachineContext);
   const currencyData = Currency().getList();

   const isPaymentStep = purchaseStatus === PurchaseStatus.paymentInProgress;
   const orderAvailable = due === null || due >= 0 && isPaymentStep

   const btnClasses = `w-full py-1.5 px-4 border rounded border-gray-600 text-white transition-colors`;
   
   return (
      <ul className="grid grid-cols-2 gap-2">
         {currencyData.map(([caption, value]) => {
            const clickHandler = () => insertMoney(value);
            
            return (
               <li key={value}>
                  <button type="button" onClick={clickHandler} disabled={!orderAvailable}
                          className={`${btnClasses} ${If(orderAvailable, "bg-green-500 hover:bg-green-600", "bg-gray-300")}`}>
                     {caption}
                  </button>
               </li>
            );
         })}
      </ul>
   )
}
