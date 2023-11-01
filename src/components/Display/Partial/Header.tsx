import React from "react";

interface TDisplayStatus {
    text: string | React.ReactNode
}

export const Header = ({text}: TDisplayStatus) => <div className="inline-block border-b-white border-b pb-0.5 mb-3 whitespace-pre-line">
    {text}
</div>
