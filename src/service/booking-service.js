const { FLIGHT_SERVICE_PATH } = require('../config/server-config');
const {BookingRepository} =  require('../repository/index')
const axios = require('axios');
const ServiceError = require('../utils/errors/service-error');
const { StatusCodes } = require('http-status-codes');
class BookingService {
    constructor() {
        this.BookingRepository = new BookingRepository();
    }
        async createBooking(data) {
            try {
                const flightId = data.flightId;
                //call to flight search and service to know the number of seats before booking 
                const FlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
                console.log(FlightRequestURL)
                const flight = await axios.get(FlightRequestURL);
                const flightData =  flight.data.data;
                const priceOfTheFlight = flightData.price;
                if(data.noOfSeats > flightData.totalSeats ) {
                    console.log(1)
                    throw new ServiceError("ServerError", "Something went wrong in the booking process","Insufficient seats", StatusCodes.INTERNAL_SERVER_ERROR)
                }
                const totalCost = data.noOfSeats * priceOfTheFlight;
                const bookingPayload = {...data, totalCost};    
                const booking = await this.BookingRepository.create(bookingPayload);
                
                const updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
                await axios.patch(updateFlightRequestUrl, {
                    totalSeats : flightData.totalSeats - booking.noOfSeats
                })
                const finalBooking = await this.BookingRepository.updateStatus(booking.id, {
                    status: "Booked"
                })
                
                return finalBooking;  
                
            } catch (error) {
                if (error instanceof ServiceError || error.name == "ValidationError" || error.name == "RepositoryError") {
                    throw error; // Rethrow the original ServiceError
                }
        
                // Handle unexpected errors
                console.log("Something went wrong at service layer:", error.message);
                throw new ServiceError(
                    "ServerError",
                    "Unexpected error occurred in the booking process",
                    error.message,
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }
        }
        async updateBooking(bookingId, data) {
            try {
                const booking = await this.BookingRepository.updateBooking(bookingId, data)
                return booking
            } catch (error) {
                console.log("Something went wrong at service layer:", error.message);
                throw new ServiceError(
                    "ServerError",
                    "Unexpected error occurred in the booking updation process",
                    error.message,
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }
        }
}

module.exports = BookingService;