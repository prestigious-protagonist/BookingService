const {Booking} = require("../models/index");
const {StatusCodes} =  require("http-status-codes")
const {ValidationError, AppError} = require("../utils/errors/index");
class BookingRepository {
    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking ;
        } catch (error) {
            if(error.name == "SequelizeValidationError") {
                throw new ValidationError(error)
            }
            throw new AppError("RepositoryError", "Cannot create Booking", "There was some issue while creating the booking, please try again later", StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async updateStatus(bookingId, data) {
        
        try {
            const booking = await Booking.findByPk(bookingId)
            if(data.status) {
                booking.status = data.status
            }
            await booking.save();
            return booking;
        } catch (error) {
            throw new AppError("RepositoryError", "Cannot update Booking", "There was some issue while updating the booking, please try again later", StatusCodes.INTERNAL_SERVER_ERROR)
        
        }
    }

    async updateBooking(bookingId, data) {
        try {
            const booking = await Booking.update(data, {
                where: {
                    id: bookingId
                }
            })
            return booking;
        } catch (error) {
            throw new AppError("RepositoryError", "Cannot update Booking", "There was some issue while updating the booking, please try again later", StatusCodes.INTERNAL_SERVER_ERROR)
        
        }
    }
}

module.exports = BookingRepository;