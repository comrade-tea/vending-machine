import {FC} from 'react'
import {IDenomination} from "@/models/Currency.ts";

interface IChangeDetails {
    change: IDenomination[]
}

export const ChangeDetails: FC<IChangeDetails> = ({change}) => {
    return (
        <div>
            change details:
            <table>
                <thead>
                <tr>
                    <td>value</td>
                    <td>count</td>
                </tr>
                </thead>

                <tbody>
                {change.map(item => (
                    <tr>
                        <td>
                            {item.value} {item.count}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            ))
        </div>
    )
}
