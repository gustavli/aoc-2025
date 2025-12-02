import { assertEquals } from "@std/assert/equals";
import { input } from "../Day02/day02.input.ts";


const part_1 = (input:string):number => {
    const lines = input.split(",")
    
    var ids: number[] = []

    lines.forEach(line => {
        const line_values = line.split("-")
        ids.push(...check_for_invalid_ids_twice(Number(line_values[0]),Number(line_values[1])))
    })

    return ids.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

const part_2 = (input:string):number => {
    const lines = input.split(",")
    
    var ids: number[] = []

    lines.forEach(line => {
        const line_values = line.split("-")
        const invalidIds = check_for_invalid_ids_n(Number(line_values[0]),Number(line_values[1]))
        ids.push(...invalidIds)
    })

    return ids.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}


const check_for_invalid_ids_n = (min:number,max:number): number[] => {
    const invalid: number[] = []

    for (let id = min; id<=max; id++) {
        const id_string = id.toString()

        loop_check_invalid: for (let size = 1; size <= id_string.length/2; size++) {
            if(id_string.length % size === 0) {
                const parts = chunks(id_string,size)
                if(parts.every(v => v===parts[0])){
                    invalid.push(id)
                    break loop_check_invalid
                }
            }
        }
    }
    return invalid
} 

const check_for_invalid_ids_twice = (min:number,max:number): number[] => {
    let invalid: number[] = []

    for (var id = min; id<=max; id++) {
        const id_string = id.toString()
        if(id_string.length%2 === 0) {
            const halves = chunks(id_string,id_string.length/2)
            if(halves.every(v => v===halves[0])) invalid.push(id)
        }
    }

    return invalid
} 

const chunks = (s: string, size: number): string[] => {
    var chunk_arr: string[] = []
    for (let i = 0; i < s.length; i += size) {
        const chunk = s.slice(i, i + size);
        if(chunk.length === size)chunk_arr.push(chunk)
    }
    return chunk_arr
}

if (import.meta.main) {
    console.log("part_1",part_1(input));
    console.log("part_2", part_2(input))
}

Deno.test("chunks", () => {
    assertEquals(chunks("123123123",3),["123","123","123"])
    assertEquals(chunks("123123123",4),["1231","2312"])
    assertEquals(chunks("1234",4),["1234"])
})

Deno.test("part_2_check", () => {
    assertEquals(check_for_invalid_ids_n(11,22),[11,22])
    assertEquals(check_for_invalid_ids_n(95,115),[99,111])
    assertEquals(check_for_invalid_ids_n(998,1012),[999,1010])
    assertEquals(check_for_invalid_ids_n(222220,222224),[222222])
    assertEquals(check_for_invalid_ids_n(446443,446449),[446446])
})


Deno.test("part_1_check", () => {
    assertEquals(check_for_invalid_ids_twice(11,22),[11,22])
    assertEquals(check_for_invalid_ids_twice(95,115),[99])
    assertEquals(check_for_invalid_ids_twice(998,1012),[1010])
})


Deno.test("part_1_input", () => {
    const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`

    assertEquals(part_1(input),1227775554)
})

Deno.test("part_2_input", () => {
    const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
    1698522-1698528,446443-446449,38593856-38593862,565653-565659,
    824824821-824824827,2121212118-2121212124`
    
        assertEquals(part_2(input),4174379265)
})