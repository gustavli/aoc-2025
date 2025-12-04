import { assertEquals } from "@std/assert/equals";
import { input } from "./day04.input.ts";


const part_1 = (input: string): number => {
    const lines = input.split("\n").map(line => line.split(""))
    
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            console.log("checking ", i, j)
            for (let check_x = -1; check_x <=1; check_x++) {
                for (let check_y = -1; check_y <= 1; check_y++) {
                    if (check_x === 0 && check_y === 0) continue;
                }
            }
        }
    }
    return 0
}

const part_2 = (input: string): number => {
    return 0
}


Deno.test("part_1_input", () => {
    const input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

    assertEquals(part_1(input), 13)
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