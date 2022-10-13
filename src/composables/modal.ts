import { Ref, readonly } from "vue";

export const useModal = () => {
  const isShowRef: Ref<boolean> = ref(false);

  // モーダルを開く
  const openModal = () => {
    document.body.classList.add('modal-open');
    isShowRef.value = true;
  }

  // モーダルを閉じる
  const closeModal = () => {
    document.body.classList.remove('modal-open');
    isShowRef.value = false;
  }

  return {
    isShowRef: readonly(isShowRef),
    openModal,
    closeModal,
  }
}
