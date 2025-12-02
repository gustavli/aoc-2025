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

    Deno.copyFileSync("./template/input.template", newInputFilePath)
    Deno.copyFileSync("./template/solution.template", newSolutionFilePath)
    Deno.copyFileSync("./template/index.template", newIndexFilePath)


    const decoder = new TextDecoder("utf-8")
    const encoder = new TextEncoder()

    // Rewrite input import in dayX.solution.ts
    const old_solution_data = decoder.decode(Deno.readFileSync(newSolutionFilePath))
    const new_solution_data = old_solution_data.replaceAll("dayX", `day${dayPadded}`)
    Deno.writeFileSync(newSolutionFilePath, encoder.encode(new_solution_data))

    // Rewrite DayX in index file
    const old_index_data = decoder.decode(Deno.readFileSync(newIndexFilePath))
    const new_index_data = old_index_data.replaceAll("dayX", `day${dayPadded}`)
    Deno.writeFileSync(newIndexFilePath, encoder.encode(new_index_data))
}


if (import.meta.main) {
    const args = Deno.args

    const year = Number(args[0])
    const day = Number(args[1])

    try {
        generate_day(year, day)
        console.log("Generated day")
    } catch (err) {
        console.log("Failed generating day", err)
    }
}
