export const If = (
    condition: boolean, trueCondition: string, falseCondition = ""
): string => condition ? trueCondition : falseCondition

export const errorFunc = (text = "Function not implemented."): Error => {
    throw new Error(text)
}
