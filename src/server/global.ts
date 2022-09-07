import type { ServerResponse } from "http";

/**
 * 成功のHttpレスポンスを返します。
 *
 * @param {ServerResponse} res レスポンス
 * @param {Any} data レスポンスボディに含めるデータ
 */
export const successResponse = (res: ServerResponse, data: any) => {
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
export const sendErrorResponse = (res: ServerResponse, code: number, message: string) => {
  res.statusCode = code;
  res.statusMessage = message;
  res.end();
}
