import type {FC} from "react";
import {useCallback} from "react";

import {If} from "@/helpers/utils.ts";

interface ICustomerCurrencyItem {
    money: number
    caption: string
    orderAvailable: boolean
    insertMoney: (money: number) => void
}

export const CustomerCurrencyItem: FC<ICustomerCurrencyItem> = ({money, orderAvailable, insertMoney, caption}) => {
    const btnClasses = `w-full py-1.5 px-4 border rounded border-gray-600 text-white transition-colors`
    
    const clickHandler = useCallback(() => {
        insertMoney(money);
    }, [insertMoney, money])
    
    return (
        <button
            className={`${btnClasses} ${If(orderAvailable, 'bg-green-500 hover:bg-green-600', 'bg-gray-300')}`}
            onClick={clickHandler}
            disabled={!orderAvailable}
            type="button">
            {caption}
        </button>
    )
}
