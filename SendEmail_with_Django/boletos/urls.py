from django.urls import path
from .views import process_csv
from django.conf import settings
from django.conf.urls.static import static

#url da aplicacao
urlpatterns = [
    path('upload/', process_csv, name='process_csv'),
] 

