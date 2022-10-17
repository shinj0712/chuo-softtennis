import { Ref, onMounted, onUnmounted } from "vue";

interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
  wd: number;
}

export const useWindow = () => {
  // ブレークポイントの定義
  const breakpoints: Breakpoints = {
    sm: 320,
    md: 560,
    lg: 1025,
    wd: 1920,
  };

  // 表示幅によってデバイスの名前を返す
  const getDeviceName = (width: number): string => {
    return (width < breakpoints.md) ? 'sp' : (width >= breakpoints.lg) ? 'pc' : (width >= breakpoints.md) ? 'tablet' : '';
  }

  // リアクティブ変数の定義：DOM作成前なので0を指定
  const windowWidth: Ref<number> = ref(0);
  const windowHeight: Ref<number> = ref(0);
  const responsiveDevice: Ref<string> = ref(getDeviceName(0));

  let timer: number = 0;
  const update = (event: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      windowWidth.value = event.currentTarget.innerWidth;
      windowHeight.value = event.currentTarget.innerHeight;
      responsiveDevice.value = getDeviceName(windowWidth.value);
    }, 200);
  };

  onMounted(() => {
    // DOMがレンダリングされてからwindowオブジェクトを使用する
    windowWidth.value      = window.innerWidth;
    windowHeight.value     = window.innerHeight;
    responsiveDevice.value = getDeviceName(windowWidth.value);

    // イベント登録
    window.addEventListener('resize', update);
  });
  onUnmounted(() => window.addEventListener('resize', update));

  return {
    windowWidth: readonly(windowWidth),
    windowHeight: readonly(windowHeight),
    breakpoints: readonly(breakpoints),
    responsiveDevice: readonly(responsiveDevice),
  };
};
