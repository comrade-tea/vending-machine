import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import React, {FC} from "react";

interface IChooseAmountWidget {
   productAmount?: number
   visible: boolean
   increment: (e: React.MouseEvent) => void
   decrement: (e: React.MouseEvent) => void
}

export const ChooseAmountWidget: FC<IChooseAmountWidget> = ({productAmount, increment, decrement, visible}) => {
   return (
      <div className="absolute bottom-0 right-0 flex items-end">
         <div className="me-2">amount: <b>x{productAmount}</b></div>

         {visible &&
            <div className="flex flex-col gap-0.5">
               <div className="bg-gray-500 text-white rounded p-0.5 transition-colors hover:bg-black"
                    onClick={increment}><FaArrowUp className="text-sm"/>
               </div>

               <div className="bg-gray-500 text-white rounded p-0.5 transition-colors hover:bg-black"
                    onClick={decrement}><FaArrowDown className="text-sm"/>
               </div>
            </div>
         }
      </div>
   )
}
