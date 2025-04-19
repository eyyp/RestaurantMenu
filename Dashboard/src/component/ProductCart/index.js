import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { horizontalScale, verticalScale } from "../../config";
import { useEffect , useState} from "react";
import { Find } from "../../services/methods/category";

const ProductCart = (props)=>{

    const [categoryTitle,setCategoryTitle] = useState("");

    useEffect(()=>{
        Find(props.item.category_id, (err,data)=>{
            if(data){
                setCategoryTitle(data.data.title);
            }
        })
    })

    return(
        <View style={styles.container}>

            <View style={styles.topRow}>
                <Text>{props.item.title}</Text>
                <Text>{props.item.exp}</Text>
                <Text>{props.item.price}</Text>
                <Text>{categoryTitle}</Text>
                <Text>{props.item.summary}</Text>
                <Text>{props.item.video_url}</Text>
                
            </View>
            <TouchableOpacity style={styles.activeButton} onPress={()=>props.delete()}>
                <Text style={styles.activeText}>Ürünü Sil</Text>
            </TouchableOpacity>
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

export default ProductCart;