from pins.models import Pin, Picture
from pins.serializers import PinSerializer, PictureSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.db import transaction

class PinList(APIView):
    """
    List all pins, or create a new pins.
    """
    def get(self, request, format=None):
        pins = Pin.objects.all()
        serializer = PinSerializer(pins, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        form_data  = request.data
        pictures = form_data.getlist('pictures')
        pin_data = PinSerializer(data=form_data)
        picture_serializers = [PictureSerializer(data={'image': pic}) for pic in pictures]
        valid_pictures = all(picture_serializer.is_valid() for picture_serializer in picture_serializers)
        if pin_data.is_valid() and valid_pictures:
            with transaction.atomic():
                user = User.objects.get(id=1)
                new_pin = Pin(author=user, **pin_data.validated_data)
                new_pin.save()
                for picture in picture_serializers:
                    new_pic = Picture(pin=new_pin, **picture.validated_data)
                    new_pic.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

