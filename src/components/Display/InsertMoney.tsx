import {Header} from "@/components/Display/Partial/Header.tsx";
import {PurchaseInfo} from "@/components/Display/Partial/PurchaseInfo.tsx";
import {Button} from "@/components/_UI/Button.tsx";
import {If} from "@/helpers/utils.ts";
import {useContext} from "react";
import {VendorContext} from "@/context/VendorContext.tsx";
import {PurchaseStatus} from "@/models/PurchaseStatus.ts";
import {currencyView} from "@/models/Currency.ts";

export const InsertMoney = () => {
    const {setPurchaseStatus, due, insertedMoney, processPayment} = useContext(VendorContext)
    const unpaidOrder = due > 0

    const cancelHandler = () => {
        if (insertedMoney.denominations.size > 0) {
            return setPurchaseStatus(PurchaseStatus.ReturnMoney)
        }
        setPurchaseStatus(PurchaseStatus.ChooseProduct)
    }

    const nextStepHandler = () => {
        // setPurchaseStatus(PurchaseStatus.Success)
        const status = processPayment();

        setPurchaseStatus(status);
    }

    return (
        <>
            <Header text={"Please make a payment:"}/>

            <PurchaseInfo/>

            <div className="mt-3 border-t-2 pt-4">
                <div>{unpaidOrder ? "your due:" : "your change"} {currencyView(Math.abs(due))}</div>
            </div>


            <div className="flex mt-10">
                <Button clickHandler={cancelHandler} attributes={{className: "bg-red-500 hover:bg-red-600"}}>
                    <span>Cancel</span>
                </Button>

                <Button clickHandler={nextStepHandler}
                        attributes={{className: `flex-1 bg-teal-500 ${If(!unpaidOrder, "hover:bg-teal-600")}`, disabled: unpaidOrder}}>
                    Pay
                </Button>
            </div>
        </>
    );
};
