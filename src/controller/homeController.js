import connection from "../configs/connectDB";

let getHomepage = async (req, res) => {
  let data = [];
  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    results.map((row) => {
      data.push({ id: row.id, name: row.name });
    });
    return res.render("index.ejs", { dataUser: JSON.stringify(data) });
  });
  const [rows, fields ] = await connection.execute("select * From `user`")
};


module.exports = {
  getHomepage,
};
