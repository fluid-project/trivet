import markdownlintConfig from '@inclusive-design/markdownlint-config';

export default {
	config: Object.assign(markdownlintConfig.config, {
		'no-hard-tabs': {
			code_blocks: false
		},
	}),
	ignores: ['node_modules', 'src/collections/**', 'CHANGELOG.md'],
}
