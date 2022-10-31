import { Member, CategoryJa } from "@/types/members";

/**
 * メンバー情報をカテゴリーで絞り込みます
 *
 * @param members  メンバー配列
 * @param category カテゴリー文字列
 */
const categoryFilter = (members: Member[], category: CategoryJa): Member[] => {
  return members.filter(member => member.category.includes(category));
}

/**
 * 全メンバー情報
 */
export const useMembers = () => {
  return useFetch<Member[]>('/api/members', {
    method: 'GET',
  });
}

/**
 * 選手
 */
export const usePlayers = () => {
  return useFetch<Member[]>('/api/members', {
    method: 'GET',
    params: { category: 'players' },
  });
}

/**
 * スタッフ
 */
export const useStaff = () => {
  return useFetch<Member[]>('/api/members', {
    method: 'GET',
    params: { category: 'staff' },
  });
}

/**
 * OB
 */
export const useOldBoys = () => {
  return useFetch<Member[]>('/api/members', {
    method: 'GET',
    params: { category: 'ob' },
  });
}
