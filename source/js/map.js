ymaps.ready(function() {
  var myMap = new ymaps.Map('map', {
      center: [59.938560, 30.322927],
      zoom: 15.5,
      controls: ['fullscreenControl', 'zoomControl']
    }, {
      searchControlProvider: 'yandex#search'
    }),

    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {

    }, {
      iconLayout: 'default#image',
      iconImageHref: '',
      iconImageSize: [80, 104],
      iconImageOffset: [-30, -68]
    }),

    myPlacemarkWithContent = new ymaps.Placemark([59.938560, 30.322927], {

    }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: '../img/optimized/map-pin.png',
      iconImageSize: [62, 53],
      iconImageOffset: [-30, -50],
      iconContentOffset: [0, 0],
      iconContentLayout: MyIconContentLayout
    })

  myMap.behaviors.disable('scrollZoom')
  myMap.geoObjects
    .add(myPlacemark)
    .add(myPlacemarkWithContent)
})
