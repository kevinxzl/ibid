var express = require('express');
var path = require('path');
var ws_1 = require('ws');
var app = express();
app.use('/', express.static(path.join(__dirname, '..', 'client')));
var Product = (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
})();
exports.Product = Product; // End Product
var Comment = (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
})();
exports.Comment = Comment; // End Comment
var products = [
    new Product(1, "春山泉韵", 599.00, 3.5, "郭立成，男，1958年生于江苏省南京市。1985年江苏省国画院学员班毕业。现为山水画研究所所长。国家一级美术师", ["中国绘画"]),
    new Product(2, "五彩花卉牡丹大盘", 15000.00, 4.5, "年代：清晚期 宽度：45厘米 高度：53厘米", ["古瓷雕塑"]),
    new Product(3, "武圣帝君", 6900, 3.5, "田永，1972年出生于四川锦阳,1990年毕业于山西大学美术系.同年进入63军政治部服兵役.1991年山西美术院太原画院特聘画", ["中国绘画"]),
    new Product(4, "特洛伊的传说", 1000, 2.5, "《特洛伊的传说》是我2017年完成的木刻版画作品，题材取自希腊神话特洛伊故事中拉奥孔的形象。", ["西画雕塑"]),
    new Product(5, "黄苗子 行书对联", 12000, 4.8, "黄苗子，小时侯在香港读书，喜爱诗画文艺，8岁习书法。12岁从名师邓尔雅先生学书。其后在上海从事美术漫画活动", ["书法篆刻"]),
    new Product(6, "现代 白度母", 1800.00, 3.6, "白度母(White Tara)，藏音译卓玛嘎尔姆，又称为增寿救度佛母，是观世音菩萨的化身。", ["当代工业"])
];
var comments = [
    new Comment(1, 1, "2017-05-01 14:25:52", "张三峰", 3, "很好"),
    new Comment(2, 1, "2017-05-02 09:36:43", "令狐冲", 2.5, "好"),
    new Comment(3, 1, "2017-05-03 11:49:36", "欧阳峰", 1.6, "不错"),
    new Comment(4, 2, "2017-05-04 09:10:22", "杨过", 4.8, "可以")
];
var categories = ["中国绘画", "书法篆刻", "西画雕塑", "古瓷雕塑", "当代工业"];
app.get('/api/products', function (req, res) {
    var result = products;
    var params = req.query;
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if ((params.category) && (result.length > 0)) {
        result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
    }
    res.json(result);
});
app.get('/api/categories', function (req, res) {
    res.json(categories);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("Server is running...");
});
var wsServer = new ws_1.Server({ port: 8085 });
