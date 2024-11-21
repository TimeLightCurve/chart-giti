module.exports = {
	preset: 'ts-jest',
	testMatch: ['**/?(*.)+(test).ts?(x)'],
	transform: {
		'\\.[jt]sx?$': 'esbuild-jest',
		"^.+\\.tsx?$": ["babel-jest", { presets: ["@babel/preset-env"] }],
	},
	moduleNameMapper: {
		'date-fns/esm': 'date-fns',
	},
	setupFiles: ['jest-canvas-mock'],
};
