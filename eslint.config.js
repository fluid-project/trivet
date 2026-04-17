import {defineConfig} from 'eslint/config';
import eslintConfigInclusiveDesign from '@inclusive-design/eslint-config';

export default defineConfig([
	{
		extends: [eslintConfigInclusiveDesign],
	},
	{
		ignores: ['_site/**', 'README.md'],
	},
]);
