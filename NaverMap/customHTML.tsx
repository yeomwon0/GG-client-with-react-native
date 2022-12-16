export default (script:any) => `
<!DOCTYPE html>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<style type="text/css">
html, body { width: 99%; height: 98%; }
</style>
<html>
<head>
    <meta charset="utf-8">
    <title>지도 생성하기</title>
</head>
<body>
<div id="map" style="width:100%; height:100%; "></div>
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=5062efd19b7a53b5ded087c3ff4ba608&libraries=services"></script>
<script>
    var mapContainer = document.getElementById('map'), mapOption = { center: new kakao.maps.LatLng(36.299819532752423, 127.33358672933439), level: 4 };
	var map = new kakao.maps.Map(mapContainer, mapOption);

	function moveTo(lat, lng) {
	    var loc = new kakao.maps.LatLng(lat, lng);
	    map.setCenter(loc);
	}

	function panTo(lat, lng) {
	    var loc = new kakao.maps.LatLng(lat, lng);
	    map.panTo(loc);
	}

	function zoomIn()
	{
		var level = map.getLevel();
		map.setLevel(level-1);
	}

	function zoomOut()
	{
		var level = map.getLevel();
		map.setLevel(level+1);
	}

    var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    var marker = new kakao.maps.Marker({ position: markerPosition });
		function setCenter(lat, lng) {
            marker.setMap(null);
            var mp= new kakao.maps.LatLng(lat,lng);
            map.setCenter(mp);
            marker = new kakao.maps.Marker({ position: mp});
            marker.setMap(map);
	}

	//내가추가한 마커
    var position = new kakao.maps.LatLng(36.299819532752423, 127.33358672933439);
    var marker2 = new kakao.maps.Marker({ 
        position: position,
		 clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    }); 
	marker2.setMap(map);
    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
    var iwContent = '<div style="padding:5px;">우리집..... 존나 집가고 싶다!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable
	});
    kakao.maps.event.addListener(marker2, 'click', function () {
        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(map, marker2);
    });
	//////////////////////////////////////////////////////////


		function geo(address) {  // "송파구 가락동 10-1", "동남로 12길" 형태.
		var geocoder = new kakao.maps.services.Geocoder();
		geocoder.addressSearch(address, function(result, status)
				{
		     if (status === kakao.maps.services.Status.OK) {
		        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
		        var marker = new kakao.maps.Marker({ map: map, position: coords });
		        var infowindow = new kakao.maps.InfoWindow({
		            content: '<div style="width:150px;text-align:center;padding:6px 0;">여기!!</div>'
		        });
		        infowindow.open(map, marker);
		        map.setCenter(coords);
		    }
		});
  }

</script>
</body>
</html>
`