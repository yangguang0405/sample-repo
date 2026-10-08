const capabilities = [
  { title: "自适应布局", description: "从手机到桌面，内容随屏幕宽度自然排列。" },
  { title: "前后端一体", description: "页面与服务端接口使用同一个 Next.js 应用。" },
  { title: "按业务扩展", description: "从这里开始，逐步构建你的产品功能。" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">准备就绪</p>
        <h1 id="page-title">从一个好用的基础开始。</h1>
        <p className="lead">一个适合手机与桌面浏览器的 Web 应用起点。</p>
        <a className="button" href="#capabilities">了解应用基础 <span aria-hidden="true">↓</span></a>
      </section>
      <section id="capabilities" className="card-grid" aria-label="应用基础">
        {capabilities.map(({ title, description }) => <article className="card" key={title}><h2>{title}</h2><p>{description}</p></article>)}
      </section>
    </>
  );
}
