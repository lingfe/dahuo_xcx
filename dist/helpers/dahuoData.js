export default {
  throwInTheCityData: [{        //投放城市数据   
    name: "华东地区",
    index: 0,
    content: [{
      name: "山东",
      checked: false,
    }, {
      name: "江苏",
      checked: false,
    }, {
      name: "安徽",
      checked: false,
    }, {
      name: "浙江",
      checked: false,
    }, {
      name: "福建",
      checked: false,
    }, {
      name: "上海",
      checked: false,
    }]

  }, {
    name: '华南地区',
    index: 1,
    content: [{
      name: "广东",
      checked: false,
    }, {
      name: "广西",
      checked: false,
    }, {
      name: '海南',
      checked: false,
    }]
  }, {
    name: "华中地区",
    index: 2,
    content: [{
      name: "湖北",
      checked: false,
    }, {
      name: "湖南",
      checked: false
    }, {
      name: "河南",
      checked: false
    }, {
      name: "江西",
      checked: false
    }]
  }, {
    name: '华北地区',
    index: 3,
    content: [{
      name: "北京",
      checked: false,
    }, {
      name: "天津",
      checked: false
    }, {
      name: "河北",
      checked: false
    }, {
      name: "山西",
      checked: false
    }, {
      name: "内蒙古",
      checked: false
    }]
  }, {
    name: "西北地区",
    index: 4,
    content: [{
      name: "宁夏",
      checked: false
    }, {
      name: "新疆",
      checked: false
    }, {
      name: "青海",
      checked: false
    }, {
      name: "陕西",
      checked: false
    }, {
      name: "甘肃",
      checked: false
    }]
  }, {
    name: "西南地区",
    index: 5,
    content: [{
      name: "四川",
      checked: false
    }, {
      name: "云南",
      checked: false
    }, {
      name: "贵州",
      checked: false
    }, {
      name: "西藏",
      checked: false
    }, {
      name: "重庆",
      checked: false
    }]
  }, {
    name: "东北地区",
    index: 6,
    content: [{
      name: "辽宁",
      checked: false
    }, {
      name: "吉林",
      checked: false
    }, {
      name: "黑龙江",
      checked: false,
    }]
  }, {
    name: "台港澳地区",
    index: 7,
    content: [{
      name: "台湾",
      checked: false,
    }, {
      name: "香港",
      checked: false
    }, {
      name: "澳门",
      checked: false
    }]
  }],                 
  sxData: [{          //筛选数据
    name: "金额",
    content: [{
      minThreshold: '全部',
      maxThreshold: null,
      value: '0',
      checked: true,
    }, {
      minThreshold: 0,
      maxThreshold: 1,
      value: '1',
      checked: false,
    }, {
      minThreshold: 1,
      maxThreshold: 5,
      value: '2',
      checked: false,
    }, {
      minThreshold: 5,
      maxThreshold: 50,
      value: '3',
      checked: false,
    }, {
      minThreshold: 50,
      maxThreshold: null,
      value: '4',
      checked: false,
    }],
  },
  {
    name: "类型",
    content: [{
      name: '全部',
      value: '0',
      checked: false,
    }, {
      name: '合伙创业',
      value: '1001',
      checked: false,
    }, {
      name: '干股纳才 ',
      value: '1002',
      checked: false,
    }, {
      name: '加盟代理',
      value: '1003',
      checked: false,
    }, {
      name: '股权交易',
      value: '1004',
      checked: false,
    }, {
      name: '生意转让',
      value: '1005',
      checked: false,
      notype: '非搭伙类型',
    }, {
      name: '金融理财',
      value: '1006',
      checked: false,
      notype: '非搭伙类型',
    }, {
      name: '房产投资',
      value: '1007',
      checked: false,
      notype: '非搭伙类型',
    }, {
      name: '其他',
      value: '1008',
      checked: false,
      notype: '非搭伙类型',
    }],
  },
  {
    name: "行业",
    content: [{
      name: '全部',
      value: '0',
      checked: false,
    }, {
      name: '餐饮',
      value: '1',
      checked: false,
    }, {
      name: '休闲娱乐',
      value: '2001',
      checked: false,
    }, {
      name: '互联网',
      value: '2',
      checked: false,
    }, {
      name: '传媒',
      value: '3',
      checked: false,
    }, {
      name: "教育",
      value: '30001',
      checked: false,
    }, {
      name: '装修',
      value: '4',
      checked: false,
    }, {
      name: "生活服务",
      value: '40001',
      checked: false,
    }, {
      name: "婚庆",
      value: '40002',
      checked: false,
    }, {
      name: '百货',
      value: '5',
      checked: false,
    }, {
      name: '医疗保健',
      value: '6',
      checked: false,
    }, {
      name: "美容美发",
      value: '7',
      checked: false
    }, {
      name: '汽车',
      value: '8',
      checked: false
    }, {
      name: '地产',
      value: '9',
      checked: false
    }, {
      name: '金融',
      value: '10',
      checked: false,
    }, {
      name: '其他',
      value: '11',
      checked: false
    }],
  }]
}