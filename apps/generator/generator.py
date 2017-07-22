import os
import shutil
from django.views import View
from django.http import HttpResponse

'''
Estos son los type_proyect
* las constantes estan basadas en el nombre de la carpeta base
'''
TABS = 'tabs'
SIDEMENU = 'menu'
BLANK = 'blank'


def get_or_create_directory(path):
    path = os.path.join(path)
    if not os.path.exists(path):
        os.makedirs(path)
    return path

def create_file(path_file, content):
    target = open(path_file, 'w')
    target.write(content)
    target.close()

def is_exist_path(path):
    if not os.path.exists(path):
        return False
    return True


# plantillas


class GeneratorIonic3():
    ROUTE_BASE = 'apps/generator/base/'
    ROUTE_PROYECT = 'media/output/proyect/'
    ROUTE_ZIP = 'media/output/zip/'
    ROUTE_PAGE = '/src/pages/{0}/'

    def __init__(self, **kwargs):
        # se obtiene el nombre del archivo final, el tipo (tabs, sidemenu, blanck), y se crea el nombre del zip
        self.app_name = kwargs.pop('app_name','AppTest')
        self.type_proyect = kwargs.pop('type_proyect', TABS)
        self.zip_name = '{0}.zip'.format(self.app_name)
        self.configurate_routes()

    def configurate_routes(self):
        #obtenemos la ruta de los directorios a usar
        self.ROUTE_BASE = get_or_create_directory(self.ROUTE_BASE)
        self.ROUTE_PROYECT = get_or_create_directory(self.ROUTE_PROYECT)
        self.ROUTE_ZIP = get_or_create_directory(self.ROUTE_ZIP)

    def is_exist_base(self):
        return is_exist_path(self.ROUTE_BASE+self.type_proyect)

    def is_exist_proyect(self):
        return is_exist_path(self.ROUTE_PROYECT+self.app_name)

    def is_exist_zip(self):
        return is_exist_path(self.ROUTE_ZIP+self.zip_name)

    def create_proyect(self):
        shutil.copytree(self.ROUTE_BASE+self.type_proyect, self.ROUTE_PROYECT+self.app_name)

    def delete_proyect(self):
        shutil.rmtree(self.ROUTE_PROYECT + self.app_name)

    def create_zip(self):
        shutil.make_archive(self.ROUTE_ZIP+self.app_name, "zip", self.ROUTE_PROYECT+self.app_name)

    def delete_zip(self):
        os.remove(self.ROUTE_ZIP + self.zip_name)

    def get_file_zip(self):
        return open(self.ROUTE_ZIP+self.zip_name, 'rb')

    def create_pages(self, data):
        for item in data :
            name_page = item.name
            path = self.ROUTE_PROYECT+self.app_name+self.ROUTE_PAGE.format(name_page)
            get_or_create_directory(path)
            create_file(path+'{0}.ts'.format(name_page), item.get('data', ''))
            create_file(path+'{0}.html'.format(name_page), item.get('data', ''))
            create_file(path+'{0}.scss'.format(name_page), item.get('data', ''))

    def logic(self, data):
        # esto es lo que se tiene que hacer en la vista o donde se necesite
        # solo es un ejemplo no necesariamente debe estar dentro de la misma clase
        if self.is_exist_base():
            if self.is_exist_proyect():
                self.delete_proyect()
            self.create_proyect()

            if data:
                self.create_pages(data)

            if self.is_exist_zip():
                self.delete_zip()
            self.create_zip()

        return self.get_file_zip()


# como usar
# vista que descarga el archivo

class DowloadView(View):

    def get(self, request, *args, **kwargs):
        data = self.request.GET.get('ionic3_data', None)

        test = GeneratorIonic3()
        zip_file = test.logic(data)
        response = HttpResponse(zip_file, content_type='application/force-download')
        response['Content-Disposition'] = 'attachment; filename="%s"' % test.zip_name
        return response