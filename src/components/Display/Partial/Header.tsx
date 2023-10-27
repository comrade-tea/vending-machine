type TDisplayStatus = { text: string };

export const Header = ({text}: TDisplayStatus) => {
    return (
        <div className="inline-block border-b-white border-b pb-0.5 mb-3">
            {text}
        </div>
    )
}