const { Device, Connection, Buzzer } = require('../models');
const removeTimestamp = require('../helpers/removeDeviceTimestamp');

class DeviceController {

    static async addDevice(req, res, next) {
        const { deviceSerial } = req.body

        let deviceData

        try {
            const device = await Device.create({ deviceSerial });
            deviceData = {...device.dataValues};
            removeTimestamp(deviceData);

            const newBuzz = {
                isActive: false,
                DeviceId: deviceData.id
            }

            const data =  await Buzzer.create(newBuzz);
            const {...buzzerData} = data.dataValues
            removeTimestamp(buzzerData);
            res.status(201).json({ device: deviceData, alarm: buzzerData });

        } catch (err) {
            if (err.errors) {
                let err_data = err.errors.map(el => {
                    return el.message
                })

                err_data = err_data.join('. ')

                next({ str_code: 'REGISTRATION_VALIDATION', err_data })
            } else {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            }   
        }

    }

    static listDevice(req, res, next) {

        const { id } = req.user
        
        Connection.findAll({
            include: Device,
            where: { UserId: id }
        })
            .then(devices => {
                res.status(200).json(devices)
            })
            .catch((err) => {
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            })
    }

}

module.exports = DeviceController