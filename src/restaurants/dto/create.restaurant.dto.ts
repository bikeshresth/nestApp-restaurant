import { Category } from "../schemas/restaurants.schema"

export class createRestaurantDto {

    readonly name: string
    readonly description: string
    readonly email: string
    readonly phoneNo: number
    readonly address: string
    readonly category: Category
}