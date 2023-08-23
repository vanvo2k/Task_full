import express from "express";
import cors from "cors";
import { Action } from "./handle";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/action", (req, res) => {
  const html = `
    <html>
      <head>
        <title>Node.js App</title>
        <style>
            .shell{
                width:1000px;
                height:600px;
                margin:auto;
                display:flex;
                align-items: center;
                justify-content: center;
                position:relative;
                border-radius:50px;
                box-shadow:0 0 10px 1px gray;
                margin-top:100px;
            }
            .img1{
                position:absolute;
                top:0px;
                width:500px;
                height:280px;
            }
            #writeButton{
                padding:10px;
                border-radius:10px;
                background-color:black;
                color:white;
                font-weight:bold;
                cursor:pointer;
            }
            #writeButton:active{
                scale:0.8;
            }
            *{
                user-select:none
            }
        </style>
      </head>
      <body>
        <div class="shell">
            <a href="/action">
                <button id="writeButton">Execute Write Function</button>
            </a>
            :
            <a href="https://docs.google.com/spreadsheets/d/1SJOv70puHEQwrSoZIshIVhHq-NKS9fhvoyOwlK1Lhgs/edit#gid=0">Link GG-Sheet</a>
            <img class="img1" src="https://art.pixilart.com/028d26275ff2b38.gif"/>
        </div>
        <script>
          document.getElementById("writeButton").addEventListener("click", async () => {
            window.location.href="./action";
          });
        </script>
        
      </body>
    </html>
  `;
  res.send(html);
});
app.use("/", Action);
export const viteNodeApp = app;
