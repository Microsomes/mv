const puppeteer = require("puppeteer");
const axios = require("axios");
 const fs= require("fs");

 



async function processSVGTO64({ svg }) {
    return new Promise(async (resolve, reject) => {
        
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            

        });
        const page = await browser.newPage();
 
        await page.setViewport({
        height:1000,
        width:500
         })

        await page.goto('https://bakerdev-7cc25.web.app/generate?admin=1');

        await page.evaluate(async(svg)=>{
            document.querySelector("#svgContainer2").innerHTML=svg;
        },svg)

        await page.waitFor(4000);



 


        var element = await page.$('#svgContainer2');        // declare a variable with an ElementHandle
        await element.screenshot({path: 'output1.png'});
        function base64_encode(file) {
            // read binary data
            var bitmap = fs.readFileSync(file);
            // convert binary data to base64 encoded string
            return new Buffer(bitmap).toString('base64');
        }

        var base64str = base64_encode("output1.png");

        await page.evaluate(()=>{
            document.querySelectorAll("g").forEach(gi=>{
                if(gi.id.includes("3D")){
                    document.querySelector("#"+gi.id).style.display="none";
                }else if(gi.id.includes("2D")){
                    document.querySelector("#"+gi.id).style.display="";
                }else{
                    console.log("vooob")
                }
            })
          })

        await page.waitFor(4000);


         element = await page.$('#svgContainer2');        // declare a variable with an ElementHandle
        await element.screenshot({path: 'output1.png'});
        function base64_encode(file) {
            // read binary data
            var bitmap = fs.readFileSync(file);
            // convert binary data to base64 encoded string
            return new Buffer(bitmap).toString('base64');
        }

        var twod = base64_encode("output1.png");

        resolve({
            twod:twod,
            png:base64str

        });

        //await browser.close();

 

    });
}



module.exports = {
    processSVGTO64
}