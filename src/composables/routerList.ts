/**
 * 並び替え後のルーターリストを返します。
 * ルートの並び替えを変更したい場合は constants.routeNameConvertList を修正してください。
 */
export const useRouteList = () => {
  const { constants } = useJson();
  const app = useNuxtApp();
  const routeListConst = constants.routeNameConvertList;
  const list = app.$router.options.routes;
  list.sort((first: any, second: any) => routeListConst.findIndex(e => e.name === first.name) > routeListConst.findIndex(e => e.name === second.name) ? 1 : -1);
  return list;
}
