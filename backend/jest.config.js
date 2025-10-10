module.exports = {
    testEnvironment: "node",
    setupFilesAfterEnv: ["./src/jest.setup.ts"],
    testPathIgnorePatterns: ["/node_modules/"],
    moduleFileExtensions: ["js", "ts", "json", "node"],
    transform: {
        "^.+\\.ts$": "ts-jest",
    },
};
