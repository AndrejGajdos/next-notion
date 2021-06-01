const express = require('express');
const next = require('next');
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== undefined;
var app;

if(dev){
  app = next({ dev});
}else{
  app = next({ dev,conf:{
    distDir: 'build'
} });
}

const handle = app.getRequestHandler();

app.prepare().then(() => {

  const server = express();

  server.use('/Public', express.static(__dirname + '/Public'));
  server.use('/.well-known', express.static(__dirname + '/Public'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
 
  server.get('/', (req, res) => {
    return app.render(req, res, '/index');
  });

  server.get('/stranka-nenajdena', (req, res) => {
    return app.render(req, res, '/stranka-nenajdena');
  });

  server.get('/robots.txt', (req, res) => {
    return app.render(req, res, '/robots');
  });
  server.get('/sitemap.xml', (req, res) => {
    return app.render(req, res, '/sitemap');
  });

  server.get('/produkt/:product', (req, res) => {
    return app.render(req, res, '/product', { product: req.params.product });
  });

  server.get('/obsah/:page', (req, res) => {
    return app.render(req, res, '/page', { page: req.params.page });
  });
  server.get('/ucet', (req, res) => {
    return app.render(req, res, '/account');
  });
  server.get('/prihlasit', (req, res) => {
    return app.render(req, res, '/login');
  });
  server.get('/zabudnute-heslo', (req, res) => {
    return app.render(req, res, '/forgotPassword');
  });
  server.get('/nove-heslo/:passCode', (req, res) => {
    return app.render(req, res, '/newPassword',{passCode:req.params.passCode});
  });
  server.get('/kosik', (req, res) => {
    return app.render(req, res, '/cart');
  });
  server.get('/objednavka', (req, res) => {
    return app.render(req, res, '/order');
  });
  server.get('/vyhladat/:text', (req, res) => {
    return app.render(req, res, '/category', { 
      isSearch:true, 
      text: req.params.text,
    });
  });
  server.get('/vyhladat/:text/radenie/:sort/strana/:page', (req, res) => {
    return app.render(req, res, '/category', { 
      isSearch:true, 
      text: req.params.text,
      sort: req.params.sort,
      page: req.params.page 
    });
  });

  server.get('/:category', (req, res) => {
    return app.render(req, res, '/category', { isCategory:true, category: req.params.category });
  });
  server.get('/:category/filter/:filter/cena-od/:priceFrom/cena-do/:priceTo/radenie/:sort/strana/:page', (req, res) => {
    return app.render(req, res, '/category', { 
        isCategory:true, 
        category: req.params.category, 
        filter: req.params.filter, 
        priceFrom: req.params.priceFrom, 
        priceTo: req.params.priceTo,
        sort: req.params.sort,
        page: req.params.page 
    });
  });
  server.get('/:category/filter/:filter/cena-od/:priceFrom/cena-do/:priceTo/dlzka-od/:lengthFrom/dlzka-do/:lengthTo/hlbka-od/:depthFrom/hlbka-do/:depthTo/radenie/:sort/strana/:page', (req, res) => {
    return app.render(req, res, '/category', { 
        isCategory:true, 
        category: req.params.category, 
        filter: req.params.filter, 
        priceFrom: req.params.priceFrom, 
        priceTo: req.params.priceTo,
        lengthFrom: req.params.lengthFrom, 
        lengthTo: req.params.lengthTo,
        depthFrom: req.params.depthFrom, 
        depthTo: req.params.depthTo,
        sort: req.params.sort,
        page: req.params.page 
    });
  });

  server.get('/vyrobca/:manufacturer', (req, res) => {
    return app.render(req, res, '/category', { isCategory:false,manufacturer: req.params.manufacturer });
  });
  server.get('/vyrobca/:manufacturer/filter/:filter/cena-od/:priceFrom/cena-do/:priceTo/radenie/:sort/strana/:page', (req, res) => {
    return app.render(req, res, '/category', { 
        isCategory:false,
        manufacturer: req.params.manufacturer,
        filter: req.params.filter, 
        priceFrom: req.params.priceFrom, 
        priceTo: req.params.priceTo,
        sort: req.params.sort,
        page: req.params.page 
    });
  });
  server.get('/vyrobca/:manufacturer/filter/:filter/cena-od/:priceFrom/cena-do/:priceTo/dlzka-od/:lengthFrom/dlzka-do/:lengthTo/hlbka-od/:depthFrom/hlbka-do/:depthTo/radenie/:sort/strana/:page', (req, res) => {
    return app.render(req, res, '/category', { 
        isCategory:false,
        manufacturer: req.params.manufacturer,
        filter: req.params.filter, 
        priceFrom: req.params.priceFrom, 
        priceTo: req.params.priceTo,
        lengthFrom: req.params.lengthFrom, 
        lengthTo: req.params.lengthTo,
        depthFrom: req.params.depthFrom, 
        depthTo: req.params.depthTo,
        sort: req.params.sort,
        page: req.params.page 
    });
  });

  
  server.all('*', (req, res) => {
    return app.render(req, res, '/stranka-nenajdena');
  });

  
  server.listen(8890, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:8890')
  })

  
})