from django.conf.urls import url

from apps.generator.views import *

urlpatterns = [
    url(r'main/$', mainTemplateView.as_view(), name="main"),
]
