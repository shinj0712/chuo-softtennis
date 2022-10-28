import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	target: 'static',

	build: {
		transpile: ['swiper'],
		cssSourceMap: false,
		analyze: true,
	},

	css: [
		// TODO:sourcemapエラーを修正する
		'@/assets/css/reset.css',
	],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					sourceMap: false,
					additionalData: '@use "@/assets/sass/main.scss" as *;',
				},
			},
		},
		plugins: [
			svgLoader({
				defaultImport: 'component',
			})
		]
	},

	runtimeConfig: {
		// 非公開
		googleSheetsId: '',
		sheetsApiPrivateKey: '',
		sheetsApiClientEmail: '',
		microCmsApiKey : '',
		microCmsBaseUrl: '',

		// 公開
		public: {
			appName: '中央大学ソフトテニス部白門会',
			baseUrl: 'https://chuo-st.com',
		},
	},
});
