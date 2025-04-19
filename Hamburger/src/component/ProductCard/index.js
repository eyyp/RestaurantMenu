import { View, TouchableOpacity, Text, Image, StyleSheet,ActivityIndicator} from "react-native";
import { useEffect, useState} from "react";
import { Find } from "../../services/methods/product";
import { GetImage } from "../../services/methods/product";
import { horizontalScale, verticalScale } from "../../config";
const ProductCard = (props) =>{

    const [data,setData] = useState();
    const [imageUri,setImageUri] = useState();

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
        <TouchableOpacity style={styles.button} onPress={()=>props.navigation()}>
            {imageUri ? 
                <Image 
                    style={styles.image}
                    source={{uri: `data:image/png;base64,${imageUri}`}}
                />
                :   <View style={{backgroundColor:'#FFF200',width:horizontalScale(100),height:verticalScale(146),borderRadius:999}}>
                        <ActivityIndicator 
                            style={{marginTop:verticalScale(50)}}
                            color="blue"
                            size="large"
                        />
                    </View> 
            }
            <View style={{marginTop:verticalScale(20),width:horizontalScale(182)}}>
                <View style={{alignItems:'center',width:horizontalScale(182)}}>
                    <Text style={{fontSize:30,fontFamily:'chawp',color:'white'}}>{data?.title}</Text>
                    <View style={{width:horizontalScale(150),height:verticalScale(3),backgroundColor:'white',borderRadius:15,marginBottom:verticalScale(10)}}></View>
                </View>
                <Text style={{fontSize:18,fontFamily:'CoalhandLuke TRIAL',textAlign:'center',color:'white'}}>{data?.exp}</Text>
                <Text style={{fontSize:20,fontFamily:'CoalhandLuke TRIAL',alignSelf:'flex-end',color:'white'}}>{data?.price}₺</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        marginBottom:verticalScale(10),
        width:horizontalScale(320),
        height:verticalScale(210),
        paddingHorizontal:horizontalScale(2),
        paddingVertical:verticalScale(3),
        marginLeft:horizontalScale(15),
        zIndex:1,
        position: 'relative',
        paddingBottom:verticalScale(15)
    },
    image:{
        width:horizontalScale(150),
        height:verticalScale(146),
        borderRadius:15,
        marginBottom:verticalScale(15),
    },

})

export default ProductCard;