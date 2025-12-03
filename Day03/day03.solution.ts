import { assertEquals } from "@std/assert/equals";
import { input } from "../Day03/day03.input.ts";


const part_1 = (input:string):number => {
    const lines = input.split("\n")
    return lines.reduce((accumulator, currentValue) => accumulator+check_largest_joltage(currentValue), 0)
    
}

const part_2 = (input:string):number => {
    return 0
}

const check_largest_joltage_12 = (battery:string):number => {
    const MAX_LENGTH = 12
    let largest: number[] = []
    const levels = battery.split("").map(Number)

    //find max start
    const max = levels.slice(0,levels.length-MAX_LENGTH).reduce((accumulator,currentValue) => accumulator < currentValue ? currentValue : accumulator)
    const maxIndex = levels.findIndex(v => v == max)
    largest = levels.slice(maxIndex,maxIndex+MAX_LENGTH)

    console.log(levels.slice(maxIndex+MAX_LENGTH))

    return Number(largest.join(""))
}


const check_largest_joltage = (battery: string):number => {
    const levels = battery.split("").map(Number)

    let largest: number | undefined = undefined
    let second_largest: number | undefined = undefined

    levels.forEach(level => {
        if(largest === undefined) largest = level
        else if (second_largest === undefined) second_largest = level
        else if (second_largest > largest) {
            largest = second_largest
            second_largest = level
        }
        else if (level > second_largest) {
            second_largest = level
        }
    })


    return Number(`${largest}${second_largest}`)
} 



Deno.test("check_largest_joltage_12", () => {
    assertEquals(check_largest_joltage_12("987654321111111"), 987654321111)
    assertEquals(check_largest_joltage_12("811111111111119"), 811111111119)
    assertEquals(check_largest_joltage_12("234234234234278"), 434234234278)
    assertEquals(check_largest_joltage_12("818181911112111"), 888911112111)
})
Deno.test("check_largest_joltage", () => {
    assertEquals(check_largest_joltage("987654321111111"), 98)
    assertEquals(check_largest_joltage("811111111111119"), 89)
    assertEquals(check_largest_joltage("234234234234278"), 78)
    assertEquals(check_largest_joltage("818181911112111"), 92)
})

Deno.test("part_1_input", () => {
    const input = `987654321111111
811111111111119
234234234234278
818181911112111`

    assertEquals(part_1(input),357)
})

Deno.test("part_2_input", () => {
    const input = `987654321111111
811111111111119
234234234234278
818181911112111`
    
        assertEquals(part_2(input),3121910778619)
})

if (import.meta.main) {
    console.log("part 1:",part_1(input))
    console.log("part 2:",part_2(input))
}