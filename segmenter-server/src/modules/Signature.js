const crypto = require("crypto");

const Signature = {
  create: (secretKey, method, url, timestamp, accessKey) => {
    const space = " ";
    const newLine = "\n";

    const hmac = crypto.createHmac("sha256", secretKey); // 암호화 객체 생성, sha256 알고리즘 선택
    hmac
      .update(method) // HTTP 메소드
      .update(space) // 공백
      .update(url) // 도메인을 제외한 "/" 아래 전체 url (쿼리스트링 포함)
      .update(newLine) // 줄바꿈
      .update(timestamp) // 현재 타임스탬프 (epoch, millisecond)
      .update(newLine) // 줄바꿈
      .update(accessKey) // access key (from portal or iam)
      .end();

    const hash = hmac.read();
    const encodedHash = new Buffer.from(hash).toString("base64");
    return encodedHash;
  }
};

module.exports = Signature;
