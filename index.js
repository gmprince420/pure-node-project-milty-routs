const http = require("http");
const fs = require("fs")

const htmlfont = fs.readFileSync("index.html", "utf-8")
const dataAPI = JSON.parse(fs.readFileSync("data.json", "utf-8"))
const product = dataAPI.products

const server = http.createServer((req, res) => {


  if (req.url.startsWith('/product')) {
    const id = req.url.split("/")[2]
    const products = product.find(p => p.id === (+id))
    res.setHeader("Content-type", "text/html")
    const index2 = htmlfont.replace("**title**", products.title)
      .replace("**price**", products.price)
      .replace("**url**", products.thumbnail)
      .replace("**rating**", products.rating)
    res.end(index2)
    console.log(id);
    console.log(products);
    return
  }
  console.log("server started");
  console.log(req.url);
  switch (req.url) {
    case '/':
      res.setHeader("Content-type", "text/html")
      res.end(htmlfont)
      break;
    case '/api':
      res.setHeader("Content-Type", "application/json")
      res.end(JSON.stringify(dataAPI));
      break;
    default:
      res.writeHead(404)
      res.end()
  }

})

server.listen(4000) 