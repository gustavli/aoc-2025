
interface DaySolution {
  day: number
  input: string,
  part1: (input: string) => number
  part2: (input: string) => number
}


if (import.meta.main) {
  console.log("AOC 2025");
}