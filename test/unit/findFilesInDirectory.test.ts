import findFilesInDirectory from "../../src/application/utils/findFilesInDirectory"

it("should return the files in temp folder", async () => {
    const files = await findFilesInDirectory('temp')
    expect(files[0]).toBe('example.txt')
})