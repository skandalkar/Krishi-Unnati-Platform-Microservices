const startTradeMonitoring = require("../services/monitoring.service");

const startMonitors = () => {
  startTradeMonitoring();
};

module.exports = startMonitors;