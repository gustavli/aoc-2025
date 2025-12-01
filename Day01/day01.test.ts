import { assertEquals } from "@std/assert";
import { part_1, part_2 } from "./day01.solution.ts";

const test_input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

Deno.test("part_1", () => {
    const res = part_1(test_input)
    assertEquals(res, 3)
})

Deno.test("part_2", () => {
    const res = part_2(test_input)
    assertEquals(res, 6)
})