import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
	},
	ssr: false,
	target: 'static',
	typescript: {
		strict: true,
	},
	css: [
		// TODO:sourcemapエラーを修正する
		'@/assets/css/reset.css',
	],
	head: {
		link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
	},
});
