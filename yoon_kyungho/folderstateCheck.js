const {S3,params} = require("./storage_connector");

(async () => {

    // List All Objects
    console.log('버킷리스트 조회');
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
    console.log('버킷의 폴더, 파일확인');
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