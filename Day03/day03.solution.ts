import { assertEquals } from "@std/assert/equals";
import { input } from "./day03.input.ts";


const part_1 = (input: string): number => {
    const lines = input.split("\n")
    return lines.reduce((accumulator, currentValue) => accumulator + check_largest_joltage(currentValue, 2), 0)
}

const part_2 = (input: string): number => {
    const lines = input.split("\n")
    return lines.reduce((accumulator, currentValue) => accumulator + check_largest_joltage(currentValue, 12), 0)
}

const check_largest_joltage = (battery: string, MAX_LENGTH: number): number => {
    let largest: number[] = Array(MAX_LENGTH).fill(0, 0)
    const levels = battery.split("").map(Number)
    let last_idx = 0
    for (let i = 0; i < MAX_LENGTH; i++) {
        let candidates = levels.slice(last_idx, levels.length - (MAX_LENGTH - i - 1))
        let largestIdx = last_idx
        for (let j = 0; j < candidates.length; j++) {
            if (candidates[j] > levels[largestIdx]) {
                largestIdx = last_idx + j
            }
        }
        largest[i] = levels[largestIdx]
        last_idx = largestIdx + 1
    }
    return Number(largest.join(""))
}

Deno.test("check_largest_joltage_12", () => {
    assertEquals(check_largest_joltage("987654321111111", 12), 987654321111)
    assertEquals(check_largest_joltage("811111111111119", 12), 811111111119)
    assertEquals(check_largest_joltage("234234234234278", 12), 434234234278)
    assertEquals(check_largest_joltage("818181911112111", 12), 888911112111)
})
Deno.test("check_largest_joltage", () => {
    assertEquals(check_largest_joltage("987654321111111", 2), 98)
    assertEquals(check_largest_joltage("811111111111119", 2), 89)
    assertEquals(check_largest_joltage("234234234234278", 2), 78)
    assertEquals(check_largest_joltage("818181911112111", 2), 92)
})

Deno.test("part_1_input", () => {
    const input = `987654321111111
811111111111119
234234234234278
818181911112111`

    assertEquals(part_1(input), 357)
})

Deno.test("part_2_input", () => {
    const input = `987654321111111
811111111111119
234234234234278
818181911112111`

    assertEquals(part_2(input), 3121910778619)
})

if (import.meta.main) {
    console.log("part 1:", part_1(input))
    console.log("part 2:", part_2(input))
}