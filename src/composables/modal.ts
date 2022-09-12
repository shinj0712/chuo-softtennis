import { Ref, readonly } from "vue";

export const useModal = () => {
  const isShowRef: Ref<boolean> = ref(false);

  // モーダルを開く
  const openModal = () => {
    isShowRef.value = true;
  }

  // モーダルを閉じる
  const closeModal = () => {
    isShowRef.value = false;
  }

  return {
    isShowRef: readonly(isShowRef),
    openModal,
    closeModal,
  }
}
