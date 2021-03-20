from django.db import models

class ApiRequest(models.Model):
    lat = models.DecimalField(max_digits=20, decimal_places=15)
    lon = models.DecimalField(max_digits=20, decimal_places=15)
    ip_address = models.GenericIPAddressField()
    date = models.DateTimeField('date of request')