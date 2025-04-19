import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { horizontalScale, verticalScale } from "../../config";

const TablesButton = (props) =>{
    return(
        <TouchableOpacity style={styles.button} onPress={()=>props.onPress()}>
            <Text style={styles.text} >{props.item.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        width: horizontalScale(150),
        height: verticalScale(150),
        borderRadius:15,
        borderColor:'black',
        borderWidth:2,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:horizontalScale(20),
        marginTop:verticalScale(20)
    },
    text:{
        color:'black',
        fontSize:30,
        fontFamily:'Impact-Stone'
    }
})

export default TablesButton;