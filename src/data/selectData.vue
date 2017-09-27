<script>
export default {
  data () {
    return {
    cardboards: [{
        value: '双灰板',
        label: '双灰板'
      }, {
        value: '裱白板',
        label: '裱白板'
      }, {
        value: '双面滑',
        label: '双面滑'
      }],
      thicks:[{
        value:"1.5",
        label:"1.5mm"
      },{
        value:"2",
        label:"2.0mm"
      },{
        value:"2.5",
        label:"2.5mm"
      },{
        value:"3",
        label:"3.0mm"
      }],
      quantitys:[{
        value:"500"
      },{
        value:"1000"
      },{
        value:"2000"
      },{
        value:"5000"
      },{
        value:"10000"
      },{
        value:"20000"
      }],
      paperWeights:[
        {label:"80g",value:"80"},
        {label:"100g",value:"100"},
        {label:"128g",value:"128"},
        {label:"157g",value:"157"},
        {label:"200g",value:"200"},
        {label:"250g",value:"250"},
        {label:"300g",value:"300"},
        {label:"350g",value:"350"},
      ]
    }
  },

}
</script>