import type {FC} from 'react';
import React from 'react'
import {FaArrowDown, FaArrowUp} from 'react-icons/fa'

interface IChooseAmountWidget {
    productAmount?: number
    visible: boolean
    increment: (e: React.MouseEvent) => void
    decrement: (e: React.MouseEvent) => void
}

export const ChooseAmountWidget: FC<IChooseAmountWidget> = ({productAmount, increment, decrement, visible,}) => (
    <div className="absolute bottom-0 right-0 flex items-end">
        <div className="me-2">
            amount: <b>x{productAmount}</b>
        </div>

        {visible ? <div className="flex flex-col gap-0.5">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
                className="bg-gray-500 text-white rounded p-0.5 transition-colors hover:bg-black"
                onClick={increment}
            >
                {/* eslint-disable-next-line react/forbid-component-props */}
                <FaArrowUp className="text-sm"/>
            </div>

            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
                className="bg-gray-500 text-white rounded p-0.5 transition-colors hover:bg-black"
                onClick={decrement}
            >
                {/* eslint-disable-next-line react/forbid-component-props */}
                <FaArrowDown className="text-sm"/>
            </div>
        </div> : null
        }
    </div>
)
