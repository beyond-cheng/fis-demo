var express = require('express');
var path = require('path');
var app = express();


// 静态文件输出
app.use(express.static(__dirname, {
    index: ['index.html', 'index.htm', 'default.html', 'default.htm'],
    extensions: ['html', 'htm']
}));

// 错误捕获。
app.use(function(err, req, res, next) {
    console.log(err);
});

app.listen(4000, function () {
    console.log('listen on 4000');
});
