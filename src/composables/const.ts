/**
 * このファイルはサイト内で使用する定数をまとめたファイルです
 */

// インターフェイス定義
interface Image {
  src: {
    lg?: string;
    md?: string;
    sm?: string;
    default: string;
  };
  alt: string;
}
interface HomeMenuPanel {
  img     : string;
  alt     : string;
  title   : string;
  leadText: string;
}
interface Concept {
  id: number;
  title: {
    ja: string;
    en: string;
  },
  keyword: string;
  text: string;
}
interface TableBody {
  key: string;
  value: string;
}
interface Table {
  title?: string;
  body: TableBody[];
}

// データ定義
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

const practiceTable: Table = {
  title: '練習環境',
  body: [
    { key: "練習時間", value: "9:00 ~ 12:00（全体練習）"},
    { key: "活動期間", value: "2月 - 8月、9月 - 12月" },
    { key: "オフ",    value: "毎週月曜日・各大会後" },
    { key: "練習場所", value: "〒192-0393\n東京都八王子市東中野742-1\n中央大学多摩キャンパス第二体育館ソフトテニスコート" }
  ],
}

const courtImages: Image[] = [
  {
    src: { default: 'court05.jpg' },
    alt: '多摩キャンパスソフトテニスコート（第二体育館）',
  },
  {
    src: { default: 'court03.jpg' },
    alt: '多摩キャンパスソフトテニスコート（1,2,3）',
  },
  {
    src: { default: 'court04.jpg' },
    alt: '多摩キャンパスソフトテニスコート（4,5,6）',
  },
]

const scheduleTable: Table = {
  title: '年間スケジュール',
  body: [
    { key: "1月",  value: "オフ" },
    { key: "2月",  value: "オフ / 練習開始" },
    { key: "3月",  value: "春合宿" },
    { key: "4月",  value: "東都リーグ（春）" },
    { key: "5月",  value: "関東リーグ（春）" },
    { key: "6月",  value: "定期戦（立命館大学）" },
    { key: "7月",  value: "東日本インカレ" },
    { key: "8月",  value: "インカレ" },
    { key: "9月",  value: "東都リーグ（秋）" },
    { key: "10月", value: "関東リーグ（秋）" },
    { key: "11月", value: "大学対抗" },
    { key: "12月", value: "オフ / 納会"}
  ]
}

// swiperオプションは型定義しない（ライブラリ先で型定義されているため）
const swiperPagination = {
  clickable: true,
}

const swiperScrollBar = {
  draggable: true,
}

const swiperBreakpoints = {
  courtImages: {
    700: { slidesPerView: 2, spaceBetween: 20 },
  },
}

// コンポーネントで使用するため
export const useConst = () => {
  return {
    homeMenuPanels,
    concepts,
    practiceTable,
    courtImages,
    swiperPagination,
    swiperScrollBar,
    swiperBreakpoints,
    scheduleTable,
  };
}
