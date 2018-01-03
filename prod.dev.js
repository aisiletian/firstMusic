var express = require("express")
var axios = require("axios")

var app = express()
app.get('/api/lyric', function (req, res) {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios.get(url, {
    	headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        var ret = response.data
        if (typeof ret === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if (matches) {
              ret = JSON.parse(matches[1])
            }
        }
        res.json(ret)
    }).catch((e) => {
        console.log(e)
    })
})

app.use(express.static("./dist"))

var port = 9000

app.listen(port, function(err){
	if(err){
		console.log(err)
		return
	}
    console.log("Listening at http://localhost:" + port + "\n")
})
