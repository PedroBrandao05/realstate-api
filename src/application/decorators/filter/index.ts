import { Filter, FilterOptions } from "../../../domain/usecases/propertyPresentation";
import filterByArea from "./filterByArea";
import filterByBathrooms from "./filterByBathrooms";
import filterByDistrict from "./filterByDistrict";
import filterByGarageSpots from "./filterByGarageSpots";
import filterByPropertyType from "./filterByPropertyType";
import filterByRentCost from "./filterByRentCost";
import filterBySaleCost from "./filterBySaleCost";
import filterBySleepingRooms from "./filterBySleepingRooms";
import filterExchangeableOnes from "./filterExchangeableOnes";
import filterFinanciableOnes from "./filterFinanciableOnes";
import filterOnesOnRent from "./filterOnesOnRent";
import filterOnesOnSale from "./filterOnesOnSale";

export default function appendDecorator (filter: Filter){
    switch (filter.option){
        case FilterOptions.SALE: return filterOnesOnSale
        case FilterOptions.RENT: return filterOnesOnRent
        case FilterOptions.SALE_COST: return filterBySaleCost
        case FilterOptions.RENT_COST: return filterByRentCost
        case FilterOptions.ACCEPTS_EXCHANGE: return filterExchangeableOnes
        case FilterOptions.ACCEPTS_FINANCING: return filterFinanciableOnes
        case FilterOptions.BATHROOMS: return filterByBathrooms
        case FilterOptions.SLEEPING_ROOMS: return filterBySleepingRooms
        case FilterOptions.AREA: return filterByArea
        case FilterOptions.GARAGE_SPOTS: return filterByGarageSpots
        case FilterOptions.DISTRICT: return filterByDistrict
        default: return filterByPropertyType
    }
}