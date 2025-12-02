
for (const dirEntry of Deno.readDirSync("./")) {
    if (dirEntry.isDirectory) console.log(dirEntry.name);
}
