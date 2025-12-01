import { assertEquals } from "@std/assert/equals";
import { input } from "./day01.input.ts";

export const part_1 = (input: string): number => {
    const lines = read_input(input)

    let current_location = 50
    let zero_indices = 0

    lines.forEach(line => {
        const direction = line.charAt(0)
        const rotations = Number(line.slice(1))
        const full_rotations = rotations / 100
        const changes = rotations % 100
        

        current_location = move(current_location,direction==="L" ? "LEFT" : "RIGHT", changes)

        zero_indices +=full_rotations
        if(current_location === 0) zero_indices++
    })

    return zero_indices
}

export const part_2 = (input: string): number => {
    return 1
}

const read_input = (input:string): string[] => {
    return input.split("\n")
}

const move = (current: number, direction: "LEFT" | "RIGHT", rotations: number):number => {
    switch(direction) {
        case "LEFT": {
            if (rotations > current) return 100-(rotations-current)
            return current-rotations
        }
        case "RIGHT":
            if (current+rotations>99) return rotations-(100-current)
            return current+rotations
    }
}

export const run = () => {
    console.log("Part 1:", part_1(input))
    console.log("Part 2:", part_2(input))
}


if (import.meta.main) {
    run();
}


Deno.test("move", () => {
    assertEquals(move(11,"RIGHT",8), 19)
    assertEquals(move(19,"LEFT",19), 0)
    assertEquals(move(5,"LEFT",10), 95)
    assertEquals(move(95,"RIGHT",5), 0)
    assertEquals(move(99,"RIGHT",1), 0)
    assertEquals(move(99,"RIGHT",5), 4)
})


Deno.test("read_input", () => {
    const res = read_input(`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`)
assertEquals(res.length,10)
})