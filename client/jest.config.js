module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    rootDir: "./src",
    moduleNameMapper: {
        "\\.(s?css)$": "identity-obj-proxy",
        "@/(.*)$": "<rootDir>/src/$1",
    },
};
