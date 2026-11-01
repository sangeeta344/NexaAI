function Credits({ onBack }) {
  return (
    <section className="content-page">
      <button className="back-button" onClick={onBack}>← Back to chat</button>
      <div className="page-heading"><p className="eyebrow">YOUR PLAN</p><h1>Credits</h1><p>Keep track of your AI usage. Billing will be connected to the backend later.</p></div>
      <div className="credits-card"><div><span className="credit-number">200</span><span className="credit-label">credits remaining</span></div><div className="credit-progress"><span></span></div><p>Demo credits · resets when the frontend state is refreshed.</p></div>
    </section>
  );
}
export default Credits;
