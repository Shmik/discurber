from rest_framework import serializers
from pins.models import Pin, Picture, Category


class PinSerializer(serializers.ModelSerializer):
    pictures = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()

    class Meta:
        model = Pin
        fields = ('id', 'created', 'description', 'formatted_address', 'lat', 'lng', 'pictures', 'categories')

    def get_pictures(self, obj):
        request = self.context.get('request')
        picture_urls = []
        for pic in obj.pictures.all():
            picture_urls.append(request.build_absolute_uri(pic.image.url))
        return picture_urls

    def get_categories(self, obj):
        return [category.name for category in obj.categories.all()]

class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ('image',)

