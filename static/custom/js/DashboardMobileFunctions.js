/**
 * Created by Polar on 16/06/2017.
 */

ionic2_project = function () {
    this.name = 'my_project_name';
    this.node_modules = false;
    this.routing_URL = this.name + '/';
    this.src ={
        routing_URL: 'src/',
        pages:{
            routing_URL: '/pages',
            folders:[],
            global_attr:{
                tittle_background_color: '#4444c1',
                tittle_font_color: '#ffffff',
                body_background_color: '#ffffff'
            }
        }
    };
    this.getURL = function () { this.routing_URL = this.name + '/'};
    this.switchNodeModules = function () { this.node_modules = !this.node_modules}

};

folder = function (id) {
    this.id = id? id: 0;
    this.name = 'Models';
    this.pages =  [];
    this.isValid = true;
};

page = function (data) {
    this.id = data.id;
    this.name = data.name;
    this.routing_URL = this.name + '/';
    this.isValid = true;
    this.type = '';
    this.header = {
        hide: false,
        left: {
            enabled: false,
            icon: '',
            text: ''
        },
        middle: {
            enabled: true,
            text: 'my_tittle'
        },
        botttom: {
            enabled: false,
            icon: '',
            text: ''
        }
    };
    this.body = {};
};










pages = {};


$('.pagename').click(function () {


})

