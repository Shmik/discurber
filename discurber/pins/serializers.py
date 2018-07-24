from rest_framework import serializers
from pins.models import Pin, Picture


class PinSerializer(serializers.ModelSerializer):
    pictures = serializers.SerializerMethodField()

    class Meta:
        model = Pin
        fields = ('id', 'created', 'description', 'formatted_address', 'lat', 'lng', 'pictures')

    def get_pictures(self, obj):
        request = self.context.get('request')
        picture_urls = []
        for pic in obj.pictures.all():
            picture_urls.append(request.build_absolute_uri(pic.image.url))
        return picture_urls

class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ('image',)
