package models

import (
	"CRUD_NEXTJS_GOLANG/database"
	"log"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Age   int    `json:"age"`
}

func GetUsers() ([]User, error) {
	rows, err := database.DB.Query("SELECT ID, Name, Email, Age FROM Users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		if err := rows.Scan(&user.ID, &user.Name, &user.Email, &user.Age); err != nil {
			log.Fatal(err)
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

func CreateUser(user User) error {
	_, err := database.DB.Exec("INSERT INTO Users (Name, Email, Age) VALUES (?, ?, ?)", user.Name, user.Email, user.Age)
	return err
}

func UpdateUser(user User) error {
	_, err := database.DB.Exec("UPDATE Users SET Name = ?, Email = ?, Age = ? WHERE ID = ?", user.Name, user.Email, user.Age, user.ID)
	return err
}

func DeleteUser(id int) error {
	_, err := database.DB.Exec("DELETE FROM Users WHERE ID = ?", id)
	return err
}