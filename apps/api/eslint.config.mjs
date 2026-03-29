import { nestJsConfig } from '@lms/eslint-config/nestjs';

/** @type {import("eslint").Linter.Config} */
export default [
	...nestJsConfig,
	{
		ignores: ['.prettierrc.mjs', 'eslint.config.mjs'],
	},
];