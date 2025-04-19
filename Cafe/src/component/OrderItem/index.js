import { View, TouchableOpacity, Text, Image, StyleSheet, ActivityIndicator} from "react-native";
import { useEffect, useState} from "react";
import { Find } from "../../services/methods/product";
import { horizontalScale, verticalScale } from "../../config";
import { GetImage } from "../../services/methods/product";
import { ItemProperty } from "../../services/methods/cart";
import PropertyText from "../PropertyText";
const OrderItem = (props) =>{

    const [data,setData] = useState();
    const [imageUri,setImageUri] = useState();
    const [propertys,setPropertys] = useState([]);

    useEffect(()=>{
        Find(props.item.product_id,(err,data)=>{
            if(data){
                setData(data.data);
            }
        })
        GetImage(props.item.product_id,"0",(err,data)=>{
            if(data){
                setImageUri(data.data.image)
            }
        })
    },[])

    return( 
        <View style={styles.button}>
            {imageUri ? 
                <Image 
                    style={styles.image}
                    source={{uri: `data:image/png;base64,${imageUri}`}}
                />
                : <View style={{backgroundColor:'black',width:horizontalScale(75),height:verticalScale(74),borderRadius:15}}>
                    <ActivityIndicator 
                        style={{marginTop:verticalScale(25)}}
                        color="white"
                        size="large"
                    />
                </View> 
            }
            <View style={{flexDirection:'row',justifyContent:'space-between',width:horizontalScale(240),paddingTop:verticalScale(5)}}>
                <View style={{marginLeft:horizontalScale(10)}}>
                    <Text style={{fontSize:24,color:'black',fontFamily:'Impact-Stone'}}>{data?.title}</Text>
                    {propertys.map((item,index)=>
                        <PropertyText key={index} item={item}/>
                    )}
                    <Text style={{fontSize:20,color:'black',fontFamily:'Impact-Stone'}}>{data?.price}₺</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        marginTop:verticalScale(10),
        flexDirection:'row',
    },
    image:{
        width:horizontalScale(75),
        height:verticalScale(74),
        borderRadius:15,
        marginBottom:verticalScale(15)
    },
})

export default OrderItem;