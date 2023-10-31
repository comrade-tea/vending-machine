import type {FC} from 'react';
import React from 'react'

interface IButtonStep {
    children: React.ReactNode
    clickHandler: () => void
}

export const ButtonStep: FC<IButtonStep> = ({children, clickHandler}) => (
    <button
        onClick={clickHandler}
        className="flex-shrink-0 basis-[40px] flex justify-center items-center px-2 bg-blackd border-white border text-white transition-colors hover:bg-gray-700"
        type="button">
        {children}
    </button>
)
