import type { IncomingMessage, ServerResponse } from "http";

import { Members } from "@/types/interface";
import { SheetRepository } from "../Repository/SheetRepository";

interface Params {
  grade?: null | 1 | 2 | 3 | 4;
}

/**
 * 部員取得
 * TODO：パラメータによる並び替えを行えるようにする
 *
 * @param event イベント
 */
export default defineEventHandler(async (event) => {
  const { res, req }: { res: ServerResponse, req: IncomingMessage } = event;
  const { grade = null }: Params = useQuery(event);
  const method = useMethod(event).toUpperCase();
  const url = req.url;

  if (method != 'GET') {
    console.log(`##### Error ##### ${method}メソッドで呼び出されました。${url} はGETメソッドのみ許可しています。`);
    sendErrorResponse(res, 400, 'bad method, only GET method');
  }

  // リポジトリをインスタンス化してメンバーズを取得
  const instance = await SheetRepository.instance();
  let members: Members[] = [];
  await instance.getMembers('players').then(res => members = res);

  // 絞り込み
  if (grade) {
    members = members.filter((e: Members, i: number): boolean => {
      console.log(typeof grade);
      console.log(grade);
      console.log(typeof e.grade);
      console.log(e.grade);
      return e.grade === grade;
    });
  }

  successResponse(res, members);
})

/**
 * 成功のHttpレスポンスを返します。
 *
 * @param {ServerResponse} res レスポンス
 * @param {Any} data レスポンスボディに含めるデータ
 */
const successResponse = (res: ServerResponse, data: any) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

/**
 * Httpエラーレスポンスを返します。
 *
 * @param {ServerResponse} res レスポンス
 * @param {number} code ステータスコード
 * @param {string} message ステータスメッセージ
 * @return {void}
 */
const sendErrorResponse = (res: ServerResponse, code: number, message: string) => {
  res.statusCode = code;
  res.statusMessage = message;
  res.end();
}
