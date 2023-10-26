import {PurchaseStatus} from "@/models/PurchaseStatus.ts";
import {FC} from "react";

interface IDisplayStatus {
    status: PurchaseStatus
}

export const DisplayStatus: FC<IDisplayStatus> = ({status}) => {
    const statusTitle = (state: PurchaseStatus): string => {
        switch (state) {
            case PurchaseStatus.choosingAmountOfProduct:
                return "Choose amount:"
            case PurchaseStatus.paymentInProgress:
                return "Please make a payment"
            case PurchaseStatus.purchaseCompleted:
                return "Thanks! Enjoy the purchased product :)"
            default:
                return "Select a product:"
        }
    }


    return (
        <div className="inline-block border-b-white border-b">{
            statusTitle(status)}
        </div>
    )
}
