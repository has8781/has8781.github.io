//index.js


/**
 * @swagger
 *  /db:
 *    get:
 *      tags:
 *        - 옷장의 옷 리스트 조회(페이징)
 *      description: 옷장의 옷 리스트 조회 
 *      parameters:
 *        - name: page
 *          in: query
 *          description: Page number for pagination (default is 1)
 *          required: false
 *          type: integer
 *          format: int32   
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: 옷장 리스트 조회 성공
 *        500:
 *          description: 서버 에러
 */



/**
 * @swagger
 *  /db/1:
*    get:
 *      tags:
 *      - 옷장 상의 리스트 출력
 *      description: 옷장 상의 리스트 출력
 *      parameters:
 *        - name: page
 *          in: query
 *          description: Page number for pagination (default is 1)
 *          required: false
 *          type: integer
 *          format: int32   
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 옷장 상의 리스트 조회 성공
 *       500:
 *        description: 서버 에러
 */

/**
 * @swagger
 *  /db/2:
*    get:
 *      tags:
 *      - 옷장 하의 리스트 출력
 *      description: 옷장 하의 리스트 출력
 *      parameters:
 *        - name: page
 *          in: query
 *          description: Page number for pagination (default is 1)
 *          required: false
 *          type: integer
 *          format: int32   
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 옷장 하의 리스트 조회 성공
 *       500:
 *        description: 서버 에러
 */


/**
 * @swagger
 *  /db/3:
*    get:
 *      tags:
 *      - 옷장 아우터 리스트 출력
 *      description: 옷장 아우터 리스트 출력
 *      parameters:
 *        - name: page
 *          in: query
 *          description: Page number for pagination (default is 1)
 *          required: false
 *          type: integer
 *          format: int32   
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 옷장 아우터 리스트 조회 성공
 *       500:
 *        description: 서버 에러
 */

/**
 * @swagger
 *  /db/4:
 *    get:
 *      tags:
 *      - 옷장 원피스 리스트 출력
 *      description: 옷장 원피스 리스트 출력
*      parameters:
 *        - name: page
 *          in: query
 *          description: Page number for pagination (default is 1)
 *          required: false
 *          type: integer
 *          format: int32   
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 옷장 원피스 리스트 조회 성공
 *       500:
 *        description: 서버 에러
 */

/**
 * @swagger
 *  /db/5:
 *    get:
 *      tags:
 *      - 옷장 악세사리 리스트 출력
 *      description: 옷장 악세사리 리스트 출력
 *      parameters:
 *        - name: page
 *          in: query
 *          description: Page number for pagination (default is 1)
 *          required: false
 *          type: integer
 *          format: int32    
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 옷장 악세사리 리스트 조회 성공
 *       500:
 *        description: 서버 에러
 */

/**
 * @swagger
 *  /clothes_delete/{id}:
 *    delete:
 *      tags:
 *      - 옷 삭제
 *      description: 선택한 옷 삭제
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 옷 아이디
 *        schema:
 *          type: integer
 *      responses:
 *       200:
 *        description: 선택한 옷 삭제 성공
 *       500:
 *        description: 서버 에러
 */