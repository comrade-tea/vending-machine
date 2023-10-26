import {ButtonStep} from "@/components/_UI/ButtonStep.tsx";
import {FaMinus, FaPlus} from "react-icons/fa";
import {FC} from "react";

interface IAmountTuner {
   productAmount: number
   increase: () => void
   decrease: () => void
}

export const AmountTuner: FC<IAmountTuner> = ({productAmount, increase, decrease}) => {
   return <div className="flex">
      <ButtonStep clickHandler={decrease}>
         <FaMinus/>
      </ButtonStep>
      
      <div className="bg-green-500 text-white w-full px-3 h-[40px] leading-[40px] font-mono">
         {productAmount}
      </div>
      
      <ButtonStep clickHandler={increase}>
         <FaPlus/>
      </ButtonStep>
   </div>;
}
