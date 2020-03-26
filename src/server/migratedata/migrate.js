const Sequelize = require('sequelize')
const usersData = require('./data.json')
const sequelize = new Sequelize('mysql://root:1234@localhost/sql_testing')

const loadData = async function () {
    console.log('start loading')
    for(let user of usersData) {
        const userCountryId = await sequelize.query(`SELECT id FROM Country WHERE name = '${user.country}'`)
        const ownerId = await sequelize.query(`SELECT id FROM Owner WHERE name = '${user.owner}'`)
        const userFullName = user.name.split(" ")
        const fContact = await sequelize.query(`INSERT INTO First_Contact VALUES(null, ${user.firstContact.split("T")[0].split("-")[0]}, ${user.firstContact.split("T")[0].split("-")[1]}, ${user.firstContact.split("T")[0].split("-")[2]})`)

        if(userCountryId[0][0] === undefined) {
            const countryId = await sequelize.query(`INSERT INTO Country VALUES(null, '${user.country}')`)
            
            if(ownerId[0][0] === undefined) {
                const owner = await sequelize.query(`INSERT INTO Owner VALUES(null, '${user.owner}')`)
                
                const newUser = await sequelize
                        .query(`INSERT INTO User VALUES('${user._id}', '${userFullName[0]}', '${userFullName[1]}', '${user.email}', ${fContact[0]}, '${user.emailType}', ${user.sold}, ${owner[0]}, ${countryId[0]})`)
                // await sequelize.query(`INSERT INTO User_Owner VALUES(${owner[0]}, ${newUser[0]})`)
            } else {
                const newUser = await sequelize
                        .query(`INSERT INTO User VALUES('${user._id}', '${userFullName[0]}', '${userFullName[1]}', '${user.email}', ${fContact[0]}, '${user.emailType}', ${user.sold}, ${ownerId[0][0].id}, ${countryId[0]})`)
                // await sequelize.query(`INSERT INTO User_Owner VALUES(${ownerId[0][0].id}, ${newUser[0]})`)
            }
        } else {
            if(ownerId[0][0] === undefined) {
                const owner = await sequelize.query(`INSERT INTO Owner VALUES(null, '${user.owner}')`)
                const newUser = await sequelize
                        .query(`INSERT INTO User VALUES('${user._id}', '${userFullName[0]}', '${userFullName[1]}', '${user.email}', ${fContact[0]}, '${user.emailType}', ${user.sold}, ${owner[0]}, ${userCountryId[0][0].id})`)
                // await sequelize.query(`INSERT INTO User_Owner VALUES(${owner[0]}, ${newUser[0]})`)
            } else {
                console.log(ownerId[0][0].id)
                const newUser = await sequelize
                        .query(`INSERT INTO User VALUES('${user._id}', '${userFullName[0]}', '${userFullName[1]}', '${user.email}', ${fContact[0]}, '${user.emailType}', ${user.sold}, ${ownerId[0][0].id}, ${userCountryId[0][0].id})`)
                // await sequelize.query(`INSERT INTO User_Owner VALUES(${ownerId[0][0].id}, ${newUser[0]})`)
            }            
        }
    }
    console.log('finish loading')
}
loadData()
