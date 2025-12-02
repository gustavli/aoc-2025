import { assertEquals } from "@std/assert/equals";
import { input } from "../Day02/day02.input.ts";


const part_1 = (input:string):number => {
    const lines = input.split(",")
    
    var ids: number[] = []

    lines.forEach(line => {
        const line_values = line.split("-")
        ids.push(...check_range(Number(line_values[0]),Number(line_values[1])))
    })

    return ids.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

const part_2 = (input:string):number => {

    return 0
}


const check_range = (min:number,max:number): number[] => {
    let invalid: number[] = []

    for (var id = min; id<=max; id++) {
        const id_string = id.toString()
        if(id_string.length%2 === 0) {
            const first = id_string.slice(0,(id_string.length/2))
            const second = id_string.slice((id_string.length/2))
            if(first === second) invalid.push(id)
        }
    }

    return invalid
} 

if (import.meta.main) {
    console.log("part_1",part_1(input));
}


Deno.test("check_range", () => {
    assertEquals(check_range(11,22),[11,22])
    assertEquals(check_range(95,115),[99])
    assertEquals(check_range(998,1012),[1010])
})


Deno.test("part_1_input", () => {
    const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`

    assertEquals(part_1(input),1227775554)
})