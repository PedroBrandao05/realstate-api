export default class PropertiesMatcher {

    static match(previousProperties: string[], propertiesFound: string[]){
        const output = []
        for (const propertyFound of propertiesFound){
            const [matchedProperty] = previousProperties.filter((previousProperty) => previousProperty === propertyFound)
            if (matchedProperty) output.push(matchedProperty)
        } 
        return output
    }
}