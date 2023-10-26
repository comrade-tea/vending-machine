import {FC} from 'react'
import {currencyView, IDenomination} from "@/models/Currency.ts";

interface IChangeTable {
    moneyToReturn: IDenomination[] 
    totalChange?: number
}

export const ChangeTable: FC<IChangeTable> = ({moneyToReturn, totalChange}) => {
    if (!moneyToReturn.length)
        return null
    
    return (
        <div className="mt-4">
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <td className="py-2 px-2 bg-white border border-white text-black">denomination</td>
                    <td className="py-2 px-2 bg-white border border-white text-black">count</td>
                </tr>
                </thead>

                <tbody>
                {moneyToReturn.map(({value, count}) => (
                    <tr key={value}>
                        <td className="px-2 py-1 border border-white">{currencyView(value)}</td>
                        <td className="px-2 py-1 border border-white"> x{count}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {totalChange && <div className="text-xl mt-6">Total change: {currencyView(totalChange)}</div>}
        </div>
    )
}
