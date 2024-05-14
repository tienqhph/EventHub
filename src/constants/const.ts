import { Dimensions } from "react-native"

export  const image  = {
    image_background :require('./../assets/images/splash-screen.png') , 
    image_logo :require('./../assets/images/logo.png') , 
    image_txtlogo :require('./../assets/images/txtlogo.png')
}


export  const appInfor = {
    sizes :{
        WIDTH:Dimensions.get('window').width , 
        HEIGHT :Dimensions.get('window').height
    }
}