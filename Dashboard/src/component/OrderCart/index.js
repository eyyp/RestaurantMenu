import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { horizontalScale, verticalScale } from "../../config";
import OrderProductCart from "../OrderProductCart";
import { FindItem } from "../../services/methods/order";
import { Find } from "../../services/methods/table";
import { useEffect , useState} from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ChangeDelivery } from "../../services/methods/order";
const OrderCart = (props)=>{

    const[data,setData] = useState();
    const[title,setTitle] = useState("");
    const[delivery,setDelivery] = useState();

    useEffect(()=>{
        setDelivery(props.item.delivery)
        FindItem(props.item.order_id,(error,data)=>{
            if(data){
                setData(data.data)
            }
        })
        Find(props.item.table_id,(error,data)=>{
            if(data){
                setTitle(data.data.title)
            }
        })
    },[])

    const ChangeDeliveryRequest = (order_id,delivery) =>{
        ChangeDelivery(order_id,delivery,(err,data)=>{
            if(data){
                if(delivery == "order"){
                    setDelivery("complated");
                }
                else{
                    setDelivery("order");
                }
            }
        })
    }

    return(
        <View style={styles.container}>

            <View style={styles.topRow}>
                <Text>{title}</Text>
                <TouchableOpacity onPress={()=>props.delete()}>
                    <Text>Siparişi Sil</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Sipariş Bilgileri</Text>
            <ScrollView>
                {data != null && data.map((item,index)=>
                    <OrderProductCart item={item} key={index}/>)
                }
            </ScrollView>
            {delivery == "order" ?
                <TouchableOpacity style={styles.activeButton} onPress={()=>ChangeDeliveryRequest(props.item.order_id,"order")}>
                    <Text style={styles.activeText}>Teslim edildi yap</Text>
                </TouchableOpacity>
                :<TouchableOpacity style={styles.activeButton} onPress={()=>ChangeDeliveryRequest(props.item.order_id,"complated")}>
                    <Text style={styles.nonActiveText}>Teslim edilmedi yap</Text>
                </TouchableOpacity>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:horizontalScale(320),
        paddingVertical:verticalScale(20),
        backgroundColor:'white',
        alignSelf:'center',
        marginVertical:verticalScale(20)
    },
    topRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:verticalScale(20),
        marginHorizontal: horizontalScale(20)
    },
    title:{
        marginLeft: horizontalScale(100),
        fontSize: 16,
        color:'black'
    },
    activeButton:{
        backgroundColor:'black',
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        height:verticalScale(50),
        width:horizontalScale(100),
        alignSelf:'center',
        marginVertical:verticalScale(10)
    },
    activeText:{
        color:'white',
        fontSize:16
    },
    nonActiveButton:{
        color:'black',
        fontSize:16
    },
    nonActiveText:{
        backgroundColor:'white',
        borderColor:'black',
        borderWidth:2,
        borderRadius:4,
        paddingHorizontal:horizontalScale(15),
        paddingVertical:verticalScale(15),
        height:verticalScale(45),
        width:horizontalScale(100),
        alignSelf:'center'
    }
})

export default OrderCart;