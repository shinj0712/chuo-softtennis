import { SpreadsheetService } from "../SpreadsheetService";
import type {
  GoogleSpreadsheetWorksheet as GoogleSpreadsheetWorksheetType,
  GoogleSpreadsheet as GoogleSpreadsheetType,
  GoogleSpreadsheetRow as GoogleSpreadsheetRowType,
} from "google-spreadsheet";

// 型情報
import { Position, Members, Category } from "@/types/interface";

// 環境変数と認証情報
import { private_key, client_email } from "@/credential/service_account.json";
const env: any = useRuntimeConfig();

/**
 * スプレッドシートのリポジトリ
 * API側でロジックを意識せず使用できるよう取得処理はこのクラスに閉じ込める
 *
 * 参考：（https://marsquai.com/745ca65e-e38b-4a8e-8d59-55421be50f7e/1f67fdab-8e00-4ae1-a1b9-077d5a30a5d6/d7b3a1f5-5d97-486c-a8b6-4fc7fe2663f1/）
 */
interface SheetRepositoryInterface {
  readonly membersIndex: number;
  readonly positionsIndex: number;
  getMembers(): Promise<Members[]>;
  getPositions(): Promise<Position[]>
}

export class SheetRepository extends SpreadsheetService implements SheetRepositoryInterface {
  readonly membersIndex: number = 0;
  readonly positionsIndex: number = 1;

  protected readonly category: Category = {
    all    : '',
    players: '部員',
    staff  : 'スタッフ',
    ob     : 'OB',
  }

  private constructor() {
    super(env.GoogleSheetsId, private_key, client_email);
  }

  /**
   * クラス初期化処理
   * 当該メソッドでしかインスタンス化できない
   *
   * @return {Promise<SheetRepository>}
   */
  static async instance(): Promise<SheetRepository>
  {
    const instance = new SheetRepository();
    await instance.initialize();
    return instance;
  }

  /**
   * メンバーズシートを取得します
   *
   * @return {Promise<Members[]>} メンバー配列
   */
  public async getMembers(category: keyof Category = 'all'): Promise<Members[]>
  {
    const sheetName: string = 'メンバーズシート';
    const spreadsheet: GoogleSpreadsheetWorksheetType = super.getSheets(this.membersIndex);
    let sheetRows: GoogleSpreadsheetRowType[] = [];
    await super.getRows(spreadsheet)
      .then(rows => sheetRows = rows)
      .catch(e => {
        console.error(`##### ${sheetName}の全行データ取得に失敗しました #####  ----- >`, e);
        return [];
      });

    if (sheetRows.length === 0) {
      console.error(`##### ${sheetName}が空で取得されました #####`);
      return [];
    };

    // ポジションズシートを取得しておく
    let positionsSheets: Position[] = [];
    await this.getPositions().then(positions => positionsSheets = positions);

    if (positionsSheets.length === 0) {
      return [];
    }

    return sheetRows.map((row: GoogleSpreadsheetRowType, index: number): Members => {
      return {
        id              : row.id as number,
        name_ja         : `${row.last_name_ja} ${row.first_name_ja}`,
        name_en         : `${row.last_name_en} ${row.first_name_en}`,
        name_kana       : `${row.last_name_kana} ${row.first_name_kana}`,
        grade           : (row.grade) ? row.grade as number : null,
        graduation_year : (row.graduation_year) ? row.graduation_year as number : null,
        category        : (row.category) ? row.category.split(',') : [],
        tags            : (row.tags) ? row.tags.split(',') : [],
        position        : (row.position_id) ? positionsSheets[row.position_id - 1] : null,
        from            : (row.from) ? row.from : null,
        alma_mater      : (row.alma_mater) ? row.alma_mater : null,
        affiliation     : (row.affiliation) ? row.affiliation : null,
        archive         : (row.archive) ? row.archive : null,
        img : {
          src: `${row.last_name_en}_${row.first_name_en}.jpg`,
          alt: `${row.last_name_ja} ${row.first_name_ja}の写真`
        }
      }
    }).filter((e: Members, i: number): boolean => {
      return (category !== 'all') ? (i !== 0) && e.category.includes(this.category[category]) : i !== 0;
    });
  }

  /**
   * ポジションズシートを取得します
   *
   * @return {Promise<Position[]>} ポジション配列
   */
  public async getPositions(): Promise<Position[]>
  {
    const sheetName: string = 'ポジションズシート';
    const spreadsheet: GoogleSpreadsheetWorksheetType = super.getSheets(this.positionsIndex);
    let sheetRows: GoogleSpreadsheetRowType[] = [];
    await super.getRows(spreadsheet)
      .then(rows => sheetRows = rows)
      .catch(e => {
        console.error(`##### ${sheetName}の全行データ取得に失敗しました #####  ----- >`, e);
        return [];
      });

    if (sheetRows.length === 0) {
      console.error(`##### ${sheetName}が空で取得されました #####`);
      return [];
    };

    return sheetRows.map(row => {
      return {
        id      : row.id as number,
        name_ja : row.name_ja,
        name_en : row.name_en,
        color   : (row.color) ? row.color : null
      }
    }).filter((e, i) => i !== 0);
  }
}