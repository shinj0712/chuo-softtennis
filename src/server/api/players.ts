import type { IncomingMessage, ServerResponse } from "http";

import { Member, MembersParams } from "@/types/interface";
import { SheetRepository } from "../Repository/SheetRepository";
import { sendErrorResponse, successResponse } from "../global";

/**
 * 部員取得
 * TODO：パラメータによる並び替えを行えるようにする
 *
 * @param event イベント
 */
export default defineEventHandler(async (event) => {
  const { res, req }: { res: ServerResponse, req: IncomingMessage } = event;
  const { grade = null }: MembersParams = useQuery(event);
  const method = useMethod(event).toUpperCase();
  const url = req.url;

  if (method != 'GET') {
    console.log(`##### Error ##### ${method}メソッドで呼び出されました。${url} はGETメソッドのみ許可しています。`);
    sendErrorResponse(res, 400, 'bad method, only GET method');
  }

  // リポジトリをインスタンス化してメンバーズを取得
  const instance = await SheetRepository.instance();
  let members: Member[] = [];
  await instance.getMembers('players').then(res => members = res);

  // 絞り込み
  if (grade) {
    members = members.filter((e: Member, i: number): boolean => {
      return e.grade === grade;
    });
  }

  successResponse(res, members);
})
