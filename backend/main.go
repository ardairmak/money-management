package main

import (
	"context"
	"log"
	"net/http"

	"ardairmak.com/money-management/m/handlers"
	"ardairmak.com/money-management/m/utils"
	"github.com/gorilla/mux"
	"google.golang.org/api/option"
)

func main() {

	ctx := context.Background()
	opt := option.WithCredentialsFile("serviceAccountKey.json")

	_, client, _ := utils.InitFirebase(ctx, opt)

	defer client.Close()

	r := mux.NewRouter()

	r.HandleFunc("/income-expenses", handlers.AddIncomeExpense).Methods("POST")
	r.HandleFunc("/income-expenses", handlers.GetIncomeExpenses).Methods("GET")
	r.HandleFunc("/income-expenses/{id}", handlers.UpdateIncomeExpense).Methods("PUT")
	r.HandleFunc("/income-expenses/{id}", handlers.DeleteIncomeExpense).Methods("DELETE")

	r.HandleFunc("/events", handlers.AddEvent).Methods("POST")
	r.HandleFunc("/events", handlers.GetEvents).Methods("GET")
	r.HandleFunc("/events/{id}", handlers.UpdateEvent).Methods("PUT")
	r.HandleFunc("/events/{id}", handlers.DeleteEvent).Methods("DELETE")

	r.HandleFunc("/future-payments", handlers.AddUpcomingPayment).Methods("POST")
	r.HandleFunc("/future-payments", handlers.GetUpcomingPayments).Methods("GET")
	r.HandleFunc("/future-payments/{id}", handlers.UpdateUpcomingPayment).Methods("PUT")
	r.HandleFunc("/future-payments/{id}", handlers.DeleteUpcomingPayment).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8080", r))
}
