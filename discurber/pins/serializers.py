from django.utils import timezone
from rest_framework import serializers
from pins.models import Pin, Picture, Category

class PinSerializer(serializers.ModelSerializer):
    pictures = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()
    time_since_created = serializers.SerializerMethodField()

    class Meta:
        model = Pin
        fields = (
            'id',
            'time_since_created',
            'description',
            'formatted_address',
            'suburb',
            'state',
            'postcode',
            'lat',
            'lng',
            'pictures',
            'categories',
            )

    def get_time_since_created(self, obj):
        now = timezone.now()
        time_diff = now - obj.created

        if time_diff.days == 0:
            if time_diff.seconds < 3600:
                if 60 < time_diff.seconds < 120:
                    return '1 minute'
                else:
                    return '{} minutes'.format(time_diff.seconds // 60)
            elif 3600 <= time_diff.seconds < 7200:
                return '1 hour'
            else:
                return '{} hours'.format(time_diff.seconds // 3600)
        elif time_diff.days == 1:
            return '1 day'
        else:
            return '{} days'.format(time_diff.days)

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

