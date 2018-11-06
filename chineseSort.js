 export default function pySegSort(arr=[],empty) {
          if(!String.prototype.localeCompare)
            return null;
          
          var letters = "*ABCDEFGHJKLMNOPQRSTWXYZ".split('');
          var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
          
          var segs = [];
          var curr;
        letters.map((item,i)=>{
          curr = {code: item, cityList:[]};
          arr.map(ite=>{
            if((!zh[i-1] || zh[i-1].localeCompare(ite,"zh") <= 0) && ite.localeCompare(zh[i],"zh") == -1) {
              curr.cityList.push(ite);
            }
          })
          if(empty || curr.cityList.length) {
              segs.push(curr);
              curr.cityList.sort(function(a,b){
                  return a.localeCompare(b,"zh");
              });
          }
        })
        return segs;
    }