const { Sequelize } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const scan = sequelize.define('Scan', {
    my_mac: { field: 'my_mac', type: DataTypes.STRING(50), allowNull: false, primaryKey:false },
    scan_mac: { field: 'scan_mac', type: DataTypes.STRING(50), allowNull: false },
    scan_time: { field: 'scan_time', type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  }, {
    underscored: true,
    indexes: [
      {unique:false,
      fields:['my_mac', 'scan_mac']}
    ],

    tableName: 'scan'
  });

  return scan;
};