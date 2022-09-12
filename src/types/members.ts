/**
 * members API interface & types
 */

// ポジション
export interface Position {
  id      : number;
  name_ja : string;
  name_en : string;
  color   : string;
}

// カテゴリー
export interface Category {
  all    : null;
  players: string;
  staff  : string;
  ob     : string;
  none   : string;
}

// パラメータ
export interface Params {
  category?: 'all' | 'players' | 'staff' | 'ob' | 'none';
  grade   ?: null | 1 | 2 | 3 | 4;
}

// メンバーデータ
export interface Member {
  id             : number;
  name_ja        : string;
  name_en        : string;
  name_kana      : string;
  grade          : number | null;
  graduation_year: number | null;
  category       : string[];
  tags           : string[];
  position       : Position | null;
  from           : string | null;
  alma_mater     : string | null;
  affiliation    : string | null;
  archive        : string | null;
  img: {
    src: string;
    alt: string;
  }
}
