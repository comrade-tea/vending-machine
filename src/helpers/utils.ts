export const If = (condition: boolean, trueCondition: string, falseCondition: string = ""): string => {
   return condition ? trueCondition : falseCondition
}
