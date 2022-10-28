
import { Member, Position } from "@/types/members";
import { Response, MicroCmsMember, MicroCmsPosition } from "@/types/cms/members";

/**
 * APIレスポンスをアプリ用データ構造に変換します
 *
 * @param res members api response > contents
 */
const convertedMembers = (res: MicroCmsMember[]): Member[] => {
  return (res.length === 0) ? [] : res.map((res: MicroCmsMember, index: number) => {
    // ここで変換する
    return {
      id             : index + 1,
      name_ja        : `${res.first_name_ja} ${res.last_name_ja}`,
      name_en        : `${res.first_name_en} ${res.last_name_en}`,
      name_kana      : `${res.first_name_kana} ${res.last_name_kana}`,
      grade          : res.grade || null,
      graduation_year: res.graduation_year || null,
      category       : res.category,
      tags           : res.tags,
      position       : convertPosition(res.position || null),
      from           : res.from || null,
      alma_mater     : res.alma_mater || null,
      affiliation    : res.affiliation || null,
      archive        : res.archive || null,
      img: {
        src: `${res.first_name_en}_${res.last_name_en}.jpg`,
        alt: `${res.first_name_ja} ${res.last_name_ja}の写真`
      }
    }
  })
}

/**
 * APIレスポンスをアプリ用に変換します
 *
 * @param res APIレスポンス ポジションプロパティ
 */
const convertPosition = (res: MicroCmsPosition | null): Position | null => {
  return (res === null) ? null : {
    name_ja: res.name_ja,
    name_en: res.name_en,
    color: (res.color.length) ? res.color[0] : '',
  }
}

// 選手取得
export const usePlayers = () => {
  // 環境変数 取得
  const runtimeConfig = useRuntimeConfig();
  const API_KEY = runtimeConfig.microCmsApiKey;
  const API_BASE_URL = runtimeConfig.microCmsBaseUrl;

  const { data: players, pending } = useFetch<Response>('members', {
    baseURL: API_BASE_URL,
    headers: { 'X-MICROCMS-API-KEY': API_KEY },
    params: {
      limit: 100,
      filters: 'category[contains]部員',
      orders: '-grade'
    }
  });

  const playersRef = computed<Member[]>(() => {
    return (pending.value) ? [] : convertedMembers(players.value.contents);
  });

  return playersRef;
}

// スタッフ絞り込み
export const useStaff = () => {
  // 環境変数 取得
  const runtimeConfig = useRuntimeConfig();
  const API_KEY = runtimeConfig.microCmsApiKey;
  const API_BASE_URL = runtimeConfig.microCmsBaseUrl;

  const { data: staff, pending } = useFetch<Response>('members', {
    baseURL: API_BASE_URL,
    headers: { 'X-MICROCMS-API-KEY': API_KEY },
    params: {
      limit: 100,
      filters: 'category[contains]スタッフ',
    }
  });

  const staffRef = computed<Member[]>(() => {
    return (pending.value) ? [] : convertedMembers(staff.value.contents);
  });

  return staffRef;
}

// OB絞り込み
export const useOldBoys = () => {
  // 環境変数 取得
  const runtimeConfig = useRuntimeConfig();
  const API_KEY = runtimeConfig.microCmsApiKey;
  const API_BASE_URL = runtimeConfig.microCmsBaseUrl;

  const { data: oldBoys, pending } =  useFetch<Response>('members', {
    baseURL: API_BASE_URL,
    headers: { 'X-MICROCMS-API-KEY': API_KEY },
    params: {
      limit: 100,
      filters: 'category[contains]OB',
    }
  });

  const oldBoysRef = computed<Member[]>(() => {
    return (pending.value) ? [] : convertedMembers(oldBoys.value.contents);
  });

  return oldBoysRef;
}
