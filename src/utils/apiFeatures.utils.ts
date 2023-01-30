import { BadRequestException } from "@nestjs/common"
import { ERROR_MSG } from "src/constants/constant"
import { Location } from "src/restaurants/schemas/restaurants.schema"


const nodeGeoCoder = require('node-geocoder')
export default class APIFeatures {
    static async getRestaurantLocation(address) {
        try {
            const options = {
                provider: process.env.GEOCODER_PROVIDER,
                httpAdapter: 'https',
                apiKey: process.env.GEOCODER_API_KEY,
                formatter: null,
            }

            const geocoder = nodeGeoCoder(options)
            const loc = await geocoder.geocode(address)
            const location: Location = {
                type: 'Point',
                coordinates: [loc[0].longitude, loc[0].latitude],
                formattedAddress: loc[0].formattedAddress,
                city: loc[0].city,
                state: loc[0].state,
                zipcode: loc[0].zipcode,
                country: loc[0].country,

            }
            return location;
        } catch (error) {
            throw new BadRequestException(ERROR_MSG.LOCATION_NOT_FOUND)
        }


    }
}