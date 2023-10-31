export const If = (
    condition: boolean, trueCondition: string, falseCondition = ""
): string => condition ? trueCondition : falseCondition
