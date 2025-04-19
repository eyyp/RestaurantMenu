import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import TextField from "../TextField";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { horizontalScale, verticalScale } from "../../config";
import { TypeAll } from "../../services/methods/property";

const PropertyAddCart = (props) => {

    const [title,setTitle] = useState();
    const [titleError,setTitleError] = useState();
    const [selectProperty,setSelectProperty] = useState();
    const [selectPropertyError,setSelectPropertyError] = useState();
    const [addPropertys,setAddPropertys] = useState([]);
    const [propertys,setPropertys] = useState([]);
    const [visible,setVisible] = useState(false);

    const userReducer = useSelector(state=>state.UserCheck);
    const {userCheck, userStatus} = userReducer;

    useEffect(()=>{
        TypeAll(userCheck.restaurant_id,(err,data)=>{
            if(data.data){
                console.log(data.data)
                setPropertys(data.data)
            }
        })
    },[])

    const AddPropertys = () =>{
        if(title === "" || title === null || title === undefined){
            setTitleError("Lütfen bu alanı doldurun");
        }
        else{
            if(selectProperty === null || selectProperty === "" || selectProperty === undefined){
                setSelectPropertyError("Lütfen bir tip seçin")
            }
            else{
                setTitleError(null);
                setTitle("");
                setSelectProperty(null);
                setSelectPropertyError(null);
                setAddPropertys(prevData => [...prevData,{title,product_property_type_id:selectProperty}])
                props.setPropertys(prevData => [...prevData,{title,product_property_type_id:selectProperty}]);
            }
        }
    }

    return(
        <View>
            <TouchableOpacity style={styles.tabButton} onPress={()=>setVisible(!visible)} >
                {addPropertys.length > 0 ?
                    addPropertys.map((item,index)=><Text key={index} style={styles.buttonText}>{item.title}</Text>) 
                    :<Text style={styles.buttonText}>Özellik ekle</Text>
                }
            </TouchableOpacity>
            {visible && 
                <View>
                    <TextField
                        style={styles.textField}
                        value={title}
                        label="Özellik İsmi"
                        errorText={titleError}
                        onChangeText={(text) => setTitle(text)}
                    />
                    <Text style={styles.title}>Özellik Tipi</Text>
                    {propertys.map((item,index)=>
                        <TouchableOpacity key={index} style={[styles.propertyTypeButton,{backgroundColor: selectProperty === item.product_property_type_id ? '#abff85':'#85daff'}]} onPress={()=>setSelectProperty(item.product_property_type_id)}>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    {selectProperty && <Text style={styles.title}>Özellik Tipi</Text>}
                    <TouchableOpacity style={styles.tabButton} onPress={()=>AddPropertys()}>
                        <Text>Ekle</Text>
                    </TouchableOpacity>
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

export default PropertyAddCart;