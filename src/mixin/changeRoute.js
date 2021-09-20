export default {
  methods: {
    async changeRoute(name, id = 0) {
      console.log(name);
      let purl = this.parseString(document.location.href);
      let pidx = purl.lastIndexOf("/");
      let cname = purl.substring(pidx+1);
      // console.log(purl.substring(pidx+1));
      if(name===cname)return;
      await this.$router.push({
        name,
        params: {
          id,
        },
      });
    },

    parseString(url){
      let suburl  = url.substring(url.lastIndexOf("/"));
      console.log(suburl.substring(1,9), isNaN(suburl.substring(1,9)));
      if(!isNaN(suburl.substring(1,9))){
        let str = url.split("/");
        console.log(str[str.length-2]);
        return str[str.length-1];
      }
      else return url;

    }

  }
}
