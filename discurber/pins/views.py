import django_filters
from rest_framework import generics
from rest_framework import permissions
from pins.models import Pin, Picture, Category
from pins.serializers import PinSerializer, PictureSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.db import transaction


class PinFilter(django_filters.FilterSet):

    categories = django_filters.CharFilter(field_name='categories__name', lookup_expr='icontains')
    description = django_filters.CharFilter(field_name='description', lookup_expr='icontains')

    class Meta:
        model = Pin
        fields = []


class PinList(generics.ListCreateAPIView):
    """
    List all pins, or create a new pins.
    """
    queryset = Pin.objects.all()
    serializer_class = PinSerializer
    filter_class = PinFilter

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
        }

    def create(self, request, *args, **kwargs):
        form_data  = request.data
        pictures = form_data.getlist('pictures')
        categories = form_data.getlist('categories')
        pin_data = PinSerializer(data=form_data)
        picture_serializers = [PictureSerializer(data={'image': pic}) for pic in pictures]
        valid_pictures = all(picture_serializer.is_valid() for picture_serializer in picture_serializers)
        if pin_data.is_valid() and valid_pictures:
            with transaction.atomic():
                user = User.objects.get(id=1)
                categories_to_add = Category.objects.filter(name__in=categories)
                new_pin = Pin(author=user, **pin_data.validated_data)
                new_pin.save()
                new_pin.categories.add(*categories_to_add)
                for picture in picture_serializers:
                    new_pic = Picture(pin=new_pin, **picture.validated_data)
                    new_pic.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

