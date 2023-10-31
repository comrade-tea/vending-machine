import type {FC} from 'react';
import React from 'react'

import styles from './Button.module.css'

interface IButton {
    children: React.ReactNode
    clickHandler: () => void
    attributes?: Record<string, unknown>
}

export const Button: FC<IButton> = ({children, clickHandler, attributes,}) => (
    <button
        {...attributes}
        className={[styles.button, attributes?.className].join(' ')}
        onClick={clickHandler}
        type="button">
        {children}
    </button>
)
