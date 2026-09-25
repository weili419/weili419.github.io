import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: '泰国旅行计划｜普吉、芭提雅、曼谷',
 description: '2026 年 9 月 20 日搭乘 9C8521 抵达普吉，9 月 24 日搭乘 DD525 到廊曼并经 Mo Chit 前往芭提雅，9 月 30 日返回杭州萧山机场。',
 icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="zh-CN"><body>{children}</body></html>;
}
