import { useEffect, useState } from "react";
import { Alert, Dimensions, SectionList } from "react-native";
import WebView from "react-native-webview";
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service'

function KMap({webviewRef}:any) {
    const html = `
  <!DOCTYPE html>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style type="text/css">
    html, body {width:100%;height:100%;margin:0;padding:0;} 
  </style>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
      <title>지도 생성하기</title>
  </head>
  <body>
    <div id="map" style="width:100%; height:100%; "></div>
    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=5062efd19b7a53b5ded087c3ff4ba608&libraries=services"></script>
    <script>
      
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
        center: new kakao.maps.LatLng( 36.33705543447485, 127.44507203436675), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };
    
    var map = new kakao.maps.Map(mapContainer, mapOption);

    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    
    var arr1 = {}
    var state = false
    
    document.addEventListener("message", (e) => {
        var latlng = JSON.parse(e.data)
        if(latlng[0].picket == "marker")
        {
          for(var i = 1; i < latlng.length; i++)
          {
            mark(latlng[i].name, latlng[i].lat, latlng[i].lng)
          }
        }
        else
        {
          if(state == false)
          {
            gps(latlng[1].lat, latlng[1].lng)
            state = true
          }
          else
          {
            gps.setPosition(latlng[1].lat, latlng[1].lng);
          }
        }
    })

    function mark(name, lat, lng)
    {
      var markerPosition = new kakao.maps.LatLng(lat, lng);
      var marker = new kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);
      kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, name));
      arr1[name] = marker
    }

    function gps(lat, lng)
    {
      var markerPosition = new kakao.maps.LatLng(lat, lng);
      var gps = new kakao.maps.Marker({ position: markerPosition });
      gps.setMap(map);
    }
    
  function makeOverListener(map, marker, name) {
    let _infowindow = new kakao.maps.InfoWindow({
      content : name,
      removable : true,
      
    })
      return function() {
            _infowindow.open(map, marker);
        }
    }
  </script>
  </body>
  </html>
  `;

  /** 웹뷰 ref */
  const handleSetRef = (_ref:any) => {
    webviewRef.current = _ref;
  };

  //웹뷰에서 rn으로 값을 보낼때 함수
  const handleOnMessage = (e:any) => {
    // postMessage 담겨있는 결과 값이 웹뷰에서 값을 출력
    console.log('콘솔', e.nativeEvent.data);
    Alert.alert(e.nativeEvent.data);
  };
//1231312
const sendMessage = async () => {
  let getData:any;

  await fetch("https://00c6-2001-2d8-6967-3f1f-cd12-6489-e095-b1f9.jp.ngrok.io/ggmap")
  .then((response) => response.json())
  .then((data) => {
   getData = data
  });
  const list = new Array();

  list.push({
    picket : 'marker',
  },)

  for(let temp of getData)
  {
    const data = {
      name : temp.name,
      lat : temp.latitude,
      lng : temp.longtitude,
    }

    list.push(data);
  }
  console.log(list);
  
  const sendData = JSON.stringify(
   list
  );
  await webviewRef.current.postMessage(sendData);
};

const send = async (latitude:any, longitude:any) => {
  const sendLoction = JSON.stringify([
    {
      picket : 'me',
    },
    {
      lat : latitude,
      lng : longitude,
    }
  ]);
  await webviewRef.current.postMessage(sendLoction);
}

  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
    sendMessage();
  }, []);

  useEffect(() => {
    const _watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        send(latitude, longitude);
        console.log(latitude);
        console.log(longitude);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
    return () => {
      if (_watchId) {
        Geolocation.clearWatch(_watchId);
      }
    };
  })

function sleep(ms:number) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

return(
    <WebView onMessage={handleOnMessage} source={{html}} ref={handleSetRef} />
  )
}

export default KMap;