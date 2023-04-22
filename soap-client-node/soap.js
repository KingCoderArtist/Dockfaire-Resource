const soap = require('strong-soap').soap;
const WSDL = soap.WSDL;

const url = 'PSIXData.wsdl';

var getVesselSummary = (data, callback)=>{

var args = {
    VesselID:data.VesselID?data.VesselID:'',
    VesselName:data.VesselName?data.VesselName:'',
    CallSign:data.CallSign ? data.CallSign : '',
    VIN:data.VIN ? data.VIN : '',
    HIN:data.HIN ? data.HIN : '',
    Flag:data.Flag ? data.Flag : '',
    Service:data.Service ? data.Service : '',
    BuildYear:data.BuildYear ? data.BuildYear : ''
}



// Pass in WSDL options if any

var options = {};
WSDL.open(url,options,
  (err, wsdl) => {
    // You should be able to get to any information of this WSDL from this object. Traverse
    // the WSDL tree to get  bindings, operations, services, portTypes, messages,
    // parts, and XSD elements/Attributes.

    // can be anything, but needs to match the parameter passed into soap.createClient()
    var clientOptions = {
      WSDL_CACHE : {
        PSIXData: wsdl
      }
    };
    soap.createClient('PSIXData', clientOptions, (err, client) => {
      //console.log(client.describe().PSIXData.PSIXDataSoap.getVesselSummary)
      console.log('soap call started')
      var getVesselSummary = client.PSIXData.PSIXDataSoap.getVesselSummary;
      getVesselSummary(args, (err, result, envelope, soapHeader) => {
        if(err){
            console.log(err)
        }

        console.log(result);
        let data = {};
        if(result['getVesselSummaryResult'] && result['getVesselSummaryResult']['diffgram']){
            data = result['getVesselSummaryResult']['diffgram']['NewDataSet']
        }
        
        
        let returnData = JSON.parse(JSON.stringify(data));
        if(returnData['VesselSummary']){
            returnData['VesselSummary']['$attributes'] = null;
        }
        console.log('soap call ended');
        callback(returnData);
    });
  });
});

}

module.exports = getVesselSummary;