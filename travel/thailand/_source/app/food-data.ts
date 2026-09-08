export type Venue = { name: string; area: string; dish: string; price: string; tip: string; query?: string; refs: string[] };
export const foodSources: Record<string, {label:string;url:string}> = {
 xph:{label:'小红书｜普吉三家泰餐体验',url:'https://www.xiaohongshu.com/explore/6a9aac4000000000260308f0'},
 xboat:{label:'小红书｜Ruathong 船面体验',url:'https://www.xiaohongshu.com/explore/6a03391c000000003700fbc0'},
 xdek:{label:'小红书｜Dek Sen 牛杂煲体验',url:'https://www.xiaohongshu.com/explore/69b1024c00000000050304b4'},
 xsea:{label:'小红书｜兰坡市场加工体验',url:'https://www.xiaohongshu.com/explore/6a98012100000000260095d5'},
 xone:{label:'小红书｜One Chun 近期口味反馈',url:'https://www.xiaohongshu.com/explore/6a8ffcde00000000210273fb'},
 dpboat:{label:'大众点评｜曼谷可读榜单',url:'https://plat.dianping.com/app/femember-musteat-web/musteat-rank?cityid=2342&latitude=%2A&longitude=%2A&mina_name=dianping-wxapp&notitlebar=1&ranktype=3&token=%2A'},
 dpbriley:{label:'大众点评｜Briley 历史图片页',url:'https://www.dianping.com/shop/21961199/photos?pg=239'},
 briley:{label:'Phuket 101｜Briley',url:'https://www.phuket101.net/briley-chicken-rice/'},
 no6:{label:'Phuket 101｜No.6 原店',url:'https://www.phuket101.net/no-6-restaurant-patong-beach/'},
 no9:{label:'Phuket 101｜No.9',url:'https://www.phuket101.net/no-9-restaurant-in-patong-beach-phuket/'},
 khrua:{label:'Waze｜Khrua Nong Bio 位置与时间',url:'https://www.waze.com/live-map/directions/th/%E0%B8%88.%E0%B8%A0%E0%B8%B9%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95/tambon-karon/khrua-nong-bio?to=place.ChIJpVu2bYQlUDAREX7nhMVBNSM'},
 red:{label:'Tripadvisor｜Red Chair 店铺资料',url:'https://www.tripadvisor.com/Restaurant_Review-g1210687-d1791984-Reviews-Red_Chair_Restaurant-Kata_Beach_Karon_Phuket.html'},
 kata:{label:'Joey Santini｜卡塔餐饮',url:'https://www.joeysantini.com/kata-beach/'},
 roti:{label:'Phuket 101｜Roti Thaew Nam',url:'https://www.phuket101.net/roti-thaew-nam/'},
 boon:{label:'Boonrat 官方｜分店',url:'https://www.boonratdimsum.com/'},
 chuan:{label:'Apple Maps／米其林｜Chuan Chim',url:'https://maps.apple.com/place?place-id=I3AACF16E366A9F00'},
 mee:{label:'Phuket 101｜Mee Ton Poe',url:'https://www.phuket101.net/mee-ton-poe-hokkien-noodles-phuket/'},
 one:{label:'米其林｜One Chun',url:'https://guide.michelin.com/us/en/phuket-region/phuket/restaurant/one-chun'},
 oldtown:{label:'Phuket 101｜老城餐饮',url:'https://www.phuket101.net/best-thai-restaurants-in-phuket-town/'},
 bangkok:{label:'米其林｜曼谷街头美食路线',url:'https://guide.michelin.com/kr/en/article/travel/2-days-in-bangkok-for-street-food-lovers'},
 jok:{label:'食べログ｜Jok Ruam Jai',url:'https://tabelog.com/thailand/A5601/A560113/56003278/'},
 took:{label:'食记｜Foodland Sukhumvit 16',url:'https://pengu777.com/took-lae-dee/'},
 rung:{label:'Wanderlog｜Rung Rueang 左店',url:'https://wanderlog.com/place/details/6213217/rung-rueang-pork-noodle-left-shop'},
 suda:{label:'Tripadvisor｜Suda 店铺资料',url:'https://www.tripadvisor.ca/Restaurant_Review-g293916-d797986-Reviews-Suda_Restaurant-Bangkok.html'},
 pierb:{label:'Terminal 21 Asok 官方',url:'https://www.terminal21.co.th/asok/'},
 savoey:{label:'Savoey 官方｜分店',url:'https://www.savoey.co.th/th/branches/'},
 sae:{label:'Friday Bangkok｜Sae Phun',url:'https://fridaybangkok.com/v/sae-phun'},
 naiek:{label:'Phuket 101｜Nai Ek',url:'https://www.phuket101.net/nai-ek-roll-noodle/'},
 chinatown:{label:'泰国旅游资料｜唐人街食店地图',url:'https://wisatathailand.id/images/booklet/Yaowarat%20Map_compressed.pdf'},
 ortor:{label:'泰国旅游局｜Or Tor Kor 市场',url:'https://www.thailandtravel.or.jp/or-tor-kor-market/'},
 lay:{label:'米其林｜Lay Lao Ari',url:'https://guide.michelin.com/se/en/bangkok-region/bangkok/restaurant/lay-lao'},
 somtam:{label:'Time Out｜Somtam Nua Siam Square',url:'https://www.timeout.com/bangkok/restaurants/somtam-nua-siam-square'},
 thong:{label:'ThongSmith 官方账号｜分店与菜单',url:'https://linktr.ee/thongsmith'},
 sook:{label:'ICONSIAM 官方｜SOOKSIAM',url:'https://campaign.iconsiam.com/wondrous-dining-zones/cn/sooksiam.html'},
 thip:{label:'ICONSIAM 官方｜餐厅名录（2025）',url:'https://campaign.iconsiam.com/downloads/pdf/ParticipateShopof_travel_tax_deduction2025.pdf'},
 pierp:{label:'Wongnai｜Pier 21 芭提雅',url:'https://www.wongnai.com/restaurants/457484nX-pier21-terminal21-pattaya-terminal21-pattaya'},
 tookp:{label:'Terminal 21 芭提雅官方｜Foodland',url:'https://www.terminal21.co.th/pattaya/foodland/'},
 kiss:{label:'Wongnai｜Kiss Food Naklua',url:'https://www.wongnai.com/restaurants/220092LC-kiss-food-drink-pattaya-%E0%B8%99%E0%B8%B2%E0%B9%80%E0%B8%81%E0%B8%A5%E0%B8%B7%E0%B8%AD'},
 mum:{label:'OpenRice｜Mum Aroi Naklua',url:'https://jp.openrice.com/en/chonburi/r-mum-aroi-pattaya-thai-food-general-seafood-r15959'},
 lan:{label:'DASTA 官方｜兰坡市场',url:'https://smartdastaapp.dasta.or.th/place/16?lang=en'},
 dek:{label:'Restaurant Guru｜Dek Sen 地址与菜品',url:'https://restaurantguru.com/Grandmas-Kitchen-Pattaya'},
 pupen:{label:'春武里地方政府｜餐厅名录',url:'https://nongsuachang.go.th/attachments/2088_files_2027_1.pdf'},
 banana:{label:'Banana Beach 官方｜含午餐浮潜套餐',url:'https://bananabeachkohhey.com/packages/snorkeling'},
 bkkfood:{label:'素万那普机场官方｜餐饮',url:'https://suvarnabhumi.airportthai.co.th/'},
 dmkfood:{label:'廊曼机场官方',url:'https://donmueang.airportthai.co.th/'}
};
const v=(name:string,area:string,dish:string,price:string,tip:string,refs:string[],query?:string):Venue=>({name,area,dish,price,tip,refs,query:query??`${name} ${area} Thailand`});
export const venues: Record<string,Venue> = {
 briley:v('Briley Chicken Rice','普吉 · 芭东 Nanai 路（地址待核实）','鸡饭；也可选猪脚饭','฿80–160','适合早餐、午餐；Google 当前列 17 Nanai Rd，与旧游记 Rat-U-Thit 路地址不同，先确认门店再出发。',['briley','dpbriley'],'Briley Chicken Rice 17 Nanai Road Patong'),
 no6:v('No.6 Restaurant 原店','普吉 · 芭东 Rat-U-Thit 路','泰式炒粉、冬阴功、炒空心菜','฿200–350','原店公开时间 07:00–23:30；排队超过 20 分钟就换备选。',['no6'],'No.6 Restaurant 186 Rat U Thit Patong'),
 no9:v('No.9 Restaurant','普吉 · 芭东北端','泰式家常炒菜＋米饭','฿200–350','靠近海滩北端；从南芭东出发需考虑接驳。',['no9'],'No.9 Restaurant Patong Phuket'),
 khrua:v('Khrua Nong Bio','普吉 · 卡伦 Patak Soi 14','Pad Thai 炒河粉＋泰式炒菜','฿180–300','小红书有正面体验；地图资料列 12:00–22:00，适合卡伦当天。',['xph','khrua'],'Khrua Nong Bio Karon Phuket'),
 red:v('Red Chair Restaurant','普吉 · 卡塔 89 Koktanod 路','玛莎曼鸡肉咖喱、冬阴功','฿200–350','资料列 11:00–21:00；从海边到内街，先看步行路线。',['red'],'Red Chair Restaurant 89 Koktanod Kata'),
 sugar:v('Sugar and Spice','普吉 · 卡塔 98/7 Kata Road','青咖喱鸡＋米饭、泰式炒粉','฿200–350','用于卡塔海边的午晚餐；具体点菜以当天菜单为准。',['kata'],'Sugar and Spice Restaurant and Inn 98/7 Kata Road Phuket'),
 roti:v('Roti Thaew Nam','普吉 · 老街 Thep Krasattri 路','鸡蛋薄饼配咖喱、泰式热茶','฿80–160','早上去，公开资料约 07:00–12:00。',['roti'],'Roti Thaew Nam Phuket Old Town'),
 boon:v('Boonrat Dim Sum 老城店','普吉 · Bangkok Road','普吉式早茶、烧卖和蒸点','฿120–220','官网列老城 Bangkok Road 店；早点前往，出发前确认售完时间。',['boon'],'Boonrat Dim Sum Bangkok Road Phuket'),
 mee:v('Mee Ton Poe 钟楼店','普吉 · 老城钟楼环岛','福建炒面＋蛋；沙爹分着吃','฿100–180','当地泰华饮食代表，安排白天吃。',['mee'],'Mee Ton Poe Clock Tower Phuket'),
 chuan:v('Chuan Chim','普吉 · 老城 Montri 路','蒜椒鱿鱼、海鲜冬阴功配饭','฿250–450','参考午市 11:30–13:30，周日休；现炒可能较慢，周三到店先问等候时间。',['chuan'],'Chuan Chim 37/3 Montri Road Phuket'),
 one:v('One Chun 一纯','普吉 · 老街 Thep Krasattri 路','Mu Hong 炖猪肉、泰南菜','฿300–500','三人分享 3–4 道菜。小红书口味评价有分歧，先少点；10:00–22:00 为公开参考。',['one','xone'],'One Chun Cafe Restaurant Phuket'),
 gobenz:v('Go Benz','普吉 · 老城 Krabi 路','干粥饭 Khao Tom Haeng、脆皮猪肉','฿100–180','晚间店，公开资料约 19:00 后开；只有愿意留在老城等晚饭才选。',['oldtown'],'Go Benz Phuket Krabi Road'),
 jok:v('Jok Ruam Jai','曼谷 · Asok，Sukhumvit 23','肉末粥加蛋','฿80–150','公开资料列周一至周六 07:30 起、周日休；适合住宿附近早餐。',['jok'],'Jok Ruam Jai Sukhumvit 23 Bangkok'),
 took:v('Took Lae Dee · Soi 16','曼谷 · Asok，Foodland Sukhumvit 16','打抛饭加蛋、泰式汤饭','฿120–220','Foodland 内的简餐店；可作早出发用餐备选，前一晚核实营业。',['took'],'Took Lae Dee Foodland Sukhumvit 16 Bangkok'),
 rung:v('Rung Rueang Pork Noodle 左店','曼谷 · Phrom Phong，Sukhumvit 26','冬阴功猪肉粉／清汤粉','฿80–150','公开资料 08:00–17:00；Asok 搭 BTS 一站再步行，不是酒店楼下。',['bangkok','rung'],'Rung Rueang Pork Noodle Left Shop Sukhumvit 26'),
 pierb:v('Pier 21 · Asok','曼谷 · Terminal 21 Asok 5 楼','打抛饭、鸡饭、泰式粉面摊任选','฿70–140','美食广场，按摊位菜单选；需等商场开门，通常先充值餐卡。',['pierb'],'Pier 21 Terminal 21 Asok Bangkok'),
 suda:v('Suda Restaurant','曼谷 · Asok，Sukhumvit 14','冬阴功、青咖喱、打抛肉','฿180–300','Asok 站旁家常泰餐；只排午晚餐。',['suda'],'Suda Restaurant Sukhumvit 14 Bangkok'),
 savoey:v('Savoey · Terminal 21 Asok','曼谷 · Terminal 21 Asok 5 楼','咖喱蟹肉／虾、炒青菜配饭','฿350–550','三人分享更合适；海鲜按重量的品项先问整盘价。',['savoey'],'Savoey Terminal 21 Asok'),
 savoth:v('Savoey · Tha Maharaj','曼谷 · 大皇宫北侧 Tha Maharaj','泰式炒粉、咖喱海鲜配饭','฿300–500','官网有此分店，安排宫殿参观后；吃完再去 Tha Tien／郑王庙。',['savoey'],'Savoey Tha Maharaj Bangkok'),
 sae:v('Sae Phun','曼谷 · 老城 Mahannop 一带','鸡肉烩饭／烩面、虾云吞','฿100–180','较早收档，尽量 13:00 前到；从大皇宫需一小段接驳，不在郑王庙门口。',['bangkok','sae'],'Sae Phun Bangkok'),
 naiek:v('Nai Ek Roll Noodles','曼谷 · 唐人街 Yaowarat Soi 9','胡椒卷粉汤＋脆皮猪肉','฿120–220','胡椒味重，适合晚饭；与另外两家均在唐人街区域。',['naiek'],'Nai Ek Roll Noodles Yaowarat Bangkok'),
 tk:v('T&K Seafood','曼谷 · 唐人街 Phadung Dao 路口','烤虾、冬阴功、炒青菜','฿350–600','绿衣海鲜店；三人合点，先核对重量、加工费和整桌总价。',['chinatown'],'T and K Seafood Yaowarat Bangkok'),
 lek:v('Lek & Rut Seafood','曼谷 · 唐人街 Phadung Dao 路口','海鲜汤、炒鱿鱼配米饭','฿300–550','与 T&K 同一区域，排队太久可互换；优先明码标价菜品。',['chinatown'],'Lek Rut Seafood Yaowarat Bangkok'),
 ortor:v('Or Tor Kor 市场熟食区','曼谷 · Kamphaeng Phet 站旁','烤猪肉串＋糯米饭／咖喱饭','฿100–200','逛乍都乍时顺路；是市场用餐方案，现场选有价签的熟食摊。',['ortor'],'Or Tor Kor Market Bangkok'),
 lay:v('Lay Lao · Ari','曼谷 · Ari，Phahon Yothin 7','木瓜沙拉、烤肉、糯米饭','฿300–450','伊桑风味；乍都乍回程可经 Ari，需多一段 BTS 和步行。',['lay'],'Lay Lao Ari Bangkok'),
 ruathong:v('Baan Kuay Tiew Ruathong','曼谷 · 胜利纪念碑船面区','牛肉船面、冬阴功干面','฿100–180','小碗可追加。笔记提到周一休；本计划放周六，离市场需乘 BTS。',['xboat','dpboat'],'Baan Kuay Tiew Ruathong Victory Monument Bangkok'),
 somtam:v('Somtam Nua · Siam Square','曼谷 · Siam Square Soi 5','青木瓜沙拉、鸡肉、糯米饭','฿250–400','用一餐体验伊桑酸辣味；参考 11:00–21:00，晚饭早点去。',['somtam'],'Somtam Nua Siam Square Soi 5 Bangkok'),
 thongsiam:v('ThongSmith · Siam Paragon','曼谷 · Siam Paragon G 层','猪肉／普通牛肉船面','฿220–380','品牌分店表已列出；避开和牛升级款更适合学生预算。',['thong'],'ThongSmith Siam Paragon Bangkok'),
 thongicon:v('ThongSmith · ICONSIAM','曼谷 · ICONSIAM 4 楼','泰式船面、椰香小甜品','฿220–380','官方分店表列 4 楼，与 G 层 SOOKSIAM 分开。',['thong'],'ThongSmith ICONSIAM Bangkok'),
 sook:v('SOOKSIAM 熟食区','曼谷 · ICONSIAM G 层','泰北咖喱面／香肠＋糯米饭','฿150–280','各地区摊位会轮换；到场按菜单选这一组风味，不锁定摊号。',['sook'],'SOOKSIAM ICONSIAM Bangkok'),
 thip:v('Thipsamai · ICONSIAM','曼谷 · ICONSIAM 6 楼','虾油蛋包泰式炒粉','฿220–380','商场名录有此分店；饮料另计，橙汁可只点一瓶三人分享。',['thip'],'Thipsamai ICONSIAM Bangkok'),
 pierp:v('Pier 21 · Pattaya','芭提雅 · Terminal 21 3 楼','泰式饭面＋一份当地甜品','฿70–150','在住宿区附近，适合省钱和下雨时用餐；不要与曼谷店混淆。',['pierp'],'Pier 21 Terminal 21 Pattaya'),
 tookp:v('Took Lae Dee · T21 Pattaya','芭提雅 · Terminal 21，Foodland','打抛饭／泰式炒粉','฿120–240','商场公开营业资料不一致，本计划只用于午晚餐；按现场营业为准。',['tookp'],'Took Lae Dee Foodland Terminal 21 Pattaya'),
 kiss:v('Kiss Food & Drink · Naklua','芭提雅 · Naklua 27（门店待核实）','泰式炒饭／汤饭加蛋','฿120–220','Wongnai 有北店资料，但 Google 当前未找到同一门店。先确认仍营业与早餐供应，无法确认就用同餐其他备选。',['kiss'],'Kiss Food Drink 668/34 Naklua 27 Pattaya'),
 mum:v('Mum Aroi · Naklua','芭提雅 · Naklua 海边','咖喱蟹、鱿鱼、青菜配饭','฿400–650','真理寺之后顺路接驳；北部 Naklua 店，别误订远郊 Como 店。',['mum'],'Mum Aroi Naklua Pattaya'),
 lan:v('Lan Pho 兰坡海鲜市场','芭提雅 · Naklua','自选虾／鱼＋现场熟食加工','฿300–500','日间市场；想作早晚饭应 16:30 左右到、18:00 前完成采购，先问加工是否接单。',['lan','xsea'],'Lan Pho Na Kluea Market Pattaya'),
 dek:v('Dek Sen Noodles','芭提雅 · Thepprasit 路一带','牛肉牛杂煲＋面／米粉','฿120–220','小红书推荐牛杂煲；营业时间未交叉确认，安排午餐，先查营业再打车。',['xdek','dek'],'Dek Sen Noodles 229/64 Pattaya'),
 pupen:v('Pupen Seafood','芭提雅 · 中天海滩南端','泰式海鲜汤、蒸鱼配饭','฿350–600','需到海滩南端，离北部住宿较远；仅在中天当天考虑，不专程来回。',['pupen'],'Pupen Seafood Jomtien Pattaya'),
 thamafood:v('Tha Maharaj 商场内泰式饭面','曼谷 · Tha Maharaj 商场餐饮区','现场有明码价的鸡饭／炒粉套餐','฿150–280','宫殿附近就近方案，先看现场餐饮目录；具体商户未锁定。',[],'Tha Maharaj Bangkok'),
 siamfood:v('Siam Paragon 美食广场','曼谷 · Siam Paragon 商场内','泰式烩面／咖喱饭＋泰奶','฿150–250','同在 Siam 商圈，按当日营业摊位选；排队累了就近坐下吃。',[],'Siam Paragon Food Court Bangkok')
};
export type Option = {venue?:string;name?:string;dish?:string;price?:string;tip?:string};
export type Meal = {name:string;note?:string;options:Option[]};
export type FoodDay = {date:string;plan?:'A'|'B';city:string;route:string;note:string;meals:Meal[]};
export const foodDays:FoodDay[] = [
  {
    "date": "20",
    "city": "上海 → 普吉",
    "route": "PVG → HKT → 芭东",
    "note": "航班未定。早餐留在上海；午餐按落地时间选，晚餐抵达芭东后再决定。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "name": "出门前吃好",
            "dish": "家附近粥／包子＋鸡蛋",
            "price": "¥15–30",
            "tip": "早班机优先，提前打包。"
          },
          {
            "name": "浦东机场热早餐",
            "dish": "安检后当日营业店的粥／汤面",
            "price": "¥35–70",
            "tip": "先确认航站楼与登机口，再就近选店。"
          },
          {
            "name": "轻便打包早餐",
            "dish": "三明治＋奶／水",
            "price": "¥20–40",
            "tip": "按安检规则携带；水过安检后购买。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "briley",
            "tip": "仅午后较早到芭东才选；HKT 到酒店还有接驳。"
          },
          {
            "name": "航班餐／预购机餐",
            "dish": "热米饭套餐",
            "price": "已含则 ¥0；否则约 ¥40–90",
            "tip": "航司未定，订票时核对是否含餐；不默认廉航供餐。"
          },
          {
            "name": "HKT 航站楼内简餐",
            "dish": "泰式鸡饭／粉面",
            "price": "฿180–320",
            "tip": "还在机场且饥饿时选；到达／出发区店铺不同，按落地现场选择。"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "no6"
          },
          {
            "venue": "no9"
          },
          {
            "venue": "briley",
            "tip": "仅较早入住且店铺仍营业时选；夜间到达改住宿旁热食。"
          }
        ]
      }
    ]
  },
  {
    "date": "21",
    "city": "普吉海滩",
    "route": "芭东 → 卡伦／卡塔 → 芭东",
    "note": "早餐靠近住处，午餐留在卡塔／卡伦；晚饭也可在海滩区域吃完再回酒店。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "briley"
          },
          {
            "venue": "no6",
            "dish": "炒面／炒饭＋热茶",
            "price": "฿120–220"
          },
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "khrua"
          },
          {
            "venue": "red"
          },
          {
            "venue": "sugar"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "red",
            "tip": "如果中午吃过这家，换另两项；吃完再回芭东。"
          },
          {
            "venue": "khrua",
            "tip": "仍在卡伦时选择，12:00 后营业。"
          },
          {
            "venue": "no6",
            "tip": "已回到芭东酒店后选择。"
          }
        ]
      }
    ]
  },
  {
    "date": "22",
    "city": "普吉浮潜",
    "route": "芭东 → 查龙码头 → 皇帝岛／珊瑚岛",
    "note": "早餐轻一点并留出接送时间。中午只有随所订路线可实现的方案；21—23 日换行程时，用餐安排一起换。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          },
          {
            "venue": "briley",
            "tip": "接送较晚且来得及时可吃小份鸡饭；赶时间就选早餐盒。",
            "price": "฿80–130"
          },
          {
            "name": "住宿旁便利店热食",
            "dish": "热饭团／三明治＋牛奶",
            "price": "฿60–120",
            "tip": "就近应急方案；不是专程美食店，适合早出发或等接送。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "name": "首选：所订浮潜团的午餐",
            "dish": "米饭、熟食和水",
            "price": "含餐团内已计；加餐另问",
            "tip": "皇帝岛路线订团时确认餐食地点、是否含餐；不要另订一顿重复付费。"
          },
          {
            "name": "改选珊瑚岛：Banana Beach 含餐套餐",
            "dish": "套餐内午餐",
            "price": "已计入对应套餐",
            "tip": "只在选择该官方浮潜套餐时适用，不能拿皇帝岛团票去兑换；内容按运营方。"
          },
          {
            "venue": "briley",
            "tip": "仅停航并留在芭东的陆地备用午餐；正常出海时不适用。"
          }
        ],
        "note": "这里是 3 个条件方案，不是岛上 3 家可随意走到的餐馆。"
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "no6",
            "tip": "回芭东后吃饭；疲劳就直接选最近的一家。"
          },
          {
            "venue": "no9"
          },
          {
            "venue": "briley",
            "tip": "返程早、仍营业时选鸡饭；不为赶店催促船程。"
          }
        ]
      }
    ]
  },
  {
    "date": "23",
    "city": "普吉老街",
    "route": "芭东 → 老街 → 查龙寺 → 芭东",
    "note": "想吃老街早餐就早出门，把早餐和逛老街连起来。晚上默认回芭东；Go Benz 是愿意改变晚间顺序时的备选。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "roti"
          },
          {
            "venue": "boon"
          },
          {
            "venue": "briley",
            "tip": "想睡到自然醒就在芭东吃，再去老街；不必专程赶早茶。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "mee"
          },
          {
            "venue": "one"
          },
          {
            "venue": "chuan"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "no9",
            "tip": "查龙寺后回芭东再吃。"
          },
          {
            "venue": "no6"
          },
          {
            "venue": "gobenz",
            "tip": "想吃这家，需愿意查龙寺后回老城、等到晚间营业；会增加折返。"
          }
        ]
      }
    ]
  },
  {
    "date": "24",
    "city": "普吉 → 芭提雅",
    "route": "HKT → BKK／DMK → 芭提雅酒店",
    "note": "上午飞曼谷后直接转车去芭提雅，不去 Asok 吃午饭。餐食按实际航班、候车与酒店抵达时间选择。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "briley"
          },
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          },
          {
            "name": "住宿旁便利店热食",
            "dish": "热饭团／三明治＋牛奶",
            "price": "฿60–120",
            "tip": "就近应急方案；不是专程美食店，适合早出发或等接送。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "name": "HKT 航站楼内泰式简餐",
            "dish": "鸡饭／打抛饭／粉面",
            "price": "฿180–320",
            "tip": "机场店铺按航站楼与安检区现场选，留够候机时间。"
          },
          {
            "name": "曼谷机场候车前简餐",
            "dish": "航站楼内鸡饭／粉面",
            "price": "฿180–350",
            "tip": "只在换乘候车时间足够时吃，不跨机场或进城找店。"
          },
          {
            "name": "提前预购航班热餐",
            "dish": "航空公司当日米饭套餐",
            "price": "约 ¥30–70，按航司",
            "tip": "仅航司提供且已确认供应时适用。"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "pierp",
            "tip": "到达 Terminal 21 Pattaya 且仍在营业时选。"
          },
          {
            "venue": "tookp",
            "tip": "入住北部后选；先看商场与餐厅当天营业。"
          },
          {
            "name": "晚到酒店附近热食",
            "dish": "热饭／汤面＋水",
            "price": "฿120–250",
            "tip": "仅较晚抵达时使用。由酒店协助确认附近仍营业的店，不指定尚未落实的门店。"
          }
        ]
      }
    ]
  },
  {
    "date": "25",
    "city": "芭提雅海边",
    "route": "北部住宿 → 真理寺 → 中天海滩 → 北部晚餐 → 99秀",
    "note": "上午真理寺，午后中天，约 16:00 离开海边，回北部吃晚饭，约 19:30 抵达 99秀场。兰坡市场选项需更早回北部；若改格兰岛，午餐随当天安排并提前回大陆。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "kiss"
          },
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          },
          {
            "name": "住宿旁便利店热食",
            "dish": "热饭团／三明治＋牛奶",
            "price": "฿60–120",
            "tip": "就近应急方案；不是专程美食店，适合早出发或等接送。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "dek"
          },
          {
            "venue": "pupen"
          },
          {
            "venue": "pierp",
            "tip": "若下雨或决定留在北部，改商场吃；不从中天专程折返一顿饭。"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "mum",
            "tip": "Naklua 店，三人合点；尽量 18:30 前吃完，给前往 99秀场和换票留时间。"
          },
          {
            "venue": "lan",
            "tip": "仅能在 16:30 左右回北部采购加工时选，18:00 前尽量吃完；排队或加工来不及就改商场。"
          },
          {
            "venue": "pierp",
            "tip": "Terminal 21 北部就近用餐，适合看秀前控制时间和花费；尽量 18:30 前吃完。"
          }
        ]
      }
    ]
  },
  {
    "date": "26",
    "city": "芭提雅 → 曼谷",
    "route": "北芭提雅 → Ekkamai → Asok → ICONSIAM",
    "note": "上午芭提雅回曼谷，中午在 Asok 吃，先入住休息；傍晚再去 ICONSIAM。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "kiss"
          },
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          },
          {
            "name": "住宿旁便利店热食",
            "dish": "热饭团／三明治＋牛奶",
            "price": "฿60–120",
            "tip": "就近应急方案；不是专程美食店，适合早出发或等接送。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "pierb"
          },
          {
            "venue": "suda"
          },
          {
            "venue": "rung",
            "tip": "需在 17:00 收档前到；不想拉行李绕路就先回酒店。"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "sook"
          },
          {
            "venue": "thip"
          },
          {
            "venue": "thongicon"
          }
        ]
      }
    ]
  },
  {
    "date": "27",
    "city": "曼谷周末",
    "route": "Asok → 乍都乍 → 休息 → Siam",
    "note": "周日逛乍都乍；Jok Ruam Jai 的资料列周日休息，早餐不选这家。午餐按 Or Tor Kor、Ari 或胜利纪念碑路线三选一。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "took"
          },
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          },
          {
            "venue": "ortor",
            "tip": "先去市场熟食区吃，再逛乍都乍，按当天开档摊位选择。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "ortor"
          },
          {
            "venue": "ruathong"
          },
          {
            "venue": "lay"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "somtam"
          },
          {
            "venue": "thongsiam"
          },
          {
            "venue": "siamfood"
          }
        ]
      }
    ]
  },
  {
    "date": "28",
    "city": "曼谷老城",
    "route": "Asok → 大皇宫 → 郑王庙 → 唐人街",
    "note": "周一逛老城。上午先吃早餐再去宫殿，午餐后渡河；晚餐核对唐人街固定门店营业，不依赖街边摊。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "jok"
          },
          {
            "venue": "took"
          },
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "sae"
          },
          {
            "venue": "savoth"
          },
          {
            "venue": "thamafood"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "naiek"
          },
          {
            "venue": "tk"
          },
          {
            "venue": "lek"
          }
        ]
      }
    ]
  },
  {
    "date": "29",
    "city": "曼谷 → 上海",
    "route": "Asok → BKK／DMK → PVG",
    "note": "三餐随航班调整。凌晨／早班机需将今天的机场用餐前移，市区候选只在时间宽裕时适用。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "jok",
            "tip": "非早班机、仍在 Asok 时适用。"
          },
          {
            "venue": "took",
            "tip": "按实际出发时间选择，国际段仍须提前到机场。"
          },
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "pierb",
            "tip": "午后或晚班机、尚未离开市区时适用。"
          },
          {
            "venue": "suda",
            "tip": "只在有充足时间的午后／晚班机适用。"
          },
          {
            "name": "实际出发机场内泰式饭面",
            "dish": "鸡饭／打抛饭／清汤粉",
            "price": "฿180–350",
            "tip": "确认是 BKK 还是 DMK，再在所属航站楼就近选店；不跨机场找美食。"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "name": "机场内最后一顿泰餐",
            "dish": "泰式炒粉／汤饭＋水",
            "price": "฿180–350",
            "tip": "晚班机且仍在机场时选，优先登机口同一区域。"
          },
          {
            "name": "机上热餐",
            "dish": "已订航班提供的套餐",
            "price": "含餐则 ¥0；另购约 ¥40–100",
            "tip": "按机票餐食条款；无餐航班提前买好。"
          },
          {
            "name": "上海落地后简餐",
            "dish": "热面／粥／家常饭",
            "price": "¥25–60",
            "tip": "若晚饭时间已经回国，就近吃即可；这项不是泰国餐厅推荐。"
          }
        ]
      }
    ],
    "plan": "A"
  },
  {
    "date": "29",
    "plan": "B",
    "city": "曼谷艺术与商圈",
    "route": "Asok → BACC → Siam",
    "note": "B 方案今天继续玩，下午 BACC 和 Siam，餐厅按想在哪一段吃来选；不用为了打卡重复吃同一家。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "jok"
          },
          {
            "venue": "took"
          },
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "pierb",
            "tip": "出发前在 Asok 吃完再去 BACC。"
          },
          {
            "venue": "somtam",
            "tip": "已到 Siam 后吃午餐。"
          },
          {
            "venue": "siamfood",
            "tip": "在 Siam 商场按现场菜单选。"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "thongsiam"
          },
          {
            "venue": "somtam",
            "tip": "午餐没吃过时选。"
          },
          {
            "venue": "siamfood"
          }
        ]
      }
    ]
  },
  {
    "date": "30",
    "plan": "B",
    "city": "曼谷公园与休整",
    "route": "伦披尼公园 → Asok → Terminal 21",
    "note": "早上散步后回住宿区，午晚餐集中在 Asok；有精力可乘一站 BTS 去 Phrom Phong 吃面。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "jok",
            "tip": "可吃完再去公园，不是公园内门店。"
          },
          {
            "venue": "took"
          },
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "rung"
          },
          {
            "venue": "pierb"
          },
          {
            "venue": "suda"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "venue": "savoey"
          },
          {
            "venue": "suda"
          },
          {
            "venue": "pierb"
          }
        ]
      }
    ]
  },
  {
    "date": "1001",
    "city": "曼谷 → 上海",
    "route": "Asok → BKK／DMK → PVG",
    "note": "三餐随航班调整。凌晨／早班机需将今天的机场用餐前移，市区候选只在时间宽裕时适用。",
    "meals": [
      {
        "name": "早餐",
        "options": [
          {
            "venue": "jok",
            "tip": "非早班机、仍在 Asok 时适用。"
          },
          {
            "venue": "took",
            "tip": "按实际出发时间选择，国际段仍须提前到机场。"
          },
          {
            "name": "住宿处早餐／早餐盒",
            "dish": "热粥、鸡蛋、吐司和水果",
            "price": "已含则 ¥0；另付看酒店",
            "tip": "酒店尚未确定；有含早就优先利用，早出发需前晚确认能否打包。"
          }
        ]
      },
      {
        "name": "午餐",
        "options": [
          {
            "venue": "pierb",
            "tip": "午后或晚班机、尚未离开市区时适用。"
          },
          {
            "venue": "suda",
            "tip": "只在有充足时间的午后／晚班机适用。"
          },
          {
            "name": "实际出发机场内泰式饭面",
            "dish": "鸡饭／打抛饭／清汤粉",
            "price": "฿180–350",
            "tip": "确认是 BKK 还是 DMK，再在所属航站楼就近选店；不跨机场找美食。"
          }
        ]
      },
      {
        "name": "晚餐",
        "options": [
          {
            "name": "机场内最后一顿泰餐",
            "dish": "泰式炒粉／汤饭＋水",
            "price": "฿180–350",
            "tip": "晚班机且仍在机场时选，优先登机口同一区域。"
          },
          {
            "name": "机上热餐",
            "dish": "已订航班提供的套餐",
            "price": "含餐则 ¥0；另购约 ¥40–100",
            "tip": "按机票餐食条款；无餐航班提前买好。"
          },
          {
            "name": "上海落地后简餐",
            "dish": "热面／粥／家常饭",
            "price": "¥25–60",
            "tip": "若晚饭时间已经回国，就近吃即可；这项不是泰国餐厅推荐。"
          }
        ]
      }
    ],
    "plan": "B"
  }
];
