function Community({ onBack }) {
  const posts = [
    ["Aarav", "Built my first React dashboard with NexaAI.", "12 likes · 4 replies"],
    ["Meera", "What should I learn after JavaScript and React?", "8 likes · 6 replies"],
    ["Rahul", "Sharing a clean Express + MongoDB starter.", "21 likes · 7 replies"],
  ];
  return (
    <section className="content-page">
      <button className="back-button" onClick={onBack}>← Back to chat</button>
      <div className="page-heading"><p className="eyebrow">NEXAAI COMMUNITY</p><h1>Learn together.</h1><p>Share projects, questions, prompts and useful discoveries.</p></div>
      <div className="community-grid">
        {posts.map(([name, title, meta]) => <article className="community-card" key={title}><div className="post-avatar">{name[0]}</div><div><strong>{name}</strong><h3>{title}</h3><span>{meta}</span></div></article>)}
      </div>
    </section>
  );
}
export default Community;
