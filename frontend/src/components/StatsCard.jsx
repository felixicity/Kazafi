const StatsCard = ({ stat }) => {
      return (
            <div className="stat-card">
                  <p className="stat-title">{stat.title}</p>
                  <h2 className="stat-value">{stat.value}</h2>
                  <p className={`stat-change ${stat.color}`}>{stat.change}</p>
            </div>
      );
};

export default StatsCard;
