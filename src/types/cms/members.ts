/**
 * micro cms members api
 */

export interface MicroCmsPosition {
  color: string[];
  createdAt: string;
  id: string;
  name_en: string;
  name_ja: string;
  publishedAt: string;
  revisedAt: string;
  updatedAt: string;
}

export interface MicroCmsMember {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  affiliation?: string;
  alma_mater?: string;
  archive?: string;
  category: string[];
  first_name_en: string;
  first_name_ja: string;
  first_name_kana: string;
  last_name_en: string;
  last_name_ja: string;
  last_name_kana: string;
  from?: string;
  grade?: null | 1 | 2 | 3 | 4;
  graduation_year?: number;
  tags: string[];
  position?: null | MicroCmsPosition;
}

// ポジション
export interface Response {
  contents: MicroCmsMember[];
  limit: Number;
  offset: Number;
  totalCount: number;
}
