from django.db import models
from pins.models import Pin


class Picture(models.Model):
    pin = models.ForeignKey(Pin, related_name='pictures', on_delete=models.CASCADE,)
    image = models.ImageField()
