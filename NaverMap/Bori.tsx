import { useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function Bori({webviewRef}:any){
    const sendMessage = () => {
        const sendData = JSON.stringify([
        {
            name: 'w1',
            lat: 36.3330648,
            lng: 127.4139117,
        },
        {
            name: 'w2',
            lat: 36.300378,
            lng: 127.333443
        }
    ]);
        webviewRef.current.postMessage(sendData);
      };
    
      const [state, setState] = useState(false);
      const onPress = () => {
        setState(current => !current);
        sendMessage();
        console.log(state);
      };
    
    return(
        <>
            {state ? (
                <View style={{position: 'absolute', top: HEIGHT - 200, right: 30}}>
                <TouchableOpacity onPress={onPress}>
                    <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        overflow: 'visible',
                        borderWidth: 3,
                    }}
                    source={{
                        uri: 'https://wsggbucket.s3.ap-northeast-2.amazonaws.com/bori2.jpg',
                    }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                    <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        overflow: 'visible',
                        borderWidth: 3,
                    }}
                    source={{
                        uri: 'https://wsggbucket.s3.ap-northeast-2.amazonaws.com/bori3.png',
                    }}
                    />
                </TouchableOpacity>
                </View>
            ) : null}
            <View style={{position: 'absolute', top: HEIGHT - 100, right: 30}}>
                <TouchableOpacity onPress={onPress}>
                <Image
                    style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    overflow: 'visible',
                    borderWidth: 3,
                    }}
                    source={{
                    uri: 'https://wsggbucket.s3.ap-northeast-2.amazonaws.com/bori.jpg',
                    }}
                />
                </TouchableOpacity>
            </View>
        </>
    )
        
    
}

export default Bori;