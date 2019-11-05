/*global moment*/
/*global Vue*/
/*global axios */


var app = new Vue({
  el: '#app',
  data: {
    flowers: [],
    color: "",
    loading: true,
    colors: ['red', 'blush', 'pink', 'black', 'lavendar', 'blue', 'purple', 'yellow', 'orange', 'apricot'],
    months: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],

    Color: "Show All",
    ColorDrop: "Show All",
    Month: "Show All", 
    MonthDrop: "Show All"

  },
  created() {
    console.log("Created Color Drop: " + this.ColorDrop);
    this.getflowers("");


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
     
      var url = "http://foothillfarmflowers.com:3030/getflowers";
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
    async getflowersColor(color) {
      // `this` points to the vm instance
      console.log("In Get Flowers Color Color Drop: " + this.ColorDrop + " color: "+ color);
      if(color==="Show All")
        color="";
      if(color!="")
      {
        this.Color = color;
        this.ColorDrop = color;
      }
      else
      {
        console.log("Chaning color drop...");
        this.Color = "Show All";
        this.ColorDrop = "Show All";
      }
      var month = ""
      if(this.MonthDrop != "Show All")
        month = this.MonthDrop;
     
      //console.log("get flowers color: " + color);
      //console.log("Color Drop value: " + this.Color); 
      var url = "http://foothillfarmflowers.com:3030/getflowers?color=" + color + "&month=" + month;
      console.log(url);
      try {
        let response = await axios.get(url);
        this.flowers = response.data;
        //console.log(this.flowers);
         console.log("end Get Flowers Color Color Drop: " + this.ColorDrop + " color: "+ color);
        return true;
      }
      catch (error) {
        console.log(error);
      }
       
    },
     async getflowersMonth(month) {
      // `this` points to the vm instance
      console.log("Color Drop: " + this.ColorDrop);
     
      if(month==="Show All")
        month="";
      if(month!="")
        this.Month = month;
      else
      {
        this.Month = "Show All";
        this.MonthDrop = "Show All";
      }
     var color = ""
      if(this.ColorDrop != "Show All")
        color = this.ColorDrop;
      //console.log("get flowers color: " + color);
      //console.log("Color Drop value: " + this.Color); 
      var url = "http://foothillfarmflowers.com:3030/getflowers?color=" + color + "&month=" + month;
      console.log(url);
      try {
        let response = await axios.get(url);
        this.flowers = response.data;
        //console.log(this.flowers);
        console.log("Color Drop: " + this.ColorDrop);
        return true;
      }
      catch (error) {
        console.log(error);
      }
       
    },



  }
});
