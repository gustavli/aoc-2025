import { assertEquals } from "@std/assert/equals";
import { input } from "./day06.input.ts";

const part_1 = (input: string): number => {
    const lines = input.split("\n").map(line => line.trim().split(/\s+/))

    let sum = 0

    for (let i = 0; i < lines[0].length; i++) {
        const mode = lines[lines.length - 1][i]

        const line_answer = lines.reduce((accumulator, currentValue) => {
            const value = Number(currentValue[i])
            if (isNaN(value)) {
                return accumulator
            }
            return add_or_multiply(mode, accumulator, value)
        }, mode === "*" ? 1 : 0)

        sum += line_answer
    }
    return sum
}


const part_2 = (input: string): number => {
    const lines = input.split("\n")
    const regex = new RegExp("[\*\+]", "gi")
    const modes = lines[lines.length - 1]
    const number_starts = [...modes.matchAll(regex).map(a => a.index)]

    let result = 0

    for (let i = 0; i < number_starts.length; i++) {
        const mode = modes[number_starts[i]]

        const from = number_starts[i]
        const to = i === number_starts.length - 1 ? lines[0].length - 1 : number_starts[i + 1] - 2

        let line_result = mode === "*" ? 1 : 0
        for (let j = from; j <= to; j++) {
            const new_num_arr: string[] = []
            for (let idx = 0; idx < lines.length - 1; idx++) {

                const c = lines[idx][j]
                if (c !== " ") {
                    new_num_arr.push(c)
                }
            }
            const new_num = Number(new_num_arr.join(""))
            line_result = add_or_multiply(mode, line_result, new_num)
        }
        result += line_result
    }

    return result
}

const add_or_multiply = (mode: string, first: number, second: number) => {
    switch (mode) {
        case "*":
            return first * second
        case "+":
            return first + second
        default:
            throw new Error("unknown mode")
    }
}


Deno.test("part_1_input", () => {
    const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `
    assertEquals(part_1(input), 4277556)
})

Deno.test("part_2_input", () => {
    const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `
    assertEquals(part_2(input), 3263827)
})

if (import.meta.main) {
    console.log("part 1:", part_1(input))
    console.log("part 2:", part_2(input))
}