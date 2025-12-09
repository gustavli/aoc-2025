import { assertEquals } from "@std/assert/equals";
import { input } from "./day09.input.ts";

interface Coordinate {
    x: number
    y: number
}

const area = (a: Coordinate, b: Coordinate): number => (Math.abs(b.x - a.x) + 1) * (Math.abs(b.y - a.y) + 1)

const part_1 = (input: string): number => {
    const coordinates: Coordinate[] = input.split("\n").map(line => {
        const [x, y] = line.split(",").map(Number)
        return { x, y }
    })

    let max = 0
    for (let i = 0; i < coordinates.length; i++) {
        for (let j = i; j < coordinates.length; j++) {
            const square_area = area(coordinates[i], coordinates[j])
            if (square_area > max) max = square_area
        }
    }

    return max
}

const part_2 = (input: string): number => {
    const coordinates: Coordinate[] = input.split("\n").map(line => {
        const [x, y] = line.split(",").map(Number)
        return { x, y }
    })
    return 0
}

Deno.test("area", () => {
    assertEquals(area({ x: 7, y: 1 }, { x: 11, y: 7 }), 35)
    assertEquals(area({ x: 2, y: 5 }, { x: 9, y: 7 }), 24)
    assertEquals(area({ x: 7, y: 3 }, { x: 2, y: 3 }), 6)
    assertEquals(area({ x: 2, y: 5 }, { x: 11, y: 1 }), 50)
})

Deno.test("part_1_input", () => {
    const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`
    assertEquals(part_1(input), 50)
})

Deno.test("part_2_input", () => {
    const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`
    assertEquals(part_2(input), 24)
})

if (import.meta.main) {
    console.log("part 1:", part_1(input))
    console.log("part 2:", part_2(input))
}