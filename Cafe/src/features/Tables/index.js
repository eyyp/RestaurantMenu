import { View, Text ,ScrollView, StyleSheet, FlatList, Image} from "react-native";
import { All } from "../../services/methods/tables";
import TablesButton from "../../component/TablesButton";
import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { TableSelect } from "../../store/actions/tables/table_id";
import { horizontalScale, verticalScale } from "../../config";

const Tables = (props) =>{

    const[data,setData] = useState([]);

    const userReducer = useSelector(state=>state.UserCheck);
    const {userCheck, userStatus} = userReducer;

    const dispatch = useDispatch();

    useEffect(()=>{
        All(userCheck.restaurant_id,(err,data)=>{
            if(data){
                setData(data.data)
            }
        })
    },[])

    const TableSelectRequest = (table_id) =>{
        dispatch(TableSelect(table_id));
        props.navigation.navigate("Home")
    }

    const renderItem = ({item}) =>{
       return <TablesButton item={item} onPress={()=>TableSelectRequest(item.table_id)} />;
    }

    return(
        <View style={styles.body}>
            <Text style={{fontSize:35,color:'black',fontFamily:'Impact-Stone',alignSelf:'center',marginTop:verticalScale(20),zIndex:2}}>MASA SEÇİNİZ</Text>
            <Image 
                style={{width:horizontalScale(390),height:verticalScale(1200),alignSelf:'center',position:'absolute',zIndex:0}}
                source={require('../../assets/images/paper.png')}
            />
            <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={(item)=>item.table_id.toString()}
                numColumns={2}
                contentContainerStyle={{paddingLeft:horizontalScale(10)}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        backgroundColor:'white',
        flex:1
    }
})

export default Tables;