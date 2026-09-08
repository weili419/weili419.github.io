import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: '泰国旅行 A／B 方案｜普吉、芭提雅、曼谷',
 description: '2026 年 9 月 20 日出发，普吉—芭提雅—曼谷；A 9/29 返程，B 10/1 返程。每日地图、美食、三床酒店与浮潜攻略。',
 icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="zh-CN"><body>{children}</body></html>;
}
