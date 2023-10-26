import {FC, useContext} from 'react'
import {Button} from "@/components/_UI/Button";
import {VendorContext} from "@/context/VendorContext.tsx";
import {If} from "@/helpers/utils.ts";

interface IMachineControls {
    // unpaidOrder: boolean
}

export const Controls: FC<IMachineControls> = ({}) => {
    const {setPurchaseStatus, resetMachine, purchaseStatus} = useContext(VendorContext);

    return (
        <div>delete this</div>
        // <div className="flex mt-10">
        //     <Button clickHandler={resetMachine} attributes={{className: "bg-red-500 hover:bg-red-600"}}>
        //         <span>Cancel</span>
        //     </Button>
        //
        //     <Button clickHandler={nextStep}
        //             attributes={{
        //                 className: `flex-1 bg-teal-500 ${If(!unpaidOrder, "hover:bg-teal-600")}`,
        //                 disabled: unpaidOrder
        //             }}>
        //         {}
        //     </Button>
        // </div>
    )
}
