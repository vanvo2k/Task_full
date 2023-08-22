import { google } from "googleapis";
import axios from "axios";
import cheerio from "cheerio";
// Web DreamShip + Get Data be request from rows, colums
// SOURCE_MAIN_info= https://docs.google.com/spreadsheets/d/1b03YGc5HCsgSJ_caqwINesuMg0sDnqNC/edit#gid=1667872402
// URL_Sheet_toDo= https://docs.google.com/spreadsheets/d/1SJOv70puHEQwrSoZIshIVhHq-NKS9fhvoyOwlK1Lhgs/edit#gid=0
const Handle_1 = async (req, res) => {
  try {
    // ++++++++++++++++++++++++++++++++++++ Area Config System
    const codeAuthor = {
      type: "service_account",
      project_id: "useful-monitor-396010",
      private_key_id: "a88b8620310d28e5bacbe58e009547e716c688b6",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIurLPEV50qTvG\n7Xy+cV8/X3BTvzMcZQUkuHEnySHwwnwNtt4WCoznIv/MKPYuQkBGoOrHUwx4LEcI\nWa1Su1wOK6E64dAcFXEdmSgU2KngPDmxz7CU+aZjay4dYH8W+Wv5X9cdk5k2036l\nLH5Lo4Ioc0XMs+sm3Hv9IHyDKqgKyxDM2nHvp/LsFQUctoM1BCjlTpZc5jo1RDDX\n5mac7vit02LcGtNK04clYmqELsnRQgOfCYKQ2v1ufnGnTW6dbwEHZSMglAmH9BB8\nJjc5SbXI3XVJv7jSC32pDy4Ud6O4a/K7arr7B4QxAk6itXDSweLP6lG3871mnos8\nheBNfPJHAgMBAAECggEAELDhlHFLyuSVmWV/BXD07BaaBwSzkc1en56MnjPN1DC/\n0v4dOnT3IXMaFRZk3hTZNmZED3363/VClNGsJWB5952uIvDK9sLbrIvjNtSLT5+C\nZqQv+TtHGCY95+hxuO3Vih9rikSPLW1prv9joxN+C7IGIE7no0wbLUGpyNhfr8Hs\nAOWLFobjZ+MD3S2V21k6vdEJF07o2ZT8jpKpYfjpBwtUb2Sa+INXqc5AAoAQg0sh\nhPeF9rtXHfXim2BnPIne/6cmPT76YRYCA5ail0Pn+LYZOR0by/N2NghdrWL1SEJc\nwvd02pP1Voi4A7kukUcOH7/ioUQ4u8ZoGx3XYsBNDQKBgQD8iJqVw7iot7kNf2Cr\nf54eCVmK+85TxDwgbqwP2Ghh6FBNyzaK0+XmErZtOb0XH6FF6zZ3A59JZHicmuKQ\ny/4XPqH+CWvLIlIum1iZMm77cXxmTWo1Q83liGjdN2vLRvfjmKAPXWbUTe5m+vzT\nbpsgJsYg32WVHw2bIPWdUL029QKBgQDLfA5A1u5siBldqZ9EBETBUJxtVU1aMVay\nXFiSEc/xdlzkIRLF4xPcKavJZKdYSzAxhOSAEM0Idz5jnFqVbfx0vY0mbyhzAgv/\nihm8GLqtuPhZsTnfTGn6zXM+A4+VfbUe+aE4x4QtFJyy8y4dE3aIFv8Dq60LaZgh\nhrJR2eImywKBgQC83pH3Bq26CcZuUOEFAupH/qgoqVFUFwT9IKixJSJUb4J33E9L\nn1VnMIGdyTwh6jcc6uEOO/hK1MjcH37p2peL3P0c2QD0qROb5fVqhmy4w9TNUoLn\nmXGJhO8g3A1TuB037HNxamK40BxIitjCbQu6DSXLeikoUVREvG7WHIeXbQKBgQC8\nGMgALe4ly0VPbG257Qw1erOu6WxglD0lEPIazHZhKV3Cz8PPwxHnsWmH+BAtMQuy\nqrqim2U8jyXP5IdjnFEDBPlGbviAH4NBy8HwOxfNYK/KEWaCwNsyqNn/mEERGivk\nHzNmDiBjn6seTGbzH7uxHzjKhtamNw0W6LFLslI4MwKBgCd4DUnDZC1pSFRge4h3\n3rlQ5xhgZNe1xAtXVFpiL8klotOsM0KN/125lHsG/yk1puhbhVz62CMV3l9PYkV3\nBqm2H+wAOtEyPadHh6iOFbRSJQQrHECU42ds7e+TCdtSgFnskHixJYPrwaOe8vdr\nzhhdZU0e+UId9O4GpxK/GJPG\n-----END PRIVATE KEY-----\n",
      client_email: "project-1@useful-monitor-396010.iam.gserviceaccount.com",
      client_id: "103189030119684332388",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/project-1%40useful-monitor-396010.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };
    const auth = new google.auth.GoogleAuth({
      credentials: codeAuthor,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const client = await auth.getClient();
    const sheets = google.sheets({
      version: "v4",
      auth: client,
    });
    // ++++++++++++++++++++++++++++++++++++ Area get data web: DreamShip paste sheets =========== OK
    const { data } = await axios.get(
      "https://dreamship.com/page-data/en/catalog/item/7/page-data.json"
    ); // get place
    const DataFinaly = data.result.data.catalogItem.data.item_variants; // toan bo gia tuong ung vs COLOR va SIZE

    const DataOK = []; //Color: Black with full Size
    DataFinaly.map((item) => {
      if (item.color == 46) {
        DataOK.push(item);
      }
    });
    let count = 5; //set place Sheets need paste
    DataOK.map((items) => {
      const ID_Sheet_Paste1 = "1SJOv70puHEQwrSoZIshIVhHq-NKS9fhvoyOwlK1Lhgs"; // ID GG-Sheet
      sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheet_Paste1,
        range: `Sheet1!W${count}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want fomat
        resource: {
          values: [[Number(items.basic_cost)]],
        },
      });
      count++;
    });
    // ++++++++++++++++++++++++++++++++++++ Area get data web: PrintWay paste sheets =========== Ok
    // const url ="https://printway.io/collections/made-in-usa/products/classic-unisex-t-shirt";// get place
    // const responseAPI = await axios.get(url);
    // const html = responseAPI.data;
    // const $ = cheerio.load(html);
    // const SaveData = $('script[type="application/ld+json"]');
    // const Convert1 = [];
    // const Convert2 = [];
    // SaveData.each((index, element) => {
    //   const jsonData = $(element).html();
    //   const SetJson = jsonData.slice(345, 6010);// return res.status(200).json(SetJson);
    //   Convert1.push(SetJson);
    // });
    // const Result = JSON.parse(Convert1[1]);
    // Result.map((item) => {
    //   Convert2.push(Number(item.price));
    // });// console.log(Convert2); === Data Web PrintWay

    // const SizeS = [[Convert2[0], Convert2[8], Convert2[16]]];
    // const SizeM = [[Convert2[1], Convert2[9], Convert2[17]]];
    // const SizeL = [[Convert2[2], Convert2[10], Convert2[18]]];
    // const SizeXL = [[Convert2[3], Convert2[11], Convert2[19]]];
    // const Size2XL = [[Convert2[4], Convert2[12], Convert2[20]]];
    // const Size3XL = [[Convert2[5], Convert2[13], Convert2[21]]];
    // const Size4XL = [[Convert2[6], Convert2[14], Convert2[22]]];
    // const Size5XL = [[Convert2[7], Convert2[15], Convert2[23]]];
    // console.log(SizeS);
    // console.log(SizeM);
    // console.log(SizeL);
    // console.log(SizeXL);
    // console.log(Size2XL);
    // console.log(Size3XL);
    // console.log(Size4XL);
    // console.log(Size5XL);

    // const ID_Sheet_Paste2 = "1SJOv70puHEQwrSoZIshIVhHq-NKS9fhvoyOwlK1Lhgs"; // ID GG-Sheet
    // sheets.spreadsheets.values.update({// - Size S
    //   auth: client,
    //   spreadsheetId: ID_Sheet_Paste2,
    //   range: `Sheet1!Q5`, // collum 2
    //   valueInputOption: "RAW", // or 'USER_ENTERED' if want format
    //   resource: {
    //     values: SizeS,
    //   },
    // });
    // sheets.spreadsheets.values.update({// - Size M
    //   auth: client,
    //   spreadsheetId: ID_Sheet_Paste2,
    //   range: `Sheet1!Q6`, // collum 2
    //   valueInputOption: "RAW", // or 'USER_ENTERED' if want format
    //   resource: {
    //     values: SizeM,
    //   },
    // });
    // sheets.spreadsheets.values.update({// - Size L
    //   auth: client,
    //   spreadsheetId: ID_Sheet_Paste2,
    //   range: `Sheet1!Q7`, // collum 2
    //   valueInputOption: "RAW", // or 'USER_ENTERED' if want format
    //   resource: {
    //     values: SizeL,
    //   },
    // });
    // sheets.spreadsheets.values.update({// - Size XL
    //   auth: client,
    //   spreadsheetId: ID_Sheet_Paste2,
    //   range: `Sheet1!Q8`, // collum 2
    //   valueInputOption: "RAW", // or 'USER_ENTERED' if want format
    //   resource: {
    //     values: SizeXL,
    //   },
    // });
    // sheets.spreadsheets.values.update({// - Size 2XL
    //   auth: client,
    //   spreadsheetId: ID_Sheet_Paste2,
    //   range: `Sheet1!Q9`, // collum 2
    //   valueInputOption: "RAW", // or 'USER_ENTERED' if want format
    //   resource: {
    //     values: Size2XL,
    //   },
    // });
    // sheets.spreadsheets.values.update({// - Size 3XL
    //   auth: client,
    //   spreadsheetId: ID_Sheet_Paste2,
    //   range: `Sheet1!Q10`, // collum 2
    //   valueInputOption: "RAW", // or 'USER_ENTERED' if want format
    //   resource: {
    //     values: Size3XL,
    //   },
    // });
    // sheets.spreadsheets.values.update({// - Size 4XL
    //   auth: client,
    //   spreadsheetId: ID_Sheet_Paste2,
    //   range: `Sheet1!Q11`, // collum 2
    //   valueInputOption: "RAW", // or 'USER_ENTERED' if want format
    //   resource: {
    //     values: Size4XL,
    //   },
    // });
    // sheets.spreadsheets.values.update({// - Size 5XL
    //   auth: client,
    //   spreadsheetId: ID_Sheet_Paste2,
    //   range: `Sheet1!Q12`, // collum 2
    //   valueInputOption: "RAW", // or 'USER_ENTERED' if want format
    //   resource: {
    //     values: Size5XL,
    //   },
    // });
    // ++++++++++++++++++++++++++++++++++++ Area get sheets and paste sheets =========== Pendding
    let ID_Sheets_Paste = "1SJOv70puHEQwrSoZIshIVhHq-NKS9fhvoyOwlK1Lhgs"; // ID GG-Sheet Paste
    let ID_Sheet_Prinway = "1HnB7dVqd1JRrar3D8Bre4ZBPG34_qNOkPBGxITzoghI"; //PRINTWAY
    let ID_Sheets_Merchize = "1kPMjgrYWRr2jj1HEuS9JLhRYiCfJ-SzdImOY8mJrKVs"; //MERCHIZE

    // US - PrintWay + Merchize

    let count_US = 5;
    for (let i = 3; i <= 10; i++) {
      const responseMerchize_US1 = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: ID_Sheets_Merchize,
        ranges: [`US!F${i}`, `US!i${i}`],
      });
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheets_Paste,
        range: `Sheet1!L${count_US}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want fomat
        resource: {
          values: [
            responseMerchize_US1.data.valueRanges.map(
              (range) => range.values[0][0]
            ),
          ],
        },
      });
      count_US++;
    }
    let arrayPrinway_US_colums_1 = [52, 56, 58, 61, 64, 67, 70, 73];
    let countPrinway_US_colums_1 = 5;
    for (let i = 0; i <= 7; i++) {
      const responsePrintway_US1 = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: ID_Sheet_Prinway,
        ranges: [
          `Made in US!F${arrayPrinway_US_colums_1[i]}`,
          `Made in US!G${arrayPrinway_US_colums_1[i]}`,
        ],
      });
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheets_Paste,
        range: `Sheet1!Q${countPrinway_US_colums_1}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want format
        resource: {
          values: [
            responsePrintway_US1.data.valueRanges.map(
              (range) => range.values[0][0]
            ),
          ],
        },
      });
      countPrinway_US_colums_1++;
      if (countPrinway_US_colums_1 > 12) {
        break;
      } // prevent to loop x2
    }

    console.log("Đã update data handle-1 on Google-Sheet !");
  } catch (error) {
    res.status(400).json({
      Message:
        "Loi He Thong =============================================+++> Handle-1",
      error,
    });
  }
};
const Handle_2 = async (req, res) => {
  try {
    // ++++++++++++++++++++++++++++++++++++ Area Config System
    const codeAuthor = {
      type: "service_account",
      project_id: "useful-monitor-396010",
      private_key_id: "a88b8620310d28e5bacbe58e009547e716c688b6",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIurLPEV50qTvG\n7Xy+cV8/X3BTvzMcZQUkuHEnySHwwnwNtt4WCoznIv/MKPYuQkBGoOrHUwx4LEcI\nWa1Su1wOK6E64dAcFXEdmSgU2KngPDmxz7CU+aZjay4dYH8W+Wv5X9cdk5k2036l\nLH5Lo4Ioc0XMs+sm3Hv9IHyDKqgKyxDM2nHvp/LsFQUctoM1BCjlTpZc5jo1RDDX\n5mac7vit02LcGtNK04clYmqELsnRQgOfCYKQ2v1ufnGnTW6dbwEHZSMglAmH9BB8\nJjc5SbXI3XVJv7jSC32pDy4Ud6O4a/K7arr7B4QxAk6itXDSweLP6lG3871mnos8\nheBNfPJHAgMBAAECggEAELDhlHFLyuSVmWV/BXD07BaaBwSzkc1en56MnjPN1DC/\n0v4dOnT3IXMaFRZk3hTZNmZED3363/VClNGsJWB5952uIvDK9sLbrIvjNtSLT5+C\nZqQv+TtHGCY95+hxuO3Vih9rikSPLW1prv9joxN+C7IGIE7no0wbLUGpyNhfr8Hs\nAOWLFobjZ+MD3S2V21k6vdEJF07o2ZT8jpKpYfjpBwtUb2Sa+INXqc5AAoAQg0sh\nhPeF9rtXHfXim2BnPIne/6cmPT76YRYCA5ail0Pn+LYZOR0by/N2NghdrWL1SEJc\nwvd02pP1Voi4A7kukUcOH7/ioUQ4u8ZoGx3XYsBNDQKBgQD8iJqVw7iot7kNf2Cr\nf54eCVmK+85TxDwgbqwP2Ghh6FBNyzaK0+XmErZtOb0XH6FF6zZ3A59JZHicmuKQ\ny/4XPqH+CWvLIlIum1iZMm77cXxmTWo1Q83liGjdN2vLRvfjmKAPXWbUTe5m+vzT\nbpsgJsYg32WVHw2bIPWdUL029QKBgQDLfA5A1u5siBldqZ9EBETBUJxtVU1aMVay\nXFiSEc/xdlzkIRLF4xPcKavJZKdYSzAxhOSAEM0Idz5jnFqVbfx0vY0mbyhzAgv/\nihm8GLqtuPhZsTnfTGn6zXM+A4+VfbUe+aE4x4QtFJyy8y4dE3aIFv8Dq60LaZgh\nhrJR2eImywKBgQC83pH3Bq26CcZuUOEFAupH/qgoqVFUFwT9IKixJSJUb4J33E9L\nn1VnMIGdyTwh6jcc6uEOO/hK1MjcH37p2peL3P0c2QD0qROb5fVqhmy4w9TNUoLn\nmXGJhO8g3A1TuB037HNxamK40BxIitjCbQu6DSXLeikoUVREvG7WHIeXbQKBgQC8\nGMgALe4ly0VPbG257Qw1erOu6WxglD0lEPIazHZhKV3Cz8PPwxHnsWmH+BAtMQuy\nqrqim2U8jyXP5IdjnFEDBPlGbviAH4NBy8HwOxfNYK/KEWaCwNsyqNn/mEERGivk\nHzNmDiBjn6seTGbzH7uxHzjKhtamNw0W6LFLslI4MwKBgCd4DUnDZC1pSFRge4h3\n3rlQ5xhgZNe1xAtXVFpiL8klotOsM0KN/125lHsG/yk1puhbhVz62CMV3l9PYkV3\nBqm2H+wAOtEyPadHh6iOFbRSJQQrHECU42ds7e+TCdtSgFnskHixJYPrwaOe8vdr\nzhhdZU0e+UId9O4GpxK/GJPG\n-----END PRIVATE KEY-----\n",
      client_email: "project-1@useful-monitor-396010.iam.gserviceaccount.com",
      client_id: "103189030119684332388",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/project-1%40useful-monitor-396010.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };
    const auth = new google.auth.GoogleAuth({
      credentials: codeAuthor,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const client = await auth.getClient();
    const sheets = google.sheets({
      version: "v4",
      auth: client,
    });

    let ID_Sheets_Paste = "1SJOv70puHEQwrSoZIshIVhHq-NKS9fhvoyOwlK1Lhgs"; // ID GG-Sheet Paste
    let ID_Sheet_Prinway = "1HnB7dVqd1JRrar3D8Bre4ZBPG34_qNOkPBGxITzoghI"; //PRINTWAY
    let ID_Sheets_Merchize = "1kPMjgrYWRr2jj1HEuS9JLhRYiCfJ-SzdImOY8mJrKVs"; //MERCHIZE
    // ++++++++++++++++++++++++++++++++++++ Area get data web: PrintWay paste sheets =========== Ok
    // VN - PrintWay + Merchize

    let count_VN = 13;
    for (let i = 121; i <= 128; i++) {
      const responseMerchize_US2 = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: ID_Sheets_Merchize,
        ranges: [`VN!H${i}`, `VN!K${i}`],
      });
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheets_Paste,
        range: `Sheet1!I${count_VN}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want fomat
        resource: {
          values: [
            responseMerchize_US2.data.valueRanges.map(
              (range) => range.values[0][0]
            ),
          ],
        },
      });
      count_VN++;
    }

    let arrayPrinway_VN_colums_1 = [263, 264, 265, 266, 267, 268, 269, 270];
    let countPrinway_VN_colums_1 = 13;
    for (let i = 0; i <= 7; i++) {
      const responsePrintway_VN2 = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: ID_Sheet_Prinway,
        ranges: [`Made in CN!E${arrayPrinway_VN_colums_1[i]}`],
      });
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheets_Paste,
        range: `Sheet1!Q${countPrinway_VN_colums_1}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want format
        resource: {
          values: [
            responsePrintway_VN2.data.valueRanges.map(
              (range) => range.values[0][0]
            ),
          ],
        },
      });
      countPrinway_VN_colums_1++;
      if (countPrinway_VN_colums_1 > 20) {
        break;
      } // prevent to loop x2
    }
    // EU - PrintWay + Merchize

    let count_EU = 21;
    for (let i = 11; i <= 15; i++) {
      const responseMerchize_EU3 = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: ID_Sheets_Merchize,
        ranges: [`EU!I${i}`, `EU!K${i}`],
      });
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheets_Paste,
        range: `Sheet1!L${count_EU}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want fomat
        resource: {
          values: [
            responseMerchize_EU3.data.valueRanges.map(
              (range) => range.values[0][0]
            ),
          ],
        },
      });
      count_EU++;
    }
    let arrayPrinway_EU_colums_1 = [1533, 1536, 1539, 1542, 1545];
    let countPrinway_EU_colums_1 = 21;
    for (let i = 0; i <= 4; i++) {
      const responsePrintway_EU1 = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: ID_Sheet_Prinway,
        ranges: [
          `Made in EU!G${arrayPrinway_EU_colums_1[i]}`,
          `Made in EU!H${arrayPrinway_EU_colums_1[i]}`,
        ],
      });
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheets_Paste,
        range: `Sheet1!Q${countPrinway_EU_colums_1}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want format
        resource: {
          values: [
            responsePrintway_EU1.data.valueRanges.map(
              (range) => range.values[0][0]
            ),
          ],
        },
      });
      countPrinway_EU_colums_1++;
      if (countPrinway_EU_colums_1 > 25) {
        break;
      } // prevent to loop x2
    }
    console.log("Đã update data handle-2 on Google-Sheet !");
  } catch (error) {
    return res.status(400).json({
      message:
        "Loi He Thong =============================================+++> Handle-2",
    });
  }
};
const Handle_3 = async (req, res) => {
  try {
    // ++++++++++++++++++++++++++++++++++++ Area Config System
    const codeAuthor = {
      type: "service_account",
      project_id: "useful-monitor-396010",
      private_key_id: "a88b8620310d28e5bacbe58e009547e716c688b6",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIurLPEV50qTvG\n7Xy+cV8/X3BTvzMcZQUkuHEnySHwwnwNtt4WCoznIv/MKPYuQkBGoOrHUwx4LEcI\nWa1Su1wOK6E64dAcFXEdmSgU2KngPDmxz7CU+aZjay4dYH8W+Wv5X9cdk5k2036l\nLH5Lo4Ioc0XMs+sm3Hv9IHyDKqgKyxDM2nHvp/LsFQUctoM1BCjlTpZc5jo1RDDX\n5mac7vit02LcGtNK04clYmqELsnRQgOfCYKQ2v1ufnGnTW6dbwEHZSMglAmH9BB8\nJjc5SbXI3XVJv7jSC32pDy4Ud6O4a/K7arr7B4QxAk6itXDSweLP6lG3871mnos8\nheBNfPJHAgMBAAECggEAELDhlHFLyuSVmWV/BXD07BaaBwSzkc1en56MnjPN1DC/\n0v4dOnT3IXMaFRZk3hTZNmZED3363/VClNGsJWB5952uIvDK9sLbrIvjNtSLT5+C\nZqQv+TtHGCY95+hxuO3Vih9rikSPLW1prv9joxN+C7IGIE7no0wbLUGpyNhfr8Hs\nAOWLFobjZ+MD3S2V21k6vdEJF07o2ZT8jpKpYfjpBwtUb2Sa+INXqc5AAoAQg0sh\nhPeF9rtXHfXim2BnPIne/6cmPT76YRYCA5ail0Pn+LYZOR0by/N2NghdrWL1SEJc\nwvd02pP1Voi4A7kukUcOH7/ioUQ4u8ZoGx3XYsBNDQKBgQD8iJqVw7iot7kNf2Cr\nf54eCVmK+85TxDwgbqwP2Ghh6FBNyzaK0+XmErZtOb0XH6FF6zZ3A59JZHicmuKQ\ny/4XPqH+CWvLIlIum1iZMm77cXxmTWo1Q83liGjdN2vLRvfjmKAPXWbUTe5m+vzT\nbpsgJsYg32WVHw2bIPWdUL029QKBgQDLfA5A1u5siBldqZ9EBETBUJxtVU1aMVay\nXFiSEc/xdlzkIRLF4xPcKavJZKdYSzAxhOSAEM0Idz5jnFqVbfx0vY0mbyhzAgv/\nihm8GLqtuPhZsTnfTGn6zXM+A4+VfbUe+aE4x4QtFJyy8y4dE3aIFv8Dq60LaZgh\nhrJR2eImywKBgQC83pH3Bq26CcZuUOEFAupH/qgoqVFUFwT9IKixJSJUb4J33E9L\nn1VnMIGdyTwh6jcc6uEOO/hK1MjcH37p2peL3P0c2QD0qROb5fVqhmy4w9TNUoLn\nmXGJhO8g3A1TuB037HNxamK40BxIitjCbQu6DSXLeikoUVREvG7WHIeXbQKBgQC8\nGMgALe4ly0VPbG257Qw1erOu6WxglD0lEPIazHZhKV3Cz8PPwxHnsWmH+BAtMQuy\nqrqim2U8jyXP5IdjnFEDBPlGbviAH4NBy8HwOxfNYK/KEWaCwNsyqNn/mEERGivk\nHzNmDiBjn6seTGbzH7uxHzjKhtamNw0W6LFLslI4MwKBgCd4DUnDZC1pSFRge4h3\n3rlQ5xhgZNe1xAtXVFpiL8klotOsM0KN/125lHsG/yk1puhbhVz62CMV3l9PYkV3\nBqm2H+wAOtEyPadHh6iOFbRSJQQrHECU42ds7e+TCdtSgFnskHixJYPrwaOe8vdr\nzhhdZU0e+UId9O4GpxK/GJPG\n-----END PRIVATE KEY-----\n",
      client_email: "project-1@useful-monitor-396010.iam.gserviceaccount.com",
      client_id: "103189030119684332388",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/project-1%40useful-monitor-396010.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    };
    const auth = new google.auth.GoogleAuth({
      credentials: codeAuthor,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const client = await auth.getClient();
    const sheets = google.sheets({
      version: "v4",
      auth: client,
    });

    let ID_Sheets_Paste = "1SJOv70puHEQwrSoZIshIVhHq-NKS9fhvoyOwlK1Lhgs"; // ID GG-Sheet Paste
    let ID_Sheet_Prinway = "1HnB7dVqd1JRrar3D8Bre4ZBPG34_qNOkPBGxITzoghI"; //PRINTWAY
    let ID_Sheets_Merchize = "1kPMjgrYWRr2jj1HEuS9JLhRYiCfJ-SzdImOY8mJrKVs"; //MERCHIZE
    // ++++++++++++++++++++++++++++++++++++ Area get data web: PrintWay paste sheets =========== Ok

    // AU - PrintWay + Merchize

    let count_AU = 26;
    for (let i = 29; i <= 33; i++) {
      const responseMerchize_AU4 = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: ID_Sheets_Merchize,
        ranges: [`AU!E${i}`, `AU!H${i}`],
      });
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheets_Paste,
        range: `Sheet1!L${count_AU}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want fomat
        resource: {
          values: [
            responseMerchize_AU4.data.valueRanges.map(
              (range) => range.values[0][0]
            ),
          ],
        },
      });
      count_AU++;
    }
    let arrayPrinway_AU_colums_1 = [592, 595, 598, 601];
    let countPrinway_AU_colums_1 = 27;
    for (let i = 0; i < 4; i++) {
      const responsePrintway_AU1 = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: ID_Sheet_Prinway,
        ranges: [
          `Made in AU!F${arrayPrinway_AU_colums_1[i]}`,
          `Made in AU!H${arrayPrinway_AU_colums_1[i]}`,
        ],
      });
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheets_Paste,
        range: `Sheet1!Q${countPrinway_AU_colums_1}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want format
        resource: {
          values: [
            responsePrintway_AU1.data.valueRanges.map(
              (range) => range.values[0][0]
            ),
          ],
        },
      });
      countPrinway_AU_colums_1++;
      if (countPrinway_AU_colums_1 > 30) {
        break;
      } // prevent to loop x2
    }

    // CN - PrintWay + Merchize

    let count_CN = 31;
    for (let i = 121; i <= 128; i++) {
      const responseMerchize_CN5 = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: ID_Sheets_Merchize,
        ranges: [`CN!F${i}`],
      });
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheets_Paste,
        range: `Sheet1!L${count_CN}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want fomat
        resource: {
          values: [
            responseMerchize_CN5.data.valueRanges.map(
              (range) => range.values[0][0]
            ),
          ],
        },
      });
      count_CN++;
    }
    let arrayPrinway_CN_colums_1 = [254, 255, 256, 257, 258, 259, 260, 261];
    let countPrinway_CN_colums_1 = 31;
    for (let i = 0; i < 8; i++) {
      const responsePrintway_CN1 = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: ID_Sheet_Prinway,
        ranges: [`Made in CN!E${arrayPrinway_CN_colums_1[i]}`],
      });
      await sheets.spreadsheets.values.update({
        auth: client,
        spreadsheetId: ID_Sheets_Paste,
        range: `Sheet1!Q${countPrinway_CN_colums_1}`,
        valueInputOption: "RAW", // or 'USER_ENTERED' if want format
        resource: {
          values: [
            responsePrintway_CN1.data.valueRanges.map(
              (range) => range.values[0][0]
            ),
          ],
        },
      });
      countPrinway_CN_colums_1++;
      if (countPrinway_CN_colums_1 > 38) {
        break;
      } // prevent to loop x2
    }
    console.log("Đã update data handle-3 on Google-Sheet !");
  } catch (error) {
    return res.status(400).json({
      message:
        "Loi He Thong =============================================+++> Handle-2",
    });
  }
};
export const Action = async (req, res) => {
  try {
    // need set A few seconds for loading 3 function
    Handle_1(); //3 part
    setTimeout(() => {
      Handle_2(); //4 part
    }, 13000);
    setTimeout(() => {
      Handle_3(); //4 part
    }, 30000);
  } catch (error) {
    return res.status(400).json({ message: "Error try-Catch --- > Action" });
  }
};