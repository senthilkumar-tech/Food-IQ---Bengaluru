function KpiCard({ icon, label, value, trend }) {
  return (
    <div className="kpi-Card">
      <div className="kpi-left-icon-box">
        <span className="kpi-emoji-icon">{icon}</span>
      </div>
      <div className="kpi-content-box">
        <span className="kpi-label-dim">{label}</span>
        <h2 className="kpi-value-text">{value}</h2>
        <span className="kpi-trend-green">↑ {trend} <small className="trend-lbl">from last month</small></span>
      </div>
    </div>
  );
}

export default KpiCard;