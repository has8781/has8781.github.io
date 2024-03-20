const express = require("express");
const path = require('path');
const oracledb = require('oracledb');
const dbConfig = require("../DB/dbconfig");
const { readImage, processImages } = require('./imageHandler.js');

const router = express.Router();
async function selectDatabase(query) {
    try {
        console.log("db 연결");
        let connection = await oracledb.getConnection(dbConfig);

        let binds = {};
        let options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

       
        let result = await connection.execute(query, binds, options);

        console.log(result.rows);

        await connection.close();

        return result.rows;
    } catch (error) {
        console.error("데이터베이스 작업 중 오류 발생:", error);
        throw error;
    }
}

async function deleteFromDatabase(query, id) {
    try {
        let connection = await oracledb.getConnection(dbConfig);

        let binds = {
            id: id
        };

        let options = {
            autoCommit: true
        };

        // DELETE 쿼리 실행
        let result = await connection.execute(query, binds, options);
        console.log(query);
        if (result.rowsAffected === 0) {
            // 삭제된 행이 없는 경우 오류 처리
            throw new Error("삭제된 행이 없습니다.");
        }
        console.log("삭제된 행 수:", result.rowsAffected);

        await connection.close();

        return result.rowsAffected; // 삭제된 행 수 반환
    } catch (error) {
        console.error("데이터베이스 작업 중 오류 발생:", error);
        throw error;
    }
}

// router.get("/db", async function (req, res) {
//     try {
//         const query = "select * from CLOTHES";
//         const result = await selectDatabase(query);
//         const resultWithUrls = await processImages(result);

//         res.json(resultWithUrls);
//     } catch (error) {
//         console.error("db error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

router.get("/db", async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1; // 클라이언트에서 페이지 번호를 전달받음
        const perPage = 10; // 한 페이지에 보여줄 아이템 수

        const totalCountQuery = "SELECT COUNT(*) as TOTALCOUNT FROM CLOTHES";
        const totalCountResult = await selectDatabase(totalCountQuery);
        const totalCount = parseInt(totalCountResult[0].TOTALCOUNT);

        console.log(totalCount);
        
        const totalPages = Math.ceil(totalCount / perPage); // 전체 페이지 수 계산
        const offset = (page - 1) * perPage; // 오프셋 계산

        const query = `
        SELECT * 
        FROM (
            SELECT c.*, ROWNUM AS rn 
            FROM CLOTHES c
        ) 
        WHERE rn BETWEEN ${offset + 1} AND ${offset + perPage}`;
        const result = await selectDatabase(query);

        const resultWithUrls = await processImages(result);

        res.json({
            totalPages: totalPages,
            currentPage: page,
            clothes: resultWithUrls
        });
    } catch (error) {
        console.error("db error:", error);
        res.status(500).send("Internal Server Error");
    }
});



router.get("/db/1", async function (req, res) { //상의 리스트 출력
    try {
        const page = parseInt(req.query.page) || 1; // 클라이언트에서 페이지 번호를 전달받음
        const perPage = 10; // 한 페이지에 보여줄 아이템 수

        const totalCountQuery = "SELECT COUNT(*) AS totalCount FROM CLOTHES WHERE category=1";
        const totalCountResult = await selectDatabase(totalCountQuery);
        const totalCount = parseInt(totalCountResult[0].TOTALCOUNT);

        const totalPages = Math.ceil(totalCount / perPage); // 전체 페이지 수 계산
        const offset = (page - 1) * perPage; // 오프셋 계산

        const query = `
            SELECT * 
            FROM (
                SELECT c.*, ROWNUM AS rn 
                FROM CLOTHES c
                WHERE category=1
            ) 
            WHERE rn BETWEEN ${offset + 1} AND ${offset + perPage}`;
        const result = await selectDatabase(query);

        const resultWithUrls = await processImages(result);

        res.json({
            totalPages: totalPages,
            currentPage: page,
            clothes: resultWithUrls
        });
    } catch (error) {
        console.error("db error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// 하의 리스트 출력
router.get("/db/2", async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        const totalCountQuery = "SELECT COUNT(*) AS totalCount FROM CLOTHES WHERE category=2";
        const totalCountResult = await selectDatabase(totalCountQuery);
        const totalCount = parseInt(totalCountResult[0].TOTALCOUNT);

        const totalPages = Math.ceil(totalCount / perPage);
        const offset = (page - 1) * perPage;

        const query = `
            SELECT * 
            FROM (
                SELECT c.*, ROWNUM AS rn 
                FROM CLOTHES c
                WHERE category=2
            ) 
            WHERE rn BETWEEN ${offset + 1} AND ${offset + perPage}`;
        const result = await selectDatabase(query);

        const resultWithUrls = await processImages(result);

        res.json({
            totalPages: totalPages,
            currentPage: page,
            clothes: resultWithUrls
        });
    } catch (error) {
        console.error("db error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// 아우터 리스트 출력
router.get("/db/3", async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        const totalCountQuery = "SELECT COUNT(*) AS totalCount FROM CLOTHES WHERE category=3";
        const totalCountResult = await selectDatabase(totalCountQuery);
        const totalCount = parseInt(totalCountResult[0].TOTALCOUNT);

        const totalPages = Math.ceil(totalCount / perPage);
        const offset = (page - 1) * perPage;

        const query = `
            SELECT * 
            FROM (
                SELECT c.*, ROWNUM AS rn 
                FROM CLOTHES c
                WHERE category=3
            ) 
            WHERE rn BETWEEN ${offset + 1} AND ${offset + perPage}`;
        const result = await selectDatabase(query);

        const resultWithUrls = await processImages(result);

        res.json({
            totalPages: totalPages,
            currentPage: page,
            clothes: resultWithUrls
        });
    } catch (error) {
        console.error("db error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// 원피스 리스트 출력
router.get("/db/4", async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        const totalCountQuery = "SELECT COUNT(*) AS totalCount FROM CLOTHES WHERE category=4";
        const totalCountResult = await selectDatabase(totalCountQuery);
        const totalCount = parseInt(totalCountResult[0].TOTALCOUNT);

        const totalPages = Math.ceil(totalCount / perPage);
        const offset = (page - 1) * perPage;

        const query = `
            SELECT * 
            FROM (
                SELECT c.*, ROWNUM AS rn 
                FROM CLOTHES c
                WHERE category=4
            ) 
            WHERE rn BETWEEN ${offset + 1} AND ${offset + perPage}`;
        const result = await selectDatabase(query);

        const resultWithUrls = await processImages(result);

        res.json({
            totalPages: totalPages,
            currentPage: page,
            clothes: resultWithUrls
        });
    } catch (error) {
        console.error("db error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// 악세사리 리스트 출력
router.get("/db/5", async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 10;

        const totalCountQuery = "SELECT COUNT(*) AS totalCount FROM CLOTHES WHERE category=5";
        const totalCountResult = await selectDatabase(totalCountQuery);
        const totalCount = parseInt(totalCountResult[0].TOTALCOUNT);

        const totalPages = Math.ceil(totalCount / perPage);
        const offset = (page - 1) * perPage;

        const query = `
            SELECT * 
            FROM (
                SELECT c.*, ROWNUM AS rn 
                FROM CLOTHES c
                WHERE category=5
            ) 
            WHERE rn BETWEEN ${offset + 1} AND ${offset + perPage}`;
        const result = await selectDatabase(query);

        const resultWithUrls = await processImages(result);

        res.json({
            totalPages: totalPages,
            currentPage: page,
            clothes: resultWithUrls
        });
    } catch (error) {
        console.error("db error:", error);
        res.status(500).send("Internal Server Error");
    }
});

/* router.delete('/clothes_delete/:id', async (req, res) => {
    const id = req.params.id; // 클라이언트가 요청한 id를 받음
    const query = `DELETE FROM CLOTHES WHERE ID = :id`;
    try {
        const result = await deleteFromDatabase(query, id);
        console.log(`${result} rows deleted.`);
        res.send(`선택한 옷 삭제 완료`);
    } catch(error){
        console.error("db delete error:", error);
        res.status(500).send("Internal Server Error, 맞는 ID인지 확인해주세요");
    }
});
 */

router.post('/clothes_delete/:ids', async (req, res) => {
    const ids = req.body.ids; // 클라이언트에서 전송한 선택된 이미지들의 ID 배열
    const query = `DELETE FROM CLOTHES WHERE ID IN (${ids.join(',')})`; // 선택된 이미지들의 ID를 이용하여 삭제 쿼리 생성
    try {
        const result = await deleteFromDatabase(query);
        console.log(`${result} rows deleted.`);
        res.send('선택한 옷 삭제 완료');
    } catch (error) {
        console.error('Error deleting images from database:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
