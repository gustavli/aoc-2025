import { assertEquals } from "@std/assert/equals";
import { input } from "./day08.input.ts";

interface JunctionBox {
    x: number
    y: number
    z: number
}

interface Distance {
    from: JunctionBox
    to: JunctionBox
    distance: number
}

const euclidian_distance = (a: JunctionBox, b: JunctionBox): number => Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2))
const sameBox = (a: JunctionBox, b: JunctionBox) => a.x === b.x && a.y === b.y && a.z === b.z

const part_1 = (input: string, n_shortest = 1000): number => {
    const lines = input.split("\n")
    const boxes: JunctionBox[] = lines.map(line => {
        const [x, y, z] = line.split(",").map(Number)
        return { x, y, z }
    })
    const distances: Distance[] = []
    for (let i = 0; i < boxes.length; i++) {
        for (let j = i; j < boxes.length; j++) {
            const from = boxes[i]
            const to = boxes[j]
            const distance = euclidian_distance(from, to)
            if (distance !== 0) {
                distances.push({ from, to, distance })
            }
        }
    }

    const sorted_distances = distances.sort((a, b) => b.distance - a.distance)
    const circuits: JunctionBox[][] = []

    for (let i = 0; i < n_shortest; i++) {
        const shortest = sorted_distances.pop()!

        const toCircuit = circuits.findIndex(circuit => circuit.some(junction => sameBox(junction, shortest.to)))
        const fromCircuit = circuits.findIndex(circuit => circuit.some(junction => sameBox(junction, shortest.from)))

        if (toCircuit !== -1 && fromCircuit !== -1 && toCircuit === fromCircuit) {
            //do nothing
        }
        else if (toCircuit !== -1 && fromCircuit !== -1) {
            circuits[toCircuit].push(...circuits[fromCircuit])
            circuits.splice(fromCircuit, 1)
        } else if (toCircuit !== -1 && fromCircuit === -1) {
            circuits[toCircuit].push(shortest.from)
        } else if (fromCircuit !== -1 && toCircuit === -1) {
            circuits[fromCircuit].push(shortest.to)
        } else {
            circuits.push([shortest.from, shortest.to])
        }
    }
    return circuits.sort((a, b) => b.length - a.length).slice(0, 3).reduce((accumulator, currentValue) => accumulator * currentValue.length, 1)
}

const part_2 = (input: string): number => {
    const lines = input.split("\n")
    const boxes: JunctionBox[] = lines.map(line => {
        const [x, y, z] = line.split(",").map(Number)
        return { x, y, z }
    })
    const distances: Distance[] = []
    for (let i = 0; i < boxes.length; i++) {
        for (let j = i; j < boxes.length; j++) {
            const from = boxes[i]
            const to = boxes[j]
            const distance = euclidian_distance(from, to)
            if (distance !== 0) {
                distances.push({ from, to, distance })
            }
        }
    }

    const sorted_distances = distances.sort((a, b) => a.distance - b.distance)
    const circuits: JunctionBox[][] = []

    for (const shortest of sorted_distances) {

        const toCircuit = circuits.findIndex(circuit => circuit.some(junction => sameBox(junction, shortest.to)))
        const fromCircuit = circuits.findIndex(circuit => circuit.some(junction => sameBox(junction, shortest.from)))

        if (toCircuit !== -1 && fromCircuit !== -1 && toCircuit === fromCircuit) {
            //do nothing
        }
        else if (toCircuit !== -1 && fromCircuit !== -1) {
            const [keep, remove] = toCircuit < fromCircuit
                ? [toCircuit, fromCircuit]
                : [fromCircuit, toCircuit]
            circuits[keep].push(...circuits[remove])
            circuits.splice(remove, 1)
        } else if (toCircuit !== -1 && fromCircuit === -1) {
            circuits[toCircuit].push(shortest.from)
        } else if (fromCircuit !== -1 && toCircuit === -1) {
            circuits[fromCircuit].push(shortest.to)
        } else {
            circuits.push([shortest.from, shortest.to])
        }

        if (circuits && circuits[0].length === boxes.length) {
            return shortest.from.x * shortest.to.x
        }
    }

    return -1
}

Deno.test("part_1_input", () => {
    const input = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`
    assertEquals(part_1(input, 10), 40)
})

Deno.test("part_2_input", () => {
    const input = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`
    assertEquals(part_2(input), 25272)
})

if (import.meta.main) {
    console.log("part 1:", part_1(input))
    console.log("part 2:", part_2(input))
}