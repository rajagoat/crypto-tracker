const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 8080; // Choosing PORT

const Gecko_API_URL = "https://api.coingecko.com/api/v3/";

// Config use JSON parser
app.use(express.json());
//app.use(express.urlencoded({ extended: true })); //Might need if using URL encoded forms in frontend

app.get('/list', function(req, resp) {

  var url = Gecko_API_URL + '/coins/list'

  axios
    .get(url)
    .then(res => {

    console.log(resp)
    resp.send(res.data);

    })
    .catch(error => {
    console.error(error)
    })
});

app.get('/coin/:cid/', function(req, resp) {

  const cid = req.params["cid"];
  var url = Gecko_API_URL + `coins/${cid}/`;

  axios
    .get(url)
    .then(res => {

    resp.send(res.data);

    })
    .catch(error => {
    console.error(error)
    resp.send("No information")
    })
});

// Past Trends
app.get('/trend/:cid/', function(req, resp) {
  const cid = req.params["cid"];
  var url = Gecko_API_URL + `coins/${cid}/market_chart?vs_currency=CAD&days=30&interval=daily`;

  // Trendline
  axios
    .get(url)
    .then(res => {

      var prices = res.data['prices'];

      var sum = 0;

      for( price in prices){
        console.log(prices[price][1]);

        sum+=prices[price][1];
      }
      console.log('avg');
      console.log(sum/30);

    resp.send(prices);

    })
    .catch(error => {
    console.error(error)
    resp.send("No information")
    })
});

//Community Stats
app.get('/community/:cid/', function(req, resp) {
  const cid = req.params["cid"];
  const date = `30-12-2017`
  var url = Gecko_API_URL + `/coins/${cid}/history?date=${date}`;

  // Community Stats
  axios
    .get(url)
    .then(res => {

      var community_data = res.data["community_data"];
      var public_interest_stats = res.data["public_interest_stats"];

    resp.send([community_data, public_interest_stats]);

    })
    .catch(error => {
    console.error(error)
    resp.send("No information")
    })
});

// Profit/Loss
app.get('/pl/coin/:cid/amount/:amnt/', function(req, resp) {

  const cid = req.params["cid"]; // Can be multiple -- seperated by %2C in API call
  const amnt = req.params["amnt"];
  const granularity = 30;
  const date = `30-12-2017`

  var diff;

  // Use community data in coins/id/history to make expected return

  var url = Gecko_API_URL + `simple/price?ids=${cid}&vs_currencies=CAD`;

  axios
    .get(url)
    .then(res => {

    var coin = res.data[cid];
    var price_now = coin['cad'];

    console.log(price_now);

    pl = price_now - amnt;

    console.log(diff);

    url = Gecko_API_URL + `coins/${cid}/market_chart?vs_currency=CAD&days=${granularity}&interval=daily`;

    axios
      .get(url)
      .then(res => {

        var prices = res.data['prices'];

        var sum = 0;

        for( price in prices){
          sum+=prices[price][1];
        }

        var future_val = sum/30;

        var caps = res.data['market_caps'];

        var market_cap = 0;

        for( cap in caps){
          market_cap+=caps[cap][1];
        }

        var market_cap_future = market_cap/30;

          var url = Gecko_API_URL + `/coins/${cid}/history?date=${date}`;
          // Community Stats
          axios
            .get(url)
            .then(res => {

              var community_data = res.data["community_data"];
              var public_interest_stats = res.data["public_interest_stats"];

            resp.send([{"profitloss":pl}, {"future_val":future_val}, {"future_cap":market_cap_future}, {"community":community_data}, {"interest":public_interest_stats}]);

            })
            .catch(error => {
            console.error(error)
            resp.send("No information")
            })
      })
      .catch(error => {
      console.error(error)
      resp.send("No information")
    })

    })
    .catch(error => {
    console.error(error)
    resp.send("No information")
    });
});

//Risk -- Small market cap <100M (auto cat 5), Jump in price over week (-3x), If price is going up low risk (+2x), if trending (+1x), companies (low risk), market cap rank
app.get('/risk/:cid/', function(req, resp) {

  const cid = req.params["cid"];
  const granularity = 7;
  var url = Gecko_API_URL + `coins/markets?vs_currency=CAD&ids=${cid}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

  var score = 5;

  axios
    .get(url)
    .then(res => {

      var market_cap = res.data[0]['market_cap'];
      console.log("market_cap")
      console.log(market_cap)

      if (market_cap < 100000000){
        resp.send([{"cat" : 1}]);
      }

      var url = Gecko_API_URL + `coins/${cid}/market_chart?vs_currency=CAD&days=7&interval=daily`;

      axios
        .get(url)
        .then(res => {

          var prices = res.data['prices'];

          var lastweek = prices[6][1];

          var now = prices[0][1];

          if((now-lastweek)>lastweek){
            score -= Math.abs(now-lastweek)*3;
          }

          url = Gecko_API_URL + `coins/${cid}/market_chart?vs_currency=CAD&days=30&interval=daily`;

          // Trendline
          axios
            .get(url)
            .then(res => {

              var prices = res.data['prices'];

              var sum = 0;

              for( price in prices){
                sum+=prices[price][1];
              }

              var avg = sum/30;

              console.log("modifying score for change in past week")
              score -= ((now - avg)/avg)*5;

              url = Gecko_API_URL + `/search/trending`;

              axios
                .get(url)
                .then(res => {

                items = res.data["coins"];

                for(item in items){
                  if(cid == items[item]['item']['id']){
                    score += 0.5;
                  }
                }

                console.log(score);

                if(score > 5){
                  resp.send([{"cat" : 5}]);
                }

                if(score < 1){
                  resp.send([{"cat" : 1}]);
                }

                resp.send([{"cat" : score}]);


                })
                .catch(error => {
                console.error(error)
                })

            })
            .catch(error => {
            console.error(error)
            resp.send("No information")
            })

        })
        .catch(error => {
        console.error(error)
        resp.send("No information")
        })

    })
    .catch(error => {
    console.error(error)
    resp.send("No information")
  })
});

// Start server at selected PORT
app.listen(port);
console.log('Server started at http://localhost:' + port);
