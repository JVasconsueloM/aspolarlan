from datetime import date, datetime
from django.forms.utils import ErrorDict
from django import template
from django import forms
from django.forms.forms import NON_FIELD_ERRORS

__author__ = 'polar'
register = template.Library()

@register.filter
def addAttr(field, valor):
    """ Pasar en el parametro 'valor' el atributo HTML a ser modificado y/o agregado
     separando con '/' del valor que se le desea asignar"""
    valor = valor.split('/')
    return field.as_widget(attrs={valor[0]: valor[1]})


@register.filter
def addAttrs(field, valor):
    """ Pasar en el parametro 'valor' el atributo HTML a ser modificado y/o agregado
     separando con '/' del valor que se le desea asignar"""
    data = {}
    attrs = valor.split(',')
    for attr in attrs:
        val = attr.split('/')
        data[val[0]] = val[1]
    return field.as_widget(attrs=data)


@register.filter
def nice_errors(form, non_field_msg='General form errors'):
    nice_errors = ErrorDict()

    if isinstance(form, forms.BaseForm):
        for field, errors in form.errors.items():
            if field == NON_FIELD_ERRORS:
                key = non_field_msg

            else:
                key = form.fields[field].label
            nice_errors[key] = errors

    return nice_errors

@register.filter
def decimalformat(value):
    value = value.normalize()
    return value

@register.filter(expects_localtime=True, is_safe=False)
def format_date(fecha):
    """ Formatea fechas """

    if type(fecha) == date:
        return "{:%d/%m/%Y}".format(fecha)

    elif type(fecha) == datetime:
        return "{:%d/%m/%Y %H:%M}".format(fecha)

    else:
        return ''