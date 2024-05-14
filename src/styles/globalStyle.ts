import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";




export const style = StyleSheet.create({
    container:{
        flex:1 , 
        backgroundColor:appColors.white
    } , 

    button :{
        flexDirection:'row' , 
        borderRadius:12 , 
        justifyContent:'center' , 
        alignItems:'center' , 
        paddingHorizontal:16 , paddingVertical:16 , 
        minHeight:56
    }
})