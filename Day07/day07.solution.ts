import { assertEquals } from "@std/assert/equals";
import { input } from "./day07.input.ts";

const part_1 = (input: string): number => {
    const lines = input.split(("\n"))

    const start = lines[0].indexOf("S")

    let techyon_beams: Set<number> = new Set([start])
    let splits = 0;

    for(let idx = 2; idx < lines.length; idx+=2) {
        const line = lines[idx]
        const new_set = new Set<number>()
        techyon_beams.forEach(beam_idx => {
            if (line[beam_idx] === "^") {
                splits++
                new_set.add(beam_idx+1)
                new_set.add(beam_idx-1) 
            }else {
                new_set.add(beam_idx)
            }
        })

        techyon_beams = new_set
    }   
    return splits
}

interface Beam {
    index: number,
    timelines: number
}

const part_2 = (input: string): number => {
    const lines = input.split(("\n"))
    const start = lines[0].indexOf("S")

    let techyon_beams: Map<number,number> = new Map([[start,1]])

    for(let idx = 2; idx < lines.length; idx++) {
        const line = lines[idx]
        // map over beam index to amount of timelines
        const new_set: Map<number, number> = new Map()
        techyon_beams.forEach((beam_timelines,beam_index) => {
            if (line[beam_index] === "^") {
                const first_beam_timelines = new_set.get(beam_index-1)
                new_set.set(beam_index-1,first_beam_timelines ? first_beam_timelines+beam_timelines : beam_timelines)
                const second_beam_timelines = new_set.get(beam_index+1)
                new_set.set(beam_index+1, second_beam_timelines ? second_beam_timelines+beam_timelines:beam_timelines)
            } else {
                const current_timelines = new_set.get(beam_index)
                new_set.set(beam_index, current_timelines ? current_timelines+beam_timelines: beam_timelines)
            }
        })
        techyon_beams = new_set
    }   

    let timelines = 0
    for (const beam of techyon_beams.values()) {
        timelines+=beam
    }
    return timelines
}

Deno.test("part_1_input", () => {
    const input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`
    assertEquals(part_1(input), 21)
})

Deno.test("part_2_input", () => {
    const input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`
    assertEquals(part_2(input), 40)
})

if (import.meta.main) {
    console.log("part 1:", part_1(input))
    console.log("part 2:", part_2(input))
}