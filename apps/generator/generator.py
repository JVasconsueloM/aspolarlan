import os
import shutil
from django.conf import settings
from django.views import View
from django.http import HttpResponse

'''
Estos son los type_proyect
* las constantes estan basadas en el nombre de la carpeta base
'''
TABS = 'tabs'
SIDEMENU = 'menu'
BLANK = 'blank'

class CreateProyect():
    ROUTE_BASE = 'apps/generator/base/'
    ROUTE_PROYECT = 'media/output/proyect/'
    ROUTE_ZIP = 'media/output/zip/'

    def __init__(self, **kwargs):
        # se obtiene el nombre del archivo final, el tipo (tabs, sidemenu, blanck), y se crea el nombre del zip
        self.file_name = kwargs.pop('file_name','AppTest')
        self.type_name = kwargs.pop('type_proyect', TABS)
        self.zip_name = '{0}.zip'.format(self.file_name)
        self.configurate_routes()

        self.validate_base()
        self.create_copy()
        self.create_zip()

    def configurate_routes(self):
        # obtenemos la ruta de nuestros archivos base, que se suponen deben estar creados
        self.ROUTE_BASE = self.get_directory_route(self.ROUTE_BASE + self.type_name)

        # creamos y obtenemos el directorio donde se guardaran los proyectos y zips
        self.ROUTE_PROYECT = self.get_or_create_directory(self.ROUTE_PROYECT)
        self.ROUTE_ZIP = self.get_or_create_directory(self.ROUTE_ZIP)

        # se adjunta a la ruta del directorio proyectos el nombre del directorio que crearemos
        self.ROUTE_PROYECT = self.ROUTE_PROYECT + self.file_name
        # se adjunta a la ruta del directorio zip el nombre del zip que crearemos
        self.ROUTE_ZIP = self.ROUTE_ZIP + self.file_name

    def validate_base(self):
        if not os.path.exists(self.ROUTE_BASE):
            print('Ya existe un proyecto con el mismo nombre')

    def create_copy(self):
        if not os.path.exists(self.ROUTE_PROYECT):
            shutil.copytree(self.ROUTE_BASE, self.ROUTE_PROYECT)
        else:
            print('Ya existe un proyecto con el mismo nombre')

    def create_zip(self):
        if not os.path.exists(self.ROUTE_ZIP):
            shutil.make_archive(self.ROUTE_ZIP, "zip", self.ROUTE_PROYECT)
        else:
            print('Ya existe un zip con el mismo nombre')

    def get_file_zip(self):
        return open('{0}.zip'.format(self.ROUTE_ZIP), 'rb')

    def get_directory_route(self, DIRECTORY):
        return os.path.join(settings.BASE_DIR, DIRECTORY)

    def get_or_create_directory(self, DIRECTORY):
        ROUTE = self.get_directory_route(DIRECTORY)
        if not os.path.exists(ROUTE):
            os.makedirs(ROUTE)
        return ROUTE

# como usar
# vista que descarga el archivo

class DowloadView(View):

    def get(self, request, *args, **kwargs):
        test = CreateProyect()
        zip_file = test.get_file_zip()
        response = HttpResponse(zip_file, content_type='application/force-download')
        response['Content-Disposition'] = 'attachment; filename="%s"' % test.zip_name
        return response