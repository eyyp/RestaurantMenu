import { View, Text, StyleSheet} from "react-native";
import { useEffect, useState } from "react";
import { ItemProperty } from "../../services/methods/property";

const PropertyCard = (props) =>{

    const [title,setTitle] = useState("");

    useEffect(()=>{
        ItemProperty(props.item.property_id,(err,data)=>{
            if(data.data){
                setTitle(data.data.title);
            }
        })
    },[])

    return(
        <View>
            <Text>{title}</Text>
        </View>
    )
}

export default PropertyCard;