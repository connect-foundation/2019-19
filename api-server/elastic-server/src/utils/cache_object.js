const {S3,params} = require("./cache_connector.js");


let key = process.env.movie_table;


async function getJsonarray(Bucket,key){
 
  S3.getObject({Bucket:Bucket,Key:key}, async function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
   // else     console.log(data);           // successful response
  
    test = await data.Body.toString().split("\n");
  
    test.forEach( element => {
  
      const result = JSON.parse(element);
      console.log(result.category);
    })
    
  
  
  })
}

(async() =>S3.getObject({Bucket:params.Bucket,Key:key}, async function(err, data) {
  if (err){
    console.log(err, err.stack); // an error occurred
    return;
  } 

  let arr = await data.Body.toString().split("\n");

  arr.forEach( element => {

    const result = JSON.parse(element);
    //console.log(`category : ${result.category} name : ${result.name}`);
    //console.log(result);
    
  })

}))();
