import {Header} from "@/components/Display/Partial/Header.tsx";

type Props = {
    // state: PurchaseStatus
};
export const ChooseProduct = (props: Props) => {
    // const statusTitle = (state: PurchaseStatus): string => {
    //     switch (state) {
    //         case PurchaseStatus.ChooseAmount:
    //             return "Choose amount:"
    //         case PurchaseStatus.InsertMoney:
    //             return "Please make a payment"
    //         case PurchaseStatus.ReturnMoney:
    //             return "Money return"
    //         case PurchaseStatus.ProcessPayment:
    //             return "Thanks! Enjoy the purchased product :)"
    //         default:
    //             return "Select a product:"
    //     }
    // }


    return (
        <Header text={"Select a product:"}/>
        
        // <Controls unpaidOrder={}/>
    );
}
