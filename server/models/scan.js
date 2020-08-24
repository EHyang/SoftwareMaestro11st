const { Sequelize } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const scan = sequelize.define('Scan', {
    my_token: { field: 'my_token', type: DataTypes.STRING(50), allowNull: false, primarytoken:false },
    scan_token: { field: 'scan_token', type: DataTypes.STRING(50), allowNull: false },
    scan_time: { field: 'scan_time', type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  }, {
    underscored: true,
    indexes: [
      {unique:false,
      fields:['my_token', 'scan_token']}
    ],

    tableName: 'scan'
  });

  return scan;
};