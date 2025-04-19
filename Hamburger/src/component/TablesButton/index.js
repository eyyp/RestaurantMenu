import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { horizontalScale, verticalScale } from "../../config";

const TablesButton = (props) =>{
    return(
        <TouchableOpacity style={styles.button} onPress={()=>props.onPress()}>
            <Image 
                style={{width:horizontalScale(130), height:verticalScale(140),position:'absolute'}}
                source={require("../../assets/images/border.png")}
            />
            <Text style={styles.text} >{props.item.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        width: horizontalScale(150),
        height: verticalScale(150),
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:horizontalScale(20),
        marginTop:verticalScale(20)
    },
    text:{
        color:'white',
        fontSize:18,
        fontWeight:'600',
        fontFamily:'zai_SeagullFelt-tipPen'
    }
})

export default TablesButton;