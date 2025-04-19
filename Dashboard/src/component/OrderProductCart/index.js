import { View,Text,TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import { horizontalScale, verticalScale } from "../../config";
import { useEffect, useState } from "react";
import { Find } from "../../services/methods/product";
import { FindItemProperty } from "../../services/methods/order";
import PropertyCard from "../PropertyCard";

const OrderProductCart = (props) =>{

    const[title,setTitle] = useState("");
    const[data,setData] = useState([]);

    useEffect(()=>{
        Find(props.item.product_id,(error,data)=>{
            if(data){
                setTitle(data.data.title);
            }
        })

        FindItemProperty(props.item.order_item_id,(error,data)=>{
            if(data){
                console.log("item property:",data.data)
                setData(data.data)
            }
        })
    },[])

    useEffect(()=>{
        console.log(data)
    },[data])

    return(
        <View style={styles.container}>
            <Text>{title}</Text>

            <Text>Özellikler</Text>
                {data.length > 0 && data.map((item,index)=>
                    <PropertyCard item={item} key={index}/>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        with: horizontalScale(250),
        minhHeight: verticalScale(200),
        backgroundColor: 'white',
        borderColor: 'black',
        borderRadius: 10,
        paddingVertical: verticalScale(20),
        paddingHorizontal: horizontalScale(20)
    }
})

export default OrderProductCart;