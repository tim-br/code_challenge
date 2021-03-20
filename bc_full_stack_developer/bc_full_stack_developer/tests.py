from django.http import QueryDict
from django.test import Client, TestCase
from django.urls import reverse
from .models import ApiRequest

class HealthServiceAreaTestCase(TestCase):

    def test_valid_url(self):
        query_dictionary = QueryDict('', mutable=True)
        query_dictionary.update({'longitude': '-123.3646335', 'latitude': '48.4251378'})
        url = '{base_url}?{querystring}'.format(
            base_url=reverse('healthservicearea'),
            querystring=query_dictionary.urlencode()
        )
        self.assertEqual(url, "/healthservicearea/?longitude=-123.3646335&latitude=48.4251378")
        #self.assertEqual(response.status_code, 200)
    
    def test_can_request_health_unit_from_api(self):
        c = Client()
        response = c.get('/healthservicearea/', {'longitude': '-123.3646335', 'latitude': '48.4251378'})
        self.assertEqual(response.status_code, 200)
