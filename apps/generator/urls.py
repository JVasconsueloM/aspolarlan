from django.conf.urls import url

from apps.generator.views import *

urlpatterns = [
    url(r'^carga_archivos/$', generatorTemplateView.as_view(), name="carga_archivos"),
]
