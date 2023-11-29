const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000 || process.env.PORT;
const path = require("path");
const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: 'db.mgampbhmlnalxohuobpr.supabase.co',
  database: "postgres",
  password: 'gplVhDuxLDMeBKxs',
  port: 5432,
});
app.use(bodyParser.json());
app.use(express.static(path.join('public')));

app.post("/", async (req, res) => {
  try {

    const { deviceIDLatest, deviceIdOld } = req.body;
    console.log(deviceIDLatest,deviceIdOld);
    await pool.query(`delete from tab_device_records where device_id = '${deviceIDLatest}';`);
    await pool.query(`update tab_device_records set device_id = '${deviceIDLatest}' where device_id = '${deviceIdOld}';`)
    // const a = await pool.query(`select device_id from tab_device_records where device_id = '${deviceIdOld}'`);
    // const b = await pool.query(`select device_id from tab_device_records where device_id = '${deviceIDLatest}'`);

    // console.log(a.rows);
    // console.log(b.rows);
    res.send("Successfully updated");
  } catch (err) {
    console.log(err)
  }

});

app.use("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
})

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})

