import api from './commonURL.js';
import AjaxPlugin from '@/utils/request'
import qs from 'qs'

//首页列表数据
export function loginByUsername(params) {
	return AjaxPlugin.$http.post(
		api.index.lists ,qs.stringify(params)
	);
}
//首页列表数据
export function newlist(params) {
  return AjaxPlugin.$http.post(
    api.lists.newLists, qs.stringify(params)
  );
}
//项目推进列表
export function persentProject(params) {
  return AjaxPlugin.$http.post(
    api.persent.persentProject, qs.stringify(params)
  );
}
//监测点列表
export function monitorAllData(params) {
  return AjaxPlugin.$http.post(
    api.minitorList.monitorAllData, qs.stringify(params)
  );
}
//监测点详细信息--实时数据
export function siteInfo(params) {
  return AjaxPlugin.$http.post(
    api.siteInfo.siteInfo, qs.stringify(params)
  );
}
//监测点详细信息--历史数据
export function historyInfo(params) {
  return AjaxPlugin.$http.post(
    api.historyInfo.historyInfo, qs.stringify(params)
  );
}
//监测点详细信息--历史图形数据因子
export function selectInfo(params) {
  return AjaxPlugin.$http.post(
    api.selectInfo.selectInfo, qs.stringify(params)
  );
}
//监测点详细信息--历史图形数据
export function chartInfo(params) {
  return AjaxPlugin.$http.post(
    api.chartInfo.chartInfo, qs.stringify(params)
  );
}
//监测点维护--维护排行
export function getAlarmSiteList(params) {
  return AjaxPlugin.$http.post(
    api.getAlarmSiteList.getAlarmSiteList, qs.stringify(params)
  );
}
//监测点维护--维护排行详情
export function getAlarmOrderBySiteNo(params) {
  return AjaxPlugin.$http.post(
    api.getAlarmOrderBySiteNo.getAlarmOrderBySiteNo, qs.stringify(params)
  );
}
//监测点维护--站点维护记录
export function listMaintainBySiteNo(params) {
  return AjaxPlugin.$http.post(
    api.listMaintainBySiteNo.listMaintainBySiteNo, qs.stringify(params)
  );
}
//监测点维护--站点维护记录详情
export function getConfiurationTree(params) {
  return AjaxPlugin.$http.post(
    api.getConfiurationTree.getConfiurationTree, qs.stringify(params)
  );
}
//监测点维护--站点巡查记录
export function routingMessageList(params) {
  return AjaxPlugin.$http.post(
    api.routingMessageList.routingMessageList, qs.stringify(params)
  );
}
//监测点维护--站点巡查详情
export function routingApproveList(params) {
  return AjaxPlugin.$http.post(
    api.routingApproveList.routingApproveList, qs.stringify(params)
  );
}
//监测点维护--维护任务
export function dispatchManageListWeiXin(params) {
  return AjaxPlugin.$http.post(
    api.dispatchManageListWeiXin.dispatchManageListWeiXin, qs.stringify(params)
  );
}
// //监测点维护--站点巡查记录
// export function routingMessageList(params) {
//   return AjaxPlugin.$http.post(
//     api.routingMessageList.routingMessageList, qs.stringify(params)
//   );
// }
// //监测点维护--站点巡查记录
// export function routingMessageList(params) {
//   return AjaxPlugin.$http.post(
//     api.routingMessageList.routingMessageList, qs.stringify(params)
//   );
// }




