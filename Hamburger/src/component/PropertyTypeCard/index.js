import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { useEffect, useState} from "react";
import { Product } from "../../services/methods/property";
import { horizontalScale, verticalScale } from "../../config";

const PropertyTypeCard = (props) =>{

    const [data,setData] = useState([]);
    const [propertys,setPropertys] = useState([]);

    useEffect(()=>{
        Product(props.product_id,props.item.product_property_type_id,(err,data)=>{
            if(data){
                setData(data.data);
            }
        })
        props.setCount(props.count + 1);
    },[])

    const AddProperty = (property_id) =>{
        if(propertys.some(arrayItem => arrayItem.property_id === property_id)){
            const newArray = propertys.filter(item => item.property_id !== property_id);
            setPropertys(newArray);
            props.setPropertys(newArray);
        }
        else{
            setPropertys(prevData => [...prevData,{property_id}]);
            props.setPropertys(property_id);
        }
    }

    if(data.length > 0){
        return(
            <View style={{minHeight:verticalScale(150),width:horizontalScale(140),marginLeft:horizontalScale(10)}}>
                <Image 
                    style={{width:'100%',height:'100%',position:'absolute'}}
                    source={require('../../assets/images/border.png')}
                />
                <Text style={{fontSize:18,color:"white",marginTop:verticalScale(10),marginHorizontal:horizontalScale(10),fontFamily:'CoalhandLuke TRIAL'}}>{props.item.title}</Text>
                {data.map((item,index)=>
                    <TouchableOpacity key={index} style={{flexDirection:'row',alignItems:'center',marginHorizontal:horizontalScale(15)}} onPress={()=>AddProperty(item.property_id)}>
                        {propertys.some(arrayItem => arrayItem.property_id === item.property_id) ?
                            <Image 
                                style={{width:horizontalScale(16),height:verticalScale(20)}}
                                source={require("../../assets/images/check.png")}
                            />
                            :<Image 
                                style={{width:horizontalScale(15.1),height:verticalScale(17.5)}}
                                source={require("../../assets/images/noncheck.png")}
                            />
                        }
                        <Text style={{marginLeft:horizontalScale(5),marginTop:verticalScale(5),fontSize:18,color:"white",fontFamily:'CoalhandLuke TRIAL'}}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                {props.check && propertys.length === 0 &&
                    <Text style={{marginLeft:horizontalScale(5),marginBottom:verticalScale(5),fontSize:14,fontWeight:'400',color:"red"}}>Lütfen  önce bir özellik seç</Text>
                }   
            </View>
        )
    }
    else{
        return(<></>)
    }
}

const styles = StyleSheet.create({
    propertyButton:{
        backgroundColor:'blue',
        width: horizontalScale(60),
        height:verticalScale(30),
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default PropertyTypeCard;