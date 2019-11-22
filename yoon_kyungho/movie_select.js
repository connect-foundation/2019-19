const {S3,params} = require("./storage_connector");

const key = "movie_select.json";


(async () =>{

  let response = await S3.listObjectsV2(params).promise();
  response.Contents.forEach(e =>{

    if(e.Key ==key){
      console.log(e);

    }
  })
})();

(async() =>S3.getObject({Bucket:params.Bucket,Key:key}, async function(err, data) {
  if (err){
    console.log(err, err.stack); // an error occurred
    return;
  } 

  let arr = await data.Body.toString().split("\n");

  arr.forEach( element => {

    const result = JSON.parse(element);
    console.log(`category : ${result.category} name : ${result.name}`);
  })

}))();
