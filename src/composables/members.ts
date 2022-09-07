
import { Member } from "@/types/interface";

/**
 * メンバー情報を取得してストアに格納
 */
export const useMemberStore = () => {
  const members = useState('members', () => {
    return useFetch<Member[]>('api/members', {
      method: 'GET',
    })
  })

  const players = useState('players', () => {
    return useFetch<Member[]>('api/members', {
      method: 'GET',
      params: { category: 'players' },
    })
  })

  const staff = useState('staff', () => {
    return useFetch<Member[]>('api/members', {
      method: 'GET',
      params: { category: 'staff' },
    })
  })

  const oldBoys = useState('oldBoys', () => {
    return useFetch<Member[]>('api/members', {
      method: 'GET',
      params: { category: 'ob' },
    })
  })

  return {
    members: members,
    players: players,
    staff: staff,
    oldBoys: oldBoys,
  }
}
