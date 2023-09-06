import DirectoryHandler from "../../src/infra/directory/directoryHandler"

it("should return the files in temp folder", async () => {
    const files = await DirectoryHandler.findFiles('temp')
    expect(files[0]).toBe('example.txt')
})