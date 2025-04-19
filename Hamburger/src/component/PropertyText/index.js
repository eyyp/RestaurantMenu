import { View, Text } from "react-native";
import { Find } from "../../services/methods/property";
import { useState, useEffect} from "react";

const PropertyText = (props) =>{

    const [title,setTitle] = useState();

    useEffect(()=>{
        Find(props.item.property_id,(err,data)=>{
            if(data){
                console.log(data.data)
                setTitle(data.data.title);
            }
        })
    },[])

    return(
        <Text style={{fontSize:18,fontFamily:'CoalhandLuke TRIAL',color:'white'}}>{title},</Text>
    )
}

export default PropertyText;