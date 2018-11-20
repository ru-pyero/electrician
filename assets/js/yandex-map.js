window.onload = function () {
  var zoom = 12;
  var center = [55.74657022175869, 52.39119223204577];
  var marker_position = [55.747925771312495, 52.39599875060047];
  var drag = true;

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  if (isMobile.any()) {
    zoom = 13;
    center = [55.747925771312495, 52.3918788775536];
    marker_position = [55.748603528352774, 52.39428213683096];
    drag = false;
  }

  initMap(zoom, center, marker_position, drag);
}

function initMap(zoom, center, marker_position, drag) {

  ymaps.ready(function () {
    var map = new ymaps.Map("map", {
      center: center,
      zoom: zoom
    })

    var place = new ymaps.Placemark(
      marker_position, {
        hintContent: 'Electrician template',
        balloonContent: '<h4><span style="font-weight:bold;font-size:20px;color:#0097cd;">Electrician template</span></h4><b>Адрес:</b> Республика Татарстан, г. Набережные Челны<br><b>Телефоны:</b> сотовый: +7 (917) 123-45-67<br><b>Е-mail:</b> electrician@mail.ru'
      }, {
        iconImageHref: 'http://design-aura.ru/templates/electrician/assets/images/locator.png',
        iconImageSize: [100, 100],
        iconImageOffset: [-50, -83],
        iconLayout: 'default#image',
        balloonShadow: true
      }
    );

    place.options.set('visible', true);
    map.geoObjects.add(place);
    map.behaviors.disable('scrollZoom');
    if (!drag) {
      map.behaviors.disable('drag');
    }

    place.events.add('click', function (e) {
      e.get('target').options.set({
        iconImageHref: 'http://design-aura.ru/templates/electrician/assets/images/locator.png'
      });
    });
  });
}