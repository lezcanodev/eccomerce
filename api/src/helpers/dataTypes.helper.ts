export default class DataTypesHelper{

    public static stringToNumber(data: any, options: {
        negative: boolean,
        default: number
    } = {
        negative: true,
        default: 0
    }): number{

        let  number: number = Number(data) || options.default;

        if(!(options.negative) && number && number < 0){
            return options.default;
        }

        return number;
    } 

}