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

interface Concept {
  id: number;
  title: {
    ja: string;
    en: string;
  },
  keyword: string;
  text: string;
}
const concepts: Concept[] = [
  {
    id: 1,
    title: { ja: '目標', en: 'target' },
    keyword: 'インカレ優勝',
    text: '我々の目標は、全日本大学対抗戦優勝、すなわちインカレ制覇を目標としています。過去には、インカレ制覇を8回経験していますが、完全制覇を経験した年は未だありません。近年は各大学の実力が拮抗しており、タイトル競争が非常に激しい時代になっています。中央大学を日本一の大学にするべく、チーム一丸となりインカレ制覇に向かって努力しています。',
  },
  {
    id: 2,
    title: { ja: '目的', en: 'mission' },
    keyword: 'ソフトテニスを通じた人間育成',
    text: '部活動としての活動意義は、人間育成にあると考えています。我々の大学では、練習でも生活でも自主性や自律を重んじています。大学生活を通してこれらを学んでいき、社会人として幅広く活躍できる人間を輩出したいと考えています。',
  },
  {
    id: 3,
    title: { ja: '行動', en: 'Action' },
    keyword: 'メリハリのある行動',
    text: '中央大学ソフトテニス部の行動指針として「メリハリのある行動」を常に意識しています。寮生活でチームメンバーと共同生活しているということもあり、メリハリがつきにくい環境ではありますが、目標達成のために部活とプライベートを区別し取り組むことをチーム一丸となって意識しています。',
  },
]

interface TableBody {
  key: string;
  value: string;
}
interface PracticeTable {
  title?: String;
  body: TableBody[];
}
const practiceTable: PracticeTable = {
  title: '練習環境',
  body: [
    { key: "練習時間", value: "9:00 ~ 12:00（全体練習）"},
    { key: "活動期間", value: "2月 - 8月、9月 - 12月" },
    { key: "オフ",    value: "毎週月曜日・各大会後" },
    { key: "練習場所", value: "〒192-0393\n東京都八王子市東中野742-1\n中央大学多摩キャンパス第二体育館ソフトテニスコート" }
  ],
}


// コンポーネントで使用するため
export const useConst = () => {
  return {
    homeMenuPanels,
    concepts,
    practiceTable,
  };
}
