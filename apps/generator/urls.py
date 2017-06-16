from django.conf.urls import url

from apps.generator.views import *
from apps.generator.generator import *

urlpatterns = [
    url(r'^carga_archivos/$', generatorTemplateView.as_view(), name="carga_archivos"),
    url(r'^dowload/$', DowloadView.as_view(), name="dowload"),
]
