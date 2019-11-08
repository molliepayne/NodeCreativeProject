/*global moment*/
/*global Vue*/
/*global axios */


var app = new Vue({
  el: '#app',
  data: {
    flowers: [],
    color: "",
    loading: true,
    colors: ['red', 'blush', 'pink', 'black', 'lavendar', 'blue', 'purple', 'yellow', 'orange', 'apricot', 'white', 'cream', 'green'],
    months: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
    varieties: [],
    Color: "Show All",
    ColorDrop: "Show All",
    Month: "Show All", 
    MonthDrop: "Show All",
    Variety: "Show All", 
    VarietyDrop: "Show All",
    flowerName: "",
    flowerColors: "",
    imageUrl: "",
    bloomMonths: "",
    infoLink: "", 
    flowerVariety: ""
    

  },
  created() {
    //console.log("Created Color Drop: " + this.ColorDrop);
    this.getflowers();
    this.getvarieties();
    this.colors.sort();
    

  },
  computed: {



  },


  watch: {

  },
  methods: {
 
    postDate: function(date) {


      return moment(date).format('MMMM Do YYYY');
    },
    
    postDateMin: function(date) {


      return moment(date).format('MMMM Do YYYY h:mm A');
    },
    async getflowers() {
       var month = "";
      if(this.MonthDrop != "Show All")
        month = this.MonthDrop;
      var variety = "";
      if(this.VarietyDrop != "Show All")
        variety = this.VarietyDrop;
      var color = ""
      if(this.ColorDrop != "Show All")
        color = this.ColorDrop;
      this.varieties.sort();
      var url = "http://foothillfarmflowers.com:3030/getflowers?color=" + color + "&month=" + month+ "&variety=" + variety;
      console.log(url);
      try {
        let response = await axios.get(url);
        this.flowers = response.data;
        
        return true;
      }
      catch (error) {
        console.log(error);
      }
       
    },
     async getvarieties() {
     
      var url = "http://foothillfarmflowers.com:3030/getvarieties";
      console.log(url);
      try {
        let response = await axios.get(url);
        this.varieties = response.data;
        this.varieties.sort();
        return true;
      }
      catch (error) {
        console.log(error);
      }
       
    },
    async addFlower(){
      var url = "http://foothillfarmflowers.com:3030/getflowers";
      axios.post(url, {
        name: this.flowerName,
        colors: this.flowerColors,
        imageUrl: this.imageUrl,
        bloomMonths: this.bloomMonths,
        infoLink: this.infoLink, 
        variety: this.flowerVariety
      })
      .then(response => {})
        .catch(e => {
          console.log(e);
        });
      this.varieties.push(this.flowerVariety);
      console.log("added: " + this.flowerVariety);
      console.log(this.varieties);
      this.getflowers();
      this.flowerName = '';
      this.flowerColors = '';
      this.imageUrl = '';
      this.bloomMonths = '';
      this.infoLink = '';
      this.flowerVariety = '';
      
    },


  }
});
