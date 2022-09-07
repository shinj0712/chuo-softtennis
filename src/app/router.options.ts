import type { RouterOptions } from '@nuxt/schema';
interface scrollPosition {
  behavior?: 'smooth' | 'auto';
  left?: number;
  top?: number;
  el?: string | Element;
}

// https://router.vuejs.org/api/interfaces/routeroptions.html
// https://develop365.gitlab.io/nuxtjs-2.8.X-doc/ja/api/configuration-router/
export default <RouterOptions> {
  scrollBehavior: (to, from, savedPosition) => {
    let position: scrollPosition = { left: 0, top: 0, behavior: 'smooth' }

    // Popstate イベント時はポジション維持（ブラウザの戻るボタン等）
    if (savedPosition) {
      position = {...savedPosition, behavior: 'smooth'};
    }

    return new Promise<scrollPosition>((resolve, reject) => {
      if (to.hash && document.querySelector(to.hash)) {
        position = { el: to.hash, behavior: 'smooth' }
      }
      return resolve(position)
    })
  }
}
