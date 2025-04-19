import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { horizontalScale, verticalScale } from "../../config";
import { All } from "../../services/methods/category";

const CategorySelectCard = (props) => {

    const [categorys,setCategorys] = useState([]);
    const [selectCategory,setSelectCategory] = useState();
    const [selectCategoryTitle,setSelectCategoryTitle] = useState();
    const [visible,setVisible] = useState(false);

    const userReducer = useSelector(state=>state.UserCheck);
    const {userCheck, userStatus} = userReducer;

    useEffect(()=>{
        All(userCheck.restaurant_id,(err,data)=>{
            if(data){
                setCategorys(data.data);
            }
        })
    },[])

    return(
        <View>
            <TouchableOpacity style={styles.tabButton} onPress={()=>setVisible(!visible)} >
                <Text style={styles.buttonText}>{selectCategoryTitle === undefined ? "Kategori Seç": selectCategoryTitle}</Text>
            </TouchableOpacity>
            {visible && 
                <View>
                    {categorys.map((item,index)=>
                        <TouchableOpacity key={index} style={styles.propertyTypeButton} onPress={()=>{setVisible(false);setSelectCategoryTitle(item.title);props.setCategory(item.category_id)}}>
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

export default CategorySelectCard;