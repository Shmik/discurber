from django.db import models
from django.conf import settings
from pins.models import Category

class Pin(models.Model):

    class Meta:
        ordering = ['-created']

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    created = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=255)
    formatted_address = models.CharField(max_length=150)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    categories = models.ManyToManyField(Category, related_query_name='pins')

    def __str__(self):
        return 'Pin: {}, {}'.format(self.id, self.description)