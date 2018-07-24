from django.urls import path
from pins.views import PinList

urlpatterns = [
    path('', PinList.as_view(), name='pin_list'),
]
