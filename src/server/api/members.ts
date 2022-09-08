import type { IncomingMessage, ServerResponse } from "http";

import { Member, Params } from "@/types/members";
import { SheetRepository } from "../Repository/SheetRepository";
import { sendErrorResponse, successResponse } from "../global";

/**
 * メンバー情報取得
 *
 * @param event イベント
 */
export default defineEventHandler(async (event) => {
  const { res, req }: { res: ServerResponse, req: IncomingMessage } = event;
  const method = useMethod(event).toUpperCase();
  const url = req.url;

  if (method != 'GET') {
    console.log(`##### Error ##### ${method}メソッドで呼び出されました。${url} はGETメソッドのみ許可しています。`);
    sendErrorResponse(res, 400, 'bad method, only GET method');
  }

  // クエリパラメータ取得
  const params: Params = useQuery(event);

  // リポジトリをインスタンス化してメンバーズを取得
  const instance = await SheetRepository.instance();
  let members: Member[] = [];
  await instance.getMembers(params).then(res => members = res);

  successResponse(res, members);
})
