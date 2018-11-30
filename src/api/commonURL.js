let domain = "http://192.168.30.99:8000";
let api = {
  index: {
    lists: "/api/trailingContentControlle/getContenList", //列表信息
    weather: "http://wthrcdn.etouch.cn/weather_mini?city=苏州" //天气
  },
  lists: {
    newLists: '/api/trailingContentControlle/getDetailInfo' //数据页展示
  },
  persent: {
    'persentProject': '/api/XiNing/GetProjectListInfo.do' //项目进度查询
  },
  minitorList:{
    monitorAllData:'/api/monitorAllData'  //监测点列表 
  },
  siteInfo:{
    siteInfo:'/api/showSiteInfoWeiXin'  //监测点详细信息--实时数据
  },
  historyInfo:{
    historyInfo:'/api/Online/getHistoryDataWeiXin'  //监测点详细信息--历史列表数据
  },
  selectInfo:{
    selectInfo:'/api/history/getSiteFileds'  //监测点详细信息--历史图形数据因子
  },
  chartInfo:{
    chartInfo:'/api/history/getComparisonGraphDataWenxin'  //监测点详细信息--历史图形数据
  },
  getAlarmSiteList:{
    getAlarmSiteList:'/api/backstage/getAlarmSiteList'  //监测点维护--维护排行
  },
  getAlarmOrderBySiteNo:{
    getAlarmOrderBySiteNo:'/api/backstage/getAlarmOrderBySiteNo'  //监测点维护--维护排行详情
  },
  listMaintainBySiteNo:{
    listMaintainBySiteNo:'/api/backstageMaintain/listMaintainBySiteNo'  //监测点维护--站点维护记录
  },
  getConfiurationTree:{
    getConfiurationTree:'/api/config/getConfiurationTree'  //监测点维护--站点维护记录详情
  },
  routingMessageList:{
    routingMessageList:'/api/backstageMaintain/routingMessageList'  //监测点维护--站点巡查记录
  },
  routingApproveList:{
    routingApproveList:'/api/backstageMaintain/routingApproveList'  //监测点维护--站点巡查详情
  },
  dispatchManageListWeiXin:{
    dispatchManageListWeiXin:'/api/backstageMaintain/dispatchManageListWeiXin'  //监测点维护--维护任务
  },
  // getConfiurationTree:{
  //   getConfiurationTree:'/api/config/getConfiurationTree'  //监测点维护--站点维护记录详情
  // }
}

export default api;
