# 泰国旅行网页

唯一维护目录：本文件所在的 `travel/thailand`。桌面原“泰国旅游计划”目录仅保留备份，不再作为发布源。

- `_source/app/page.tsx`：攻略正文、交通、预算和清单。
- `_source/public/trip.json`：9/20—9/30 行程、景点与交通坐标。
- `_source/app/food-data.ts`：每天三餐及餐厅推荐；`public/food-locations.json`：餐厅坐标。
- `_source/public/hotels.json`：酒店、床型与入住日期；历史报价仅供追溯。
- `_source/public/trip-map.js`：互动地图；`trip-guide.js`：主页面与地图的酒店、餐饮联动。
- `index.html`、`map.html`、`assets/`：生成的发布文件，请通过源码修改。

在本目录的 `_source` 中执行（Node 22.13+、Python 3）：

```sh
npm ci
npm run publish-files
npx tsc --noEmit
node --experimental-strip-types scripts/check-plans.mjs
```

已有依赖时不必重复 `npm ci`。`publish-files` 会构建样式、启动临时本地预览、导出静态发布文件，然后关闭临时服务；它不会提交或推送。

回到仓库根目录运行 `bundle exec jekyll build`，检查后只提交本目录的变更并推送 main。GitHub Pages 完成部署后，朋友即可打开：

- https://weili419.github.io/travel/thailand/

静态发布不依赖桌面原目录或 Node 服务。地图街道图需要联网，加载失败时显示内置地理概览。Jekyll 不会发布以下划线开头的源码目录。

行程：9/20—24 普吉 4 晚；9/24 机场直达芭提雅，住至 9/26；曼谷住至 9/30，当天返回杭州萧山国际机场。餐饮和酒店均为候选，机票、酒店及团均未预订。新日期酒店报价需重新查询。

Google My Maps 尚未接入：文件选择器被安全页面拦截。`_source/mymaps/README.md` 记录同一张地图的四个 KML 图层、待完成步骤与数据生成方式。当前线上地图保持 MapLibre/OpenFreeMap，不声称已完成 Google 替换。静态导出为地图与资源 URL 添加内容版本，避免缓存混用旧文件。

9/25 安排 99 Show Pattaya 成人演出，约 19:30 为计划抵达时间（未订票，并非固定开演场次）。北部晚餐与秀场地图位置已同步；预算包含 ¥350／人门票及新增晚间接驳规划额。`_source/app/show-guide.tsx` 保存入场须知和公开资料来源。
