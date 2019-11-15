const crypto = require('crypto');

const Signature = {
  createSignature: (secretKey, method, url, timestamp, accessKey) => {
    var space = " ";
    var newLine = "\n";
  
    var hmac = crypto.createHmac('sha256', secretKey); // 암호화 객체 생성, sha256 알고리즘 선택
    hmac.update(method);		// HTTP 메소드
    hmac.update(space);			// 공백
    hmac.update(url);			// 도메인을 제외한 "/" 아래 전체 url (쿼리스트링 포함)
    hmac.update(newLine);		// 줄바꿈
    hmac.update(timestamp);		// 현재 타임스탬프 (epoch, millisecond)
    hmac.update(newLine);		// 줄바꿈
    hmac.update(accessKey);		// access key (from portal or iam)
    hmac.end();
  
    var hash = hmac.read();
    var encoded_hash = new Buffer.from(hash).toString('base64');
    return encoded_hash;
  },
}

module.exports = Signature;
