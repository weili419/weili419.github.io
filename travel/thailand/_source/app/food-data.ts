export type Venue = { name: string; area: string; dish: string; price: string; tip: string; query?: string; refs: string[] };
export type Option = { name:string; dish:string; price:string; tip:string };
export type Meal = { name:string; note?:string; options:Option[] };
export type FoodDay = { date:string; city:string; route:string; note:string; meals:Meal[] };

// 实际到访的餐厅由 trip.json 作为地图节点维护；不再保留未吃过的候选餐厅库。
export const foodSources:Record<string,{label:string;url:string}>={};
export const venues:Record<string,Venue>={};

export const foodDays:FoodDay[]=[
 {
  date:'21',
  city:'芭东实际用餐',
  route:"班赞海鲜市场 → 川香居 → Let's Relax → 芭东海滩",
  note:'实际经历：班赞市场海鲜可以砍价；川香居按 ฿200／公斤加工，麻辣口味，比市场二楼便宜。晚上吃打抛饭。',
  meals:[
   {name:'海鲜午餐',options:[{name:'班赞海鲜市场＋川香居加工',dish:'市场砍价买海鲜，川香居麻辣加工',price:'加工费 ฿200／公斤',tip:'本次实际吃法；加工费比海鲜市场二楼便宜。'}]},
   {name:'晚餐',options:[{name:'芭东打抛饭',dish:'打抛饭',price:'按实际消费',tip:'本次实际晚餐；之后去 Patong Beach 拍照、看秀。'}]},
  ],
 },
 {
  date:'22',
  city:'出海当天',
  route:'酒店对面旅行社 → 皇帝岛水肺 → 珊瑚岛浮潜 → 酒店／酒吧',
  note:'实际购买三人 ฿10,000 的皇帝岛水肺与珊瑚岛浮潜行程；回酒店后吃东西，再去酒吧小坐。',
  meals:[
   {name:'回程后',options:[{name:'回酒店后吃东西',dish:'未记录具体店名和菜品',price:'按实际消费',tip:'吃完后去酒吧坐了一会儿。'}]},
  ],
 },
 {
  date:'23',
  city:'卡伦实际用餐',
  route:'酒店休息／游泳 → The Pad Thai Shop → 琳的厨房 → Karon Beach',
  note:'实际体验：The Pad Thai Shop 非常推荐；琳的厨房一般。吃饭后在 Karon Beach 闲逛，再回酒店。',
  meals:[
   {name:'推荐',options:[{name:'The Pad Thai Shop',dish:'Pad Thai',price:'按实际消费',tip:'本次实际用餐，非常推荐。'}]},
   {name:'另一餐',options:[{name:'琳的厨房',dish:'按当天实际点餐',price:'按实际消费',tip:'本次实际体验，评价一般。'}]},
  ],
 },
];
