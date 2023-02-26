export default class DataTypesHelper{

    public static parseNumber(data: any, options: {
        negative: boolean,
        default: number
    } = {
        negative: true,
        default: 0
    }): number{

        const  number: number = Number(data) || options.default;

        if(!(options.negative) && number < 0){
            return options.default;
        }

        return number;
    } 

}