package main

import (
	"context"
	"log"
	"net/http"

	"ardairmak.com/money-management/handlers"
	"ardairmak.com/money-management/utils"
	"github.com/gorilla/mux"
	"google.golang.org/api/option"
)

func main() {
	ctx := context.Background()
	opt := option.WithCredentialsFile("serviceAccountKey.json")

	utils.InitFirebase(ctx, opt)

	defer utils.FirestoreClient.Close()

	r := mux.NewRouter()

	r.HandleFunc("/income-expense", handlers.AddIncomeExpense).Methods("POST")
	r.HandleFunc("/income-expense", handlers.GetIncomeExpense).Methods("GET")
	r.HandleFunc("/income-expense/{id}", handlers.UpdateIncomeExpense).Methods("PUT")
	r.HandleFunc("/income-expense/{id}", handlers.DeleteIncomeExpense).Methods("DELETE")

	r.HandleFunc("/event", handlers.AddEvent).Methods("POST")
	r.HandleFunc("/event", handlers.GetEvent).Methods("GET")
	r.HandleFunc("/event/{id}", handlers.UpdateEvent).Methods("PUT")
	r.HandleFunc("/event/{id}", handlers.DeleteEvent).Methods("DELETE")

	r.HandleFunc("/upcoming-payment", handlers.AddUpcomingPayment).Methods("POST")
	r.HandleFunc("/upcoming-payment", handlers.GetUpcomingPayment).Methods("GET")
	r.HandleFunc("/upcoming-payment/{id}", handlers.UpdateUpcomingPayment).Methods("PUT")
	r.HandleFunc("/upcoming-payment/{id}", handlers.DeleteUpcomingPayment).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8080", r))
}
