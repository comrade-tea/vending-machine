import React, {FC} from 'react'
import styles from "./Button.module.css"

interface IButton<T extends Record<string, any>> {
   children: React.ReactNode
   clickHandler: () => void,
   attributes?: T
}

export const Button: FC<IButton<React.ButtonHTMLAttributes<HTMLButtonElement>>> = ({
                                                                                      children,
                                                                                      clickHandler,
                                                                                      attributes
                                                                                   }) => {
   return (
      <button
         {...attributes}
         className={[styles.button, attributes?.className].join(" ")}
         onClick={clickHandler}>
         {children}
      </button>
   )
}
