const Sequelize = require('sequelize')

module.exports = class Employee extends Sequelize.Model {
    static init(sequelize, DataTypes){
        return super.init(
            {
                // フィールド
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                tel: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
            }, {
                tableName: 'employee',
                // オプション
                freezeTableName: true,
                underscored: true,
                timestamps: false,
                sequelize
            }
        )
    }

    static findByAll(option) {
        return this.findOne(option)
    }
}
