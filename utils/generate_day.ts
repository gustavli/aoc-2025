export const generate_day = (year: number, day: number) => {
    const dayPadded = day.toString().padStart(2, "0")

    const path = `${year}/Day${dayPadded}`

    // Generate directory for year/date
    Deno.mkdirSync(path, { recursive: true })

    // Copy template files to day dir
    const basePath = `${path}/day${dayPadded}`
    const newInputFilePath = `${basePath}.input.ts`
    const newSolutionFilePath = `${basePath}.solution.ts`
    const newIndexFilePath = `${path}/index.ts`

    Deno.copyFileSync("./template/input.template.ts", newInputFilePath)
    Deno.copyFileSync("./template/solution.template.ts", newSolutionFilePath)
    Deno.copyFileSync("./template/index.template.ts", newIndexFilePath)


    const decoder = new TextDecoder("utf-8")
    const encoder = new TextEncoder()

    // Rewrite input import in dayX.solution.ts
    const old_solution_data = decoder.decode(Deno.readFileSync(newSolutionFilePath))
    const new_solution_data = old_solution_data.replace("dayX", `day${dayPadded}`)
    Deno.writeFileSync(newSolutionFilePath, encoder.encode(new_solution_data))

    // Rewrite DayX in index file
    const old_index_data = decoder.decode(Deno.readFileSync(newIndexFilePath))
    const new_index_data = old_index_data.replace("dayX", `day${dayPadded}`)
    console.log(new_index_data)
    Deno.writeFileSync(newIndexFilePath, encoder.encode(new_index_data))
}


if (import.meta.main) {
    const args = Deno.args

    const year = Number(args[0])
    const day = Number(args[1])

    generate_day(year, day)
}
