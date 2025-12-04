import { assertEquals } from "@std/assert/equals";
import { input } from "./day04.input.ts";

const safe_access = (idx: number, max: number): boolean => {
    return idx >= 0 && idx < max
}

const part_1 = (input: string): number => {
    const lines = input.split("\n").map(line => line.split(""))
    let squares_with_forklift_access = 0
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            if (lines[i][j] !== "@") continue

            let paper_rolls = 0

            for (let check_x = -1; check_x <= 1; check_x++) {
                for (let check_y = -1; check_y <= 1; check_y++) {
                    if (!(check_x === 0 && check_y === 0)) {
                        const y = i - check_y
                        const x = j - check_x

                        if (safe_access(y, lines.length) && safe_access(x, lines[0].length)) {
                            if (lines[y][x] === "@") paper_rolls++
                        }

                    }
                }
            }
            if (paper_rolls < 4) squares_with_forklift_access++

        }
    }
    return squares_with_forklift_access
}

const part_2 = (input: string): number => {
    const lines = input.split("\n").map(line => line.split(""))
    let squares_with_forklift_access = 0


    let removed = false
    do {
        removed = false
        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[0].length; j++) {
                if (lines[i][j] !== "@") continue
                let paper_rolls = 0
                for (let check_x = -1; check_x <= 1; check_x++) {
                    for (let check_y = -1; check_y <= 1; check_y++) {
                        if (!(check_x === 0 && check_y === 0)) {
                            const y = i - check_y
                            const x = j - check_x

                            if (safe_access(y, lines.length) && safe_access(x, lines[0].length)) {
                                if (lines[y][x] === "@") paper_rolls++
                            }

                        }
                    }
                }
                if (paper_rolls < 4) {
                    squares_with_forklift_access++
                    lines[i][j] = "."
                    removed = true
                }
            }
        }
    } while (removed)

    return squares_with_forklift_access
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
    assertEquals(part_2(input), 43)
})


Deno.test("safe_access", () => {
    assertEquals(safe_access(-1, 10), false)
    assertEquals(safe_access(11, 10), false)
    assertEquals(safe_access(5, 10), true)
})

if (import.meta.main) {
    console.log("part 1:", part_1(input))
    console.log("part 2:", part_2(input))
}