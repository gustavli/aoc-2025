import { assertEquals } from "@std/assert";
import { part_1, part_2 } from "./day01.solution.ts";

const test_input = `3   4
4   3
2   5
1   3
3   9
3   3`

Deno.test("part_1", () => {
    const res = part_1(test_input)
    assertEquals(res, 1)
})

Deno.test("part_2", () => {
    const res = part_2(test_input)
    assertEquals(res, 1)
})