const express = require('express');
var router = express.Router();
const http = require('http');
const cheerio = require('cheerio');
var iconv = require('iconv-lite');

let basePath = 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2017/';

router.get('/', function(req, res, next) {
   res.render('index.html', { title: '简单nodejs爬虫' });
});

// 获取省
router.get('/boss/provice', function(req, res, next) {
    let Res = res
    http.get(basePath+'index.html', function(res) {
        var chunks = [];
        var size = 0;
        // 获取页面数据
        res.on('data', function(chunk) {
            chunks.push(chunk)
            size += chunk.length
        });
        // 数据获取结束
        res.on('end', function() {
            var data = Buffer.concat(chunks,size);  
            var change_data = iconv.decode(data,'gb2312'); 
            var html = change_data.toString();
            let list = dealProvice(html)|| []
            Res.json({  //返回json格式数据给浏览器端
                list
            });
        });
    }).on('error', function() {
        console.log('获取数据出错！');
    })
})

// 获取市
router.get('/boss/city', function(req, res, next) { // 浏览器端发来get请求
    let path = req.query.path
    let Res = res
    http.get(basePath+path, function(res) {
        var chunks = [];
        var size = 0;
        // 获取页面数据
        res.on('data', function(chunk) {
            chunks.push(chunk)
            size += chunk.length
        });
        // 数据获取结束
        res.on('end', function() {
            var data = Buffer.concat(chunks,size);  
            var change_data = iconv.decode(data,'gb2312'); 
            var html = change_data.toString();
            let list = dealCity(html,'citytr')|| []
            Res.json({list});
        });
    }).on('error', function() {
        console.log('获取数据出错！');
    })
})

// 获取区
router.get('/boss/area', function(req, res, next) { // 浏览器端发来get请求
    let path = req.query.path
    let Res = res
    http.get(basePath+path, function(res) {
        var chunks = [];
        var size = 0;
        // 获取页面数据
        res.on('data', function(chunk) {
            chunks.push(chunk)
            size += chunk.length
        });
        // 数据获取结束
        res.on('end', function() {
            var data = Buffer.concat(chunks,size);  
            var change_data = iconv.decode(data,'gb2312'); 
            var html = change_data.toString();
            let list = dealCity(html,'countytr')|| []
            Res.json({list});
        });
    }).on('error', function() {
        console.log('获取数据出错！');
    })
})
/* 处理省 */
function dealProvice(html) {
    if (html) {
        var $ = cheerio.load(html);
        var list = $('.provincetr');
        var listData = [];
        list.find('td').each(function(item) {
            let el = $(this)
            var path = el.find('a').attr('href');
            var text = el.find('a').text()
            listData.push({path,text});
        });
        return listData;
    } else {
        console.log('无数据传入！');
    }
}

/* 处理市,区 */
function dealCity(html,lab) {
    if (html) {
        var $ = cheerio.load(html);
        var list = $('.'+ lab);
        var listData = [];
        list.each(function(item) {
            let el = $(this)
            let tds = el.find('td')
            var path = $(tds[0]).find('a').attr('href');
            var code = $(tds[0]).find('a').text();
            var text = $(tds[1]).find('a').text()
            listData.push({path,text,code});
        });
        return listData;
    } else {
        console.log('无数据传入！');
    }
}
module.exports = router;