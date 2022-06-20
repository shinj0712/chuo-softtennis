/**
 * このファイルはサイト内で使用する定数をまとめたファイルです
 */

// interface定義
interface HomeMenuPanel {
  img     : string;
  alt     : string;
  title   : string;
  leadText: string;
}

const homeMenuPanels: HomeMenuPanel[] = [
  {
    title: 'Teams',
    img: 'group01_2017.jpg',
    alt: '中央大学ソフトテニス部集合写真',
    leadText: '中央大学では、20名前後の選手が在籍し、全国各地から個性的な選手が集まっています。',
  },
  {
    title: 'Hakumonkai',
    img: 'hakumon01.jpg',
    alt: '中央大学多摩キャンパス白門',
    leadText: '本大学を卒業した先輩達で構成されるOBの組織を「白門会」と名付けています。',
  },
  {
    title: 'Result',
    img: 'awards02_2017.jpg',
    alt: '2018年春季リーグ戦集合写真',
    leadText: '中央大学の選手情報や大会速報はTwitterやInstagram等のSNSで発信しています。',
  },
  {
    img: 'activity.jpg',
    alt: '中央大学ソフトテニスコート',
    title: 'Activity',
    leadText: '定められた時間の中で100%の集中を求め、選手が主体となる体制を構築しています。',
  },
  {
    title: 'Photo',
    img: 'player37.jpg',
    alt: '中央大学ソフトテニス部集合写真',
    leadText: '集合写真やプレー写真から個人写真まで、選手たちの思い出を是非覗いてみてください。',
  },
];


// コンポーネントで使用するため
export const useConst = () => {
  return {
    homeMenuPanels,
  };
}
