import {Header} from "@/components/Display/Partial/Header.tsx";
import {ChangeTable} from "@/components/Display/Partial/ChangeTable.tsx";
import {useContext} from "react";
import {VendorContext} from "@/context/VendorContext.tsx";
import {Button} from "@/components/_UI/Button.tsx";
import {PurchaseStatus} from "@/models/PurchaseStatus.ts";

export const Success = () => {
    const {setPurchaseStatus, currentProduct, change, productAmount} = useContext(VendorContext)

    const cancelHandler = () => {
        setPurchaseStatus(PurchaseStatus.ChooseProduct)
    }
    
    return (
        <>
            <Header text={"Thanks! Enjoy the purchased product :)"}/>

            {!!change.length && <div className="mb-2">Here's your change</div>}
            <ChangeTable moneyToReturn={change} totalChange={(currentProduct?.price ?? 0) * productAmount}/>
            
            <div className="flex mt-10">
                <Button clickHandler={cancelHandler} attributes={{className: "bg-red-500 hover:bg-red-600"}}>
                    <span>Ok</span>
                </Button>
            </div>
        </>
    );
};
