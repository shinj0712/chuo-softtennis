import { Ref } from "vue";

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

  // 表示幅によってデバイスの名前を返す関数です
  const getDeviceName = (width: number): string => {
    return (width < breakpoints.md) ? 'sp' : (width >= breakpoints.lg) ? 'pc' : (width >= breakpoints.md) ? 'tablet' : '';
  }

  // リアクティブ変数の定義
  const windowWidth: Ref<number> = ref(window.innerWidth);
  const windowHeight: Ref<number> = ref(window.innerHeight);
  const responsiveDevice: Ref<string> = ref(getDeviceName(window.innerWidth));

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

  onMounted(() => window.addEventListener('resize', update));
  onUnmounted(() => window.addEventListener('resize', update));

  return {
    windowWidth: readonly(windowWidth),
    windowHeight: readonly(windowHeight),
    breakpoints: readonly(breakpoints),
    responsiveDevice: readonly(responsiveDevice),
  };
};
