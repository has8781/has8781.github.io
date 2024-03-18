const express = require("express");
const cors = require('cors')
const morgan = require("morgan");
const { swaggerUi, specs } = require('./swagger'); 
const db = require('./routers/db');
const oracledb = require('oracledb');
const app = express();
const path = require('path');

init();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger UI 설정
app.use(morgan("dev"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 옷장 관련 router (현재는 옷장 리스트만 존재)
app.use('/', db);

function init() { //오라클 db용 init 설정
    oracledb.initOracleClient({ libDir: 'C:\\Oracle\\instantclient-basic-windows.x64-11.2.0.4.0\\instantclient_11_2' });
}

const server = app.listen(12000, function () {
    console.log('Server is running...');
});
