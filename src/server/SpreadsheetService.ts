import { GoogleSpreadsheet } from "google-spreadsheet";
import type {
  GoogleSpreadsheetWorksheet as GoogleSpreadsheetWorksheetType,
  GoogleSpreadsheet as GoogleSpreadsheetType,
  GoogleSpreadsheetRow as GoogleSpreadsheetRowType,
} from "google-spreadsheet";

/**
 * GoogleスプレッドシートAPIの基底クラス
 * リポジトリ（ @/server/Repository/SheetRepository.ts ）を仲介してアプリケーションに公開されます
 *
 * Document：（https://theoephraim.github.io/node-google-spreadsheet/#/）
 */
interface SpreadsheetServiceInterface {
  doc: GoogleSpreadsheetType;
  initialize(): Promise<void>;
  getSheets(sheetIndex: number): GoogleSpreadsheetWorksheetType;
  getRows(sheets: GoogleSpreadsheetWorksheetType): Promise<GoogleSpreadsheetRowType[]>;
}

export class SpreadsheetService implements SpreadsheetServiceInterface {
  doc: GoogleSpreadsheetType;

  /**
   * クラス初期化
   * async/await が使用できないので initialize関数 で完全に初期化を完了させる
   *
   * @param {string} SHEETS_ID    シートID
   * @param {string} PRIVATE_KEY  プライベートキー
   * @param {string} CLIENT_EMAIL クライアントメールアドレス
   */
  constructor(
    private SHEETS_ID   : string,
    private PRIVATE_KEY : string,
    private CLIENT_EMAIL: string
  ) {
    this.doc = new GoogleSpreadsheet(this.SHEETS_ID);
  }

  /**
   * コンストラクタで初期化できないデータを初期化します。
   *
   * @param {number} sheetIndex シートのインデックス番号
   * @return {Promise<void>}
   */
  public async initialize(): Promise<void>
  {
    try {
      // login
      await this.doc.useServiceAccountAuth({
        client_email: this.CLIENT_EMAIL,
        private_key: this.PRIVATE_KEY,
      });
      // load
      await this.doc.loadInfo();
      console.log('##### 初期化成功 #####  ワークシートを取得しました');
    } catch (error) {
      console.error('###  初期化 失敗  ###  => ', error);
    }
  }

  /**
   * ワークシートオブジェクトからシートを返します
   *
   * @param {Number} sheetIndex シートID
   * @return {GoogleSpreadsheetWorksheetType} シートオブジェクト
   */
  public getSheets(sheetIndex: number): GoogleSpreadsheetWorksheetType
  {
    return this.doc.sheetsByIndex[sheetIndex];
  }

  /**
   * シートの行を取得します
   *
   * @return {Promise<GoogleSpreadsheetRowType[]>}
   */
  public async getRows(sheets: GoogleSpreadsheetWorksheetType): Promise<GoogleSpreadsheetRowType[]>
  {
    return (sheets) ? await sheets.getRows() : [];
  }
}
