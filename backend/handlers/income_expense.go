package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"ardairmak.com/money-management/models"
	"ardairmak.com/money-management/utils"
	"github.com/gorilla/mux"
)

func AddIncomeExpense(w http.ResponseWriter, r *http.Request) {
	var income models.IncomeExpense
	err := json.NewDecoder(r.Body).Decode(&income)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	_, _, err = utils.FirestoreClient.Collection("incomeExpenses").Add(ctx, income)
	if err != nil {
		http.Error(w, "Failed to add the income", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Income/Expense added successfully"))

	log.Println("IncomeExpense added successfully")
}

func GetIncomeExpense(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	iter := utils.FirestoreClient.Collection("incomeExpenses").Documents(ctx)

	var incomeExpenses []models.IncomeExpense
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		var incomeExpense models.IncomeExpense
		doc.DataTo(&incomeExpense)
		incomeExpenses = append(incomeExpenses, incomeExpense)
	}
	json.NewEncoder(w).Encode(incomeExpenses)

	log.Println("IncomeExpenses fetched successfully")
}

func UpdateIncomeExpense(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var incomeExpense models.IncomeExpense
	err := json.NewDecoder(r.Body).Decode(&incomeExpense)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	_, err = utils.FirestoreClient.Collection("incomeExpenses").Doc(id).Set(ctx, incomeExpense)
	if err != nil {
		http.Error(w, "Failed to update the income or expense", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Income/Expense updated successfully"))

	log.Println("IncomeExpense updated successfully")
}

func DeleteIncomeExpense(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	ctx := context.Background()
	_, err := utils.FirestoreClient.Collection("incomeExpenses").Doc(id).Delete(ctx)
	if err != nil {
		http.Error(w, "Failed to delete the income or expense", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Income/Expense deleted successfully"))

	log.Println("IncomeExpense deleted successfully")
}
