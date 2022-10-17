
import { Member } from "@/types/members";

// メンバー情報一覧APIレスポンスを状態管理する
export const useMembers = () => useState('members', () => useFetch<Member[]>('/api/members', { method: 'GET' }));

// メンバー情報一覧から選手情報を抜き出し
export const useFilteredMembers = () => {
  const membersResponse = useMembers();

  const players = computed<Member[]>(() => {
    const members = membersResponse.value.data.value ?? [];
    return members.filter(member => member.category.includes('部員'));
  });

  const staff = computed<Member[]>(() => {
    const members = membersResponse.value.data.value ?? [];
    return members.filter(member => member.category.includes('スタッフ'));
  });

  const oldBoys = computed<Member[]>(() => {
    const members = membersResponse.value.data.value ?? [];
    return members.filter(member => member.category.includes('OB'));
  });

  return {
    players: players,
    staff: staff,
    oldBoys: oldBoys,
  }
}
