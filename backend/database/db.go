package database

import (
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB

func Connect() {
	host := "localhost"
	port := 5432
	user := "postgres"
	password := "Guide2002"
	dbname := "CRUD_Golang"

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	var err error
	DB, err = sqlx.Connect("postgres", psqlInfo)
	if err != nil {
		log.Fatal("Error connecting to database: ", err.Error())
	}

	log.Println("Successfully connected to PostgreSQL database!")
}