/**
 * Utility Types
 */

// カラー
export type Color = 'white' | 'darkblue' | 'navy' | 'orange' | 'lightgray';

// テーブル
export interface TableBody {
  key  : string;
  value: string | number;
}

export interface Table {
  title?: String;
  body  : TableBody[];
}
