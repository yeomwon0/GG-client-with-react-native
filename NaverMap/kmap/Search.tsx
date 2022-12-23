import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function Search({webviewRef}:any)
{
    const [list, setList]:any = useState([]);
    const [text, setText]:any = useState('');
    const getData = [
        {
            id : 1,
            title : 'w1',
            name : '도서관',
            lat : 36.338143058852765,
            lng : 127.44642599075736,
        },
        {
            id : 2,
            title : 'w2',
            name : '체육관',
            lat : 36.33583656833585,
            lng : 127.4432607028643,
        },
        {
            id : 3,
            title : 'w3',
            name : '우송예술회관',
            lat : 36.33639788119645,
            lng : 127.44619883453733,
        }
    ]
    const alist = new Array();
    const searchlist = new Array();
    const fuckingmessage = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
        // const getData = data
        
        for(let i of getData)
        {   
        const data = {
            id : i.id,
            title : i.title,
        }
        alist.push(data);
        }        
        setList(alist);
    })};

    const changetext = (temp:string) => {
        setText(temp)
        keywordSearch(temp);
    }

    const keywordSearch = (temp:string) => {
        for(let i of getData){
            if(i.name.includes(temp))
            {
                const data = {
                    id : i.id,
                    title : i.title,
                }
                searchlist.push(data)
            }
        }
        setList(searchlist);
    }

    const sendlatlng = async (temp:any) => {
        const latlng = new Array();
        
        for(let i of getData){
            if(temp.id === i.id)
            {                
                const data = {
                    picket : 'location'
                }
                latlng.push(data)
                latlng.push(i)
            }
        }
        const sendData = JSON.stringify(latlng);
        await webviewRef.current.postMessage(sendData);
      };

    useEffect(() => {
        fuckingmessage();
      }, []);
    
    return(
        <AutocompleteDropdown
            containerStyle = {style.container}
            suggestionsListContainerStyle = {style.liststyle}
            inputContainerStyle = {style.input}
            suggestionsListTextStyle = {style.text}
            textInputProps ={{
                placeholder: '학과명이나 건물정보를 입력해주세요',
            }}
            ChevronIconComponent={<Icon name="cloudy" size={30} color="red" />}
            emptyResultText="성호형 대머리"
            showChevron = {true}
            closeOnBlur={true}
            closeOnSubmit={true}
            clearOnFocus={true}
            useFilter={false}
            onChangeText={text => changetext(text)}
            onSelectItem = {item => sendlatlng(item)}
            onSubmit={() => {console.log(text)}}
            dataSet={list}
        />
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute', 
        top: 50,
        alignSelf: 'center',
        width: '80%',
        height: 40,
        borderWidth: 4,
        borderRadius: 10,
        textAlign : "center",
        fontSize : 5,
        fontWeight: "bold"
    },
    input:{
        height:30,
    },
    liststyle: {
        alignSelf: 'center',
        backgroundColor: 'lightcyan',
        opacity: 0.5,
        borderWidth: 2,
    },
    text: {
        textAlign:'center',
    }
})

export default Search;