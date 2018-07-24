from django.db import models
from django.conf import settings


class Pin(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    created = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=255)
    formatted_address = models.CharField(max_length=150)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
