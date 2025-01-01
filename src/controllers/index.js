const BookingService = require('../service/booking-service')
const {StatusCodes} = require('http-status-codes')
const bookingService = new BookingService()
const create = async (req, res ) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        res.status(StatusCodes.OK).json({
            success: true,
            msg: "Successfully booked the flight",
            data: booking,
            err: []
        })
    } catch (error) {
        res.status(error.statusCode).json({
            success: false,
            msg: "Couldn't book the flight",
            data: {},
            err: error
        })
    }
}
const update = async (req, res ) => {
    try {
        const booking = await bookingService.updateBooking(req.params.id, req.body);
        res.status(StatusCodes.OK).json({
            success: true,
            msg: "Successfully updated the booking",
            data: booking,
            err: []
        })
    } catch (error) {
        res.status(error.statusCode).json({
            success: false,
            msg: "Couldn't update the booking",
            data: {},
            err: error
        })
    }
}

module.exports = {
    create, update
}