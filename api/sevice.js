const {Data} = require("./data");

async function saveDateFromDevice(data) {
    try {
        await Data.create({
            Tem: data.Tem,
            Hum: data.Hum,

        })
        
        console.log("Lưu dữ liêu và database.")
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    saveDateFromDevice
}