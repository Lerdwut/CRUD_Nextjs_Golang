package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/denisenkom/go-mssqldb"
)

var DB *sql.DB

func Connect() {
	var err error
	connString := "server=Guide\\SQLEXPRESS;database=CRUD_Golang;trusted_connection=yes"
	DB, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Connection failed: ", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Cannot ping to DB: ", err)
	}
	fmt.Println("MSSQL Connected!")
}
