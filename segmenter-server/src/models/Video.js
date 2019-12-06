/*
Model Schema
  video_id int(11) AI PK 
  name varchar(255) 
  category varchar(255) 
  likes int(11) 
  reg_date datetime 
  thumbnail_img_url varchar(255) 
  thumbnail_video_url varchar(255) 
  streaming_url varchar(255)
*/

const dbPool = require('../modules/dbPool');

class Video {
  constructor() {
    this.TABLE_NAME = 'videos';
    this.ATTRIBUTE_LIST = [
      'name',
      'category',
      'likes',
      'reg_date',
      'thumbnail_img_url',
      'thumbnail_video_url',
      'streaming_url',
    ];
    this.ATTRIBUTE_NUMBERS = this.ATTRIBUTE_LIST.length;
  }

  async create(params) {
    let connection;
    try {
      let insertQuery = `INSERT INTO ${this.TABLE_NAME} (${this.ATTRIBUTE_LIST}) VALUES (`;
      for (let i = 0; i < this.ATTRIBUTE_NUMBERS - 1; i += 1) {
        insertQuery += '?,';
      }
      insertQuery += '?)';

      const insertValue = [];
      Object.keys(params).forEach(key => {
        insertValue.push(`${params[key]}`);
      });
      connection = await dbPool.pool.getConnection(async conn => conn);
      try {
        const result = await connection.execute(insertQuery, insertValue);
        connection.release();
        return result[0].insertId;
      } catch (err) {
        console.log(`Query Error ~ ${err}`);
        connection.release();
        return false;
      }
    } catch (err) {
      console.log(`DB Connection Error ~ ${err.stack}`);
      connection.release();
      return false;
    }
  }
}

module.exports = Video;
