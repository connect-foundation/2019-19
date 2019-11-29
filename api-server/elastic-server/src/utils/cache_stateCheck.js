const {S3,params} = require("./objectstorage_connector");
//출처 : https://docs.ncloud.com/en/storage/storage-8-4.html
(async () => {

    // List All Objects
    console.log('List All In The Bucket');
    console.log('==========================');

    while(true) {

        let response = await S3.listObjectsV2(params).promise();


        console.log(`IsTruncated = ${response.IsTruncated}`);
        console.log(`Marker = ${response.Marker ? response.Marker : null}`);
        console.log(`NextMarker = ${response.NextMarker ? response.NextMarker : null}`);
        console.log(`  Object Lists`);
        for(let content of response.Contents) {
            console.log(`    Name = ${content.Key}, Size = ${content.Size}`);
        }

        if(response.IsTruncated) {
            params.Marker = response.NextMarker;
        } else {
            break;
        }

    }

    // List Top Level Folder And Files
    params.Delimiter = '/';
    console.log('Top Level Folders And Files In The Bucket');
    console.log('==========================');

    while(true) {

        let response = await S3.listObjectsV2(params).promise();

        console.log(`IsTruncated = ${response.IsTruncated}`);
        console.log(`Marker = ${response.Marker ? response.Marker : null}`);
        console.log(`NextMarker = ${response.NextMarker ? response.NextMarker : null}`);

        console.log(`  Folder Lists`);
        for(let folder of response.CommonPrefixes) {
            console.log(`    Name = ${folder.Prefix}`)
        }

        console.log(`  File Lists`);
        for(let content of response.Contents) {
            console.log(`    Name = ${content.Key}, Size = ${content.Size}`)
        }


        if(response.IsTruncated) {
            params.Marker = response.NextMarker;
        } else {
            break;
        }

    }

})();