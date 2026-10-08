import Link from "next/link";

export default function NotFound() {
  return <section className="hero"><h1>页面不存在</h1><p>请检查地址，或返回首页继续浏览。</p><Link className="button" href="/">返回首页</Link></section>;
}
