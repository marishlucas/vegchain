import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';

const DBSOURCE = "usersdb.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
    throw err
  }
  else {
    const salt = bcrypt.genSaltSync(10);

    db.run(`CREATE TABLE Users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Username text,
            Organization text,
            Password text,
            Salt text,
            Token text
            )`,
      (err) => {
        if (err) {
        } else {
          const insert = 'INSERT INTO Users (Username, Organization, Password, Salt) VALUES (?,?,?,?)'
          db.run(insert, ["org1user", "org1", bcrypt.hashSync("test123", salt), salt])
          db.run(insert, ["org2user", "org2", bcrypt.hashSync("test123", salt), salt])
        }
      });
  }
});

export default db;
