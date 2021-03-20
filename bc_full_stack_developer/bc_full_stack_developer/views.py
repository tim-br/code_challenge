from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
from string import Template


@api_view()
def my_view(request):
    url = Template("https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pub%3AWHSE_ADMIN_BOUNDARIES.BCHA_CMNTY_HEALTH_SERV_AREA_SP&srsname=EPSG%3A4326&cql_filter=INTERSECTS(SHAPE%2CSRID%3D4326%3BPOINT($lon+$lat))&propertyName=CMNTY_HLTH_SERV_AREA_CODE%2CCMNTY_HLTH_SERV_AREA_NAME&outputFormat=application%2Fjson")
    longitude = request.query_params.get('longitude')
    latitude= request.query_params.get('latitude')
    final_url = url.substitute({'lon': longitude, 'lat': latitude})
    response = requests.get(final_url)
    return Response(data=response.json())