import React, {FC} from 'react'

interface IButtonStep {
   children: React.ReactNode,
   clickHandler: () => void
}

export const ButtonStep: FC<IButtonStep> = ({children, clickHandler}) => {
   return (
      <button onClick={clickHandler}
              className="flex-shrink-0 basis-[40px] flex justify-center items-center px-2 bg-black text-white transition-colors hover:bg-gray-700">
         {children}
      </button>
   )
}
