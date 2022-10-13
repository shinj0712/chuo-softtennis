import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	ssr: false,
	target: 'static',
	typescript: { strict: true },

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
		build: {
			sourcemap: false,
		},
		plugins: [
			svgLoader({
				defaultImport: 'component',
			})
		]
	},

	runtimeConfig: {
		GoogleSheetsId: process.env.SHEETS_ID,
		public: {
			appName: '中央大学ソフトテニス部白門会',
			baseUrl: 'https://chuo-st.com',
		}
	}
});
