const { Sequelize } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const scan = sequelize.define('Scan', {
    my_id: { field: 'my_id', type: DataTypes.STRING(50), allowNull: false, primary:false },
    scan_id: { field: 'scan_id', type: DataTypes.STRING(50), allowNull: false },
    scan_time: { field: 'scan_time', type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  }, {
    underscored: true,
    indexes: [
      {unique:false,
      fields:['my_id', 'scan_id']}
    ],

    tableName: 'scan'
  });

  return scan;
};