import type { IncomingMessage, ServerResponse } from "http";

import { Member, Params } from "@/types/members";
import { SheetRepository } from "../Repository/SheetRepository";
import { successResponse } from "../global";

export default defineEventHandler(async event => {
  // イベント引数からリクエストとレスポンスを取得
  const { req, res }: { req: IncomingMessage, res: ServerResponse } = event;

  // APIエンドポイント（URL）を取得してコンソールに通知
  const url = req.url;
  console.log(`##### 【 Notice 】 ##### メンバー情報一覧APIが呼び出されました。[ ENDPOINT => ${url} ]`);

  // クエリパラメータ取得
  const params: Params = useQuery(event);

  // リポジトリをインスタンス化してメンバーズを取得
  const instance = await SheetRepository.instance();
  let members: Member[] = [];
  await instance.getMembers(params).then(res => members = res);

  successResponse(res, members);
})
