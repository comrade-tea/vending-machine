import type {
   IDenomination,
   TInsertedMoney
} from '@/models/Currency.ts';
import {
   getSortedIndex,
   sortAndSquashByValue
} from '@/models/Currency.ts'

export class ChangeCalculator {
   constructor(private readonly denominations: IDenomination[]) {
      if (denominations.length === 0) {
         throw new Error('Denominations array should not be empty.')
      }

      sortAndSquashByValue(this.denominations)
   }

   public getLoadedDenominations(): IDenomination[] {
      return JSON.parse(JSON.stringify(this.denominations))
   }

   public loadReceivedMoney(receivedMoney: TInsertedMoney) {
      for (const receivedDenomination of receivedMoney.entries()) {
         const [value, count] = receivedDenomination

         const index = getSortedIndex(this.denominations, value)

         if (index === this.denominations.length || value !== this.denominations[index].value) {
            console.error(`Denomination of value ${value} is not received by the vending machine.`)
            continue // Skip this denomination
         }

         // Denomination found, update the count
         this.denominations[index].count += count
      }

      console.log('loaded money', JSON.stringify(this.denominations))
   }

   /**
    * Calculate the change to return using a greedy algorithm.
    *
    * @param requiredChange - The amount of change to provide.
    * @returns An array of denominations representing the change, or null if change cannot be provided.
    */
   public getChange(requiredChange: number): IDenomination[] | null {
      if (requiredChange <= 0) {
         console.error(`Invalid amount of change is requested amount: ${requiredChange}`)
         return null
      }

      // Find the starting index for calculation
      let startIdx = getSortedIndex(this.denominations, requiredChange)

      while (startIdx < this.denominations.length && this.denominations[startIdx].count === 0) {
         startIdx++
      }

      if (startIdx === this.denominations.length) {
         console.error('The vending machine is out of money.')
         return null
      }

      // An array to track coin distribution
      const coinsDistribution = Array.from({length: this.denominations.length}).fill(0)

      // Calculate the greedy first approximation
      let [firstIdx, lastIdx] = this.getChangeGreedyFirstApproximation(
         requiredChange,
         coinsDistribution,
         startIdx
      )

      if (lastIdx === this.denominations.length) {
         console.error(
            "The Greedy algorithm failed to find a solution, or it's impossible to find a solution."
         )
         // TODO: Implement a dynamic programming solution to handle cases where Greedy fails
         return null
      }

      while (firstIdx < this.denominations.length && coinsDistribution[firstIdx] === 0) {
         firstIdx++
      }

      // Update denominations count and optimize using a second approximation
      const afterLastIdx = lastIdx + 1
      for (let i = firstIdx; i < afterLastIdx; i++) {
         this.denominations[i].count -= coinsDistribution[i]
      }

      let lastIdxForSecondApprox = lastIdx
      let wasOptimized = false
      do {
         ;[wasOptimized, firstIdx, lastIdxForSecondApprox] = this.getChangeGreedySecondApproximation(
            coinsDistribution,
            startIdx,
            firstIdx,
            lastIdxForSecondApprox
         )
      } while (wasOptimized)

      // Create and return the change array
      const change: IDenomination[] = []
      for (let i = firstIdx; i < afterLastIdx; i++) {
         if (coinsDistribution[i] !== 0) {
            change.push({
               value: this.denominations[i].value,
               count: coinsDistribution[i],
            })
         }
      }

      return change
   }

   private getChangeGreedyFirstApproximation(
      requiredChange: number,
      coinsDistribution: number[],
      startIdx: number
   ): [number /* firstIdx*/, number /* lastIdx*/] {
      let currGreedyIdx = startIdx
      let prevGreedyIdx = currGreedyIdx
      let remainingChange = requiredChange

      while (currGreedyIdx < this.denominations.length) {
         for (let i = currGreedyIdx; i < this.denominations.length; i++) {
            if (this.denominations[i].count === 0) {
               continue
            }

            const coinCount = Math.min(
               this.denominations[i].count,
               Math.floor(remainingChange / this.denominations[i].value)
            )

            coinsDistribution[i] = coinCount

            if (coinCount === 0) {
               continue
            }

            remainingChange -= coinCount * this.denominations[i].value

            if (remainingChange === 0) {
               return [prevGreedyIdx, i]
            }
         }

         if (currGreedyIdx === startIdx || coinsDistribution[prevGreedyIdx] === 0) {
            prevGreedyIdx = currGreedyIdx
            do {
               currGreedyIdx++
            } while (
               currGreedyIdx < this.denominations.length &&
               this.denominations[currGreedyIdx].count === 0
               )
         }

         coinsDistribution[prevGreedyIdx]--
         remainingChange =
            requiredChange - coinsDistribution[prevGreedyIdx] * this.denominations[prevGreedyIdx].value
      }

      return [prevGreedyIdx, this.denominations.length] // Algorithm failed to find a solution
   }

   private getChangeGreedySecondApproximation(
      coinsDistribution: number[],
      startIdx: number,
      firstIdx: number,
      lastIdx: number
   ): [boolean /* wasOptimized*/, number /* firstIdx*/, number /* lastIdx*/] {
      let wasOptimized = false

      while (lastIdx > startIdx && lastIdx >= firstIdx && coinsDistribution[lastIdx] < 2) {
         lastIdx--
      }

      for (let dividerIdx = lastIdx; dividerIdx > startIdx && dividerIdx >= firstIdx; dividerIdx--) {
         if (coinsDistribution[dividerIdx] < 2) {
            continue
         }

         if (this.denominations[startIdx].value / this.denominations[dividerIdx].value < 2) {
            break
         }

         for (let dividendIdx = startIdx; dividendIdx < dividerIdx; dividendIdx++) {
            const minDividerCoins = Math.floor(
               this.denominations[dividendIdx].value / this.denominations[dividerIdx].value
            )

            if (minDividerCoins < 2) {
               break
            }

            if (this.denominations[dividendIdx].value % this.denominations[dividerIdx].value) {
               continue
            }

            const dividendCoins = Math.min(
               Math.floor(coinsDistribution[dividerIdx] / minDividerCoins),
               this.denominations[dividendIdx].count
            )

            if (dividendCoins === 0) {
               continue
            }

            const dividerCoins = dividendCoins * minDividerCoins

            coinsDistribution[dividerIdx] -= dividerCoins
            this.denominations[dividerIdx].count += dividerCoins

            coinsDistribution[dividendIdx] += dividendCoins
            this.denominations[dividendIdx].count -= dividendCoins

            firstIdx = Math.min(firstIdx, dividendIdx)
            wasOptimized = true

            if (coinsDistribution[dividerIdx] < 2) {
               break
            }
         }
      }

      return [wasOptimized, firstIdx, lastIdx]
   }
}
