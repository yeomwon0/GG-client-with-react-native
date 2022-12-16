import { useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";

const HEIGHT = Dimensions.get('window').height;

function Bori(){
    const [state, setState] = useState(false);

    const onPress = () => {
        setState(current => !current);
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