import { assertEquals } from "@std/assert/equals";
import { input } from "./day05.input.ts";

const part_1 = (input: string): number => {
    const [ranges, ingredient_list] = input.split("\n\n").map(lists => lists.split("\n"))
    const ingredients = ingredient_list.map(Number)

    ranges.forEach(range => {
        const [min,max] = range.split("-").map(Number)

        let idx = 0;
        while (idx < ingredients.length) {
            const ingredient = ingredients[idx]
            if (ingredient >= min && ingredient <= max) {
                ingredients.splice(idx,1)
            }else {
                idx++
            }
            
        }
    })
    return ingredient_list.length-ingredients.length
}

interface Range {
    min: number,
    max:number
}

const part_2 = (input: string): number => {
    const ranges = input.split("\n\n")[0].split("\n").map(range => {
        const [min,max] = range.split("-").map(Number)
        return {
            min,max
        } as Range
    }).sort((a,b) => a.min-b.min)

    let idx = 0;
    while (idx < ranges.length-1) {
        const current = ranges[idx]
        const next = ranges[idx+1]
        if(current.min === next.min || current.max >= next.min-1) {
            ranges[idx] = {
                min: current.min,
                max: current.max > next.max ? current.max : next.max
            }
            ranges.splice(idx+1,1)
        }else {
            idx++
        }
    }
    return ranges.reduce((accumulator, currentValue) => accumulator+currentValue.max-currentValue.min+1, 0)
}


Deno.test("part_1_input", () => {
    const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`
    assertEquals(part_1(input), 3)
})

Deno.test("part_2_input", () => {
    const input = `12-18
3-5
10-14
16-20

1
5
8
11
17
32`
    assertEquals(part_2(input), 14)
})

Deno.test("final_input", () => {
    assertEquals(part_1(input),681)
    assertEquals(part_2(input),348820208020395)
})

if (import.meta.main) {
    console.log("part 1:", part_1(input))
    console.log("part 2:", part_2(input))
}