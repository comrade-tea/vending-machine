import {ButtonStep} from "@/components/_UI/ButtonStep.tsx";
import {FaMinus, FaPlus} from "react-icons/fa";
import {FC, useContext} from "react";
import {VendorContext} from "@/context/VendorContext.tsx";

interface IAmountTuner {
}

export const AmountTuner: FC<IAmountTuner> = () => {
   const {productAmount, incrementProductAmount, decrementProductAmount} = useContext(VendorContext)
   
   return <div className="flex mt-7">
      <ButtonStep clickHandler={decrementProductAmount}>
         <FaMinus/>
      </ButtonStep>
      
      <div className="bg-green-500 text-white w-full px-3 h-[40px] leading-[40px] font-mono">
         {productAmount}
      </div>
      
      <ButtonStep clickHandler={incrementProductAmount}>
         <FaPlus/>
      </ButtonStep>
   </div>
}
