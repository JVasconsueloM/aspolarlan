from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class generatorTemplateView(TemplateView):
    template_name = "generator/main.html"

class mainTemplateView(TemplateView):
    template_name = "main.html"