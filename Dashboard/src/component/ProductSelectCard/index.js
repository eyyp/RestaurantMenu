import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { horizontalScale, verticalScale } from "../../config";
import { All } from "../../services/methods/product";

const ProductSelectCard = (props) => {

    const [products,setProducts] = useState([]);
    const [selectProductTitle,setSelectProductTitle] = useState();
    const [visible,setVisible] = useState(false);

    const userReducer = useSelector(state=>state.UserCheck);
    const {userCheck, userStatus} = userReducer;

    useEffect(()=>{
        All(userCheck.restaurant_id,(err,data)=>{
            if(data){
                setProducts(data.data)
            }
        })
    },[])

    return(
        <View>
            <TouchableOpacity style={styles.tabButton} onPress={()=>setVisible(!visible)} >
                <Text style={styles.buttonText}>{selectProductTitle === undefined ? "Ürün Seç": selectProductTitle}</Text>
            </TouchableOpacity>
            {visible && 
                <View>
                    {products.map((item,index)=>
                        <TouchableOpacity key={index} style={styles.propertyTypeButton} onPress={()=>{setVisible(false);setSelectProductTitle(item.title);props.setProduct(item.product_id)}}>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    textField: {
        marginBottom: verticalScale(20),
    },
    tabButton:{
        backgroundColor:'#baf8ff',
        borderColor:'black',
        borderRadius:4,
        paddingVertical:verticalScale(15),
        paddingHorizontal:horizontalScale(15),
        marginVertical:verticalScale(15),
        flexDirection:'row'
    },
    propertyTypeButton:{
        backgroundColor:'#baf8ff',
        borderColor:'black',
        borderRadius:4,
        paddingVertical:verticalScale(5),
        paddingHorizontal:horizontalScale(5),
        marginVertical:verticalScale(5)
    },
    title:{
        fontSize:16,
        color:'black'
    },
    buttonText:{
        marginRight:horizontalScale(5)
    }
})

export default ProductSelectCard;