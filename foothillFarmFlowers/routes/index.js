var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');
var flowers = [{
    name: 'King Size Apricot China Aster',
    colors: 'pink, apricot, blush, orange',
    imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwd0114608/images/products/flowers/03465_01_king_size_apricot.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September'
  },
  {
    name: 'ProCut® White Nite Sunflower',
    colors: 'white, yellow, black',
    imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwcc89eaa6/images/products/flowers/03305_01_white_nite.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'

  }
  ,
    {
      name: 'ProCut® Plum',
      colors: 'cream, red, black, yellow',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw123aa39a/images/products/flowers/03677_01_procutplum.jpg?sw=387&cx=322&cy=0&cw=1094&ch=1094',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Oklahoma Salmon Zinnia',
      colors: 'pink, blush',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw2e5dc912/images/products/flowers/3667_01_oklahomasalmon.jpg?sw=387&cx=368&cy=142&cw=1054&ch=1054',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Mrs. Burns Lemon Basil',
      colors: 'green',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw5fe00045/images/products/herbs/00774_01_mrs_burnslemon.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September'
    },
    {
      name: 'Queen Anne\'s lace',
      colors: 'black, purple, pink, white',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw5a026d7f/images/products/flowers/01968_01_dara.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September'
    },
    {
      name: 'Colorado Mix Yarrow',
      colors: 'red, pink, blush, orange, yellow, apricot, white',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw5f7345d2/images/products/flowers/03878g_01_colorado.jpg?sw=387&cx=346&cy=38&cw=1138&ch=1138',
    bloomMonths: 'July, August, September'
    },
    {
      name: 'Chantilly Light Pink Snapdragon',
      colors: 'pink, blush',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw0313ad7d/images/products/flowers/01982_01_chantilly_light_pink.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Silvery Rose Strawflower',
      colors: 'white, pink, blush',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwfb0ff336/images/products/flowers/03328_01_silvery_rose.jpg?sw=387&cx=236&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September'
    },
    {
      name: 'Elegant Salmon Clarkia',
      colors: 'pink, salmon',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwc2bd0609/images/products/flowers/04022_01_elegance_salmon.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September'
    },
    {
      name: 'Benary\'s Giant Wine Zinnia',
      colors: 'red, pink',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwb1a303a4/images/products/flowers/1866_01_benarys_wine.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Chabaud Picotee Double Mix Dianthus',
      colors: 'pink, purple, cream, white, salmon, apricot',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwfbd40b51/images/products/flowers/3708_02_doublemix.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'May, June'
    },
    {
      name: 'Salmon Rose Scabiosa',
      colors: 'pink, salmon',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwe9824cd3/images/products/flowers/03716_02_salmon_rose.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September'
    },
    {
      name: 'Benary\'s Giant Salmon Rose Zinnia',
      colors: 'apricot, pink, orange',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw2badb827/images/products/flowers/01362_01_benarys_giant_salmon_rose.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Cherry Caramel Phlox',
      colors: 'cream, pink',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwf4a63469/images/products/flowers/01928_01_cherrycaramel.jpg?sw=387&cx=116&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Strawberry Lemonade Mix Sunflower',
      colors: 'yellow, red, black',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwa7d34599/images/products/flowers/03356_01_strawberry_lemonade_mix.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Benary\'s Giant Coral Zinnia',
      colors: 'pink, coral',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw330b92f3/images/products/flowers/01366_01_benarys_giant_coral.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Echinacea purpurea - Coneflower',
      colors: 'pink, purple',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw59632a7f/images/products/flowers/00842_01_purple.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'August, September, October'
    },
    {
      name: 'Fire King Scabiosa',
      colors: 'red',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw6810bd83/images/products/flowers/3715_01_fireking.jpg?sw=387&cx=300&cy=38&cw=1104&ch=1104',
    bloomMonths: 'July, August, September'
    },
    {
      name: 'Senora Zinnia',
      colors: 'pink, salmon',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwe2c0cd8c/images/products/flowers/03310_01_senora.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Benary\'s Giant Carmine Rose Zinnia',
      colors: 'pink',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw3a5933ad/images/products/flowers/01363_01_benarys_giant_carmine_rose.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Double Click Snow Puff Cosmos ',
      colors: 'white, blush',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw178f3462/images/products/flowers/03731_01_doubleclicksnowpuff.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Barlow Mix Columbine',
      colors: 'rose, black, purple, violet, red, white',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwe791f245/images/products/flowers/01119_01_barlow_mix.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September'
    },
    {
      name: 'Cherry Brandy Rudbeckia',
      colors: 'red',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw6749e584/images/products/flowers/01865_02_cherrybrandy.jpg?sw=387&cx=318&cy=98&cw=1054&ch=1054',
    bloomMonths: 'August, September, October'
    },
      {
      name: 'Pampas Plume Celosia',
      colors: 'yellow, pink, red, orange, cream',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw5375c406/images/products/flowers/01203_01_pampusplumehorz.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
      {
      name: 'Double Click Bicolor Pink Cosmos',
      colors: 'pink, white, purple',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw021c2b3c/images/products/flowers/01960_02_doubleclickbicolorpink.jpg?sw=387&cx=282&cy=72&cw=1034&ch=1034',
    bloomMonths: 'July, August, September, October'
    },
     {
      name: 'Lacy Lavender Blue Didiscus',
      colors: 'blue',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwf1c8cb27/images/products/flowers/03780_01_lacylavenderblue.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
      {
      name: 'Tower Chamois China Aster',
      colors: 'pink, blush',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw545f2e41/images/products/flowers/03758_01_towerchamois.jpg?sw=387&cx=360&cy=42&cw=1000&ch=1000',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Potomac Appleblossom Snapdragon ',
      colors: 'pink, white, green',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw98e7fd7d/images/products/flowers/1945_01_potomac_appleblossom.jpg?sw=387&cx=388&cy=46&cw=1016&ch=1016',
    bloomMonths: 'June, July, August, September, October'
    },
    {
      name: 'Costa Apricot Snapdragon',
      colors: 'yellow, orange, apricot, green',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw46278165/images/products/flowers/03442_01_costa_apricot.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'June, July, August, September, October'
    },
    {
      name: 'Rubenza Cosmos',
      colors: 'red, pink',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwa55ece4c/images/products/flowers/03438_01_rubenza.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Lady Coral Lavender China Aster',
      colors: 'lavendar, purple',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw2c86e773/images/products/flowers/03499_01_lady_coral_lavender.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Timeless Mix Ageratum',
      colors: 'red, pink, blue, white',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwaefb579d/images/products/flowers/03432_01_timeless_mix.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'June, July, August, September'
    },
    {
      name: 'Xsenia Cosmos',
      colors: 'red, pink',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dwdfb51a1a/images/products/flowers/03450_01_xsenia.jpg?sw=387&cx=302&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September, October'
    },
    {
      name: 'Johnny\'s Potomac Custom Mix Snapdragon ',
      colors: 'red, pink, cream, green, yellow, orange, purple, lavendar',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw4f2434a2/images/products/flowers/01940_01_johnnyspotomaccustmix.jpg?sw=387&cx=364&cy=76&cw=1000&ch=1000',
    bloomMonths: 'June, July, August, September, October'
    },
    {
      name: 'Madame Butterfly Mix Snapdragon',
      colors: 'orange, white, red, pink, yellow',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw126db6a6/images/products/flowers/01930_02_madamebutterfly.jpg?sw=387&cx=0&cy=0&cw=1196&ch=1196',
    bloomMonths: 'June, July, August, September, October'
    },
    {
      name: 'Bells of Ireland',
      colors: 'green',
      imageUrl: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw8c823ab2/images/products/flowers/01028_01_bellsofireland.jpg?sw=387&cx=232&cy=0&cw=1196&ch=1196',
    bloomMonths: 'July, August, September'
    },
    {
      name: 'Narcissus Replete',
      colors: 'orange, pink, salmon',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Floret_Daffodil_Replete-2_768x.jpg?v=1569522138',
    bloomMonths: 'March, April'
    },
    {
      name: 'Narcissus White Lion',
      colors: 'cream, white, yellow',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/White_Lion_Narcissus-5763_768x.jpg?v=1569526234',
    bloomMonths: 'March, April'
    },
    {
      name: 'Narcissus Petit Four',
      colors: 'pink, blush, apricot',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Floret_Daffodil_Petit_Four-6_768x.jpg?v=1569520215',
    bloomMonths: 'March, April'
    },
    
    {
      name: 'Narcissus Delnashaugh',
      colors: 'white, cream, pink, blush, apricot',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Delnahaugh_Floret-2_768x.jpg?v=1569517440',
    bloomMonths: 'March, April'
    },
    {
      name: 'Narcissus Acropolis',
      colors: 'white, yellow, orange',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Acropolis_Narcissus-6134_768x.jpg?v=1569515938',
    bloomMonths: 'March, April'
    }, 
    {
      name: 'Foxglove Dalmatian Peach',
      colors: 'apricot, pink, blush',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Floret_Foxglove_Dalmation-Peach_IMG_1003_768x.jpg?v=1500594403',
    bloomMonths: 'June, July, August, September, October'
    },
    {
      name: 'Snapdragon Madame Butterfly Bronze',
      colors: 'apricot, orange, pink',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Floret_Snapdragon_Madame-Bronze_IMG_3476_768x.jpg?v=1514410959',
    bloomMonths: 'June, July, August, September, October'
    },
    {
      name: 'Clary Sage Clary Mix',
      colors: 'white, purple, pink',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Clary_Sage_Virdis_Clary_Mix_Floret-1_768x.jpg?v=1514407324',
    bloomMonths: 'June, July, August, September, October'
    },
    {
      name: 'Malope Queen Pink',
      colors: 'purple, pink, green',
      imageUrl: 'https://cdn.shopify.com/s/files/1/2048/8041/products/Malope_Queen_Pink_Floret-2_768x.jpg?v=1546524491',
    bloomMonths: 'June, July, August'
    }
    
    
    
    
];


/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/getflowers', function(req, res, next) {
  console.log("in get flower route")

  //console.log("All FLowers: " + flowers);
  var filteredFlowers = flowers.filter(function(flower) {
    //console.log("query: " + req.query.color);
    console.log("flower colors " + flower.colors + " flower bloomtime: " + flower.bloomMonths);
    if(flower.colors.search(req.query.color)>=0 && flower.bloomMonths.search(req.query.month)>=0)
      return true;
  });
  console.log("Filtered FLowers: " + filteredFlowers);
  res.status(200).json(filteredFlowers);

});

module.exports = router;
