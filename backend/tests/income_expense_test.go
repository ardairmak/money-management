package tests

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"ardairmak.com/money-management/handlers"
	"ardairmak.com/money-management/utils"
	"cloud.google.com/go/firestore"
	"github.com/gorilla/mux"
	"google.golang.org/api/option"
)

func setup() (*mux.Router, *firestore.Client) {
	ctx := context.Background()
	sa := option.WithCredentialsFile("../serviceAccountKey.json")
	_, client, _ := utils.InitFirebase(ctx, sa)

	r := mux.NewRouter()
	r.HandleFunc("/income-expenses", handlers.AddIncomeExpense).Methods("POST")
	r.HandleFunc("/income-expenses", handlers.GetIncomeExpenses).Methods("GET")
	r.HandleFunc("/income-expenses/{id}", handlers.UpdateIncomeExpense).Methods("PUT")
	r.HandleFunc("/income-expenses/{id}", handlers.DeleteIncomeExpense).Methods("DELETE")

	return r, client
}

func TestAddIncomeExpense(t *testing.T) {
	r, _ := setup()

	incomeExpense := map[string]interface{}{
		"isIncome":    true,
		"name":        "Salary",
		"category":    "Income",
		"price":       5000,
		"date":        "2023-05-01T00:00:00Z",
		"description": "Monthly salary",
	}

	jsonData, err := json.Marshal(incomeExpense)
	if err != nil {
		t.Fatalf("Error marshalling data: %v", err)
	}

	req, err := http.NewRequest("POST", "/income-expenses", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatalf("Error creating request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	r.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusCreated {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusCreated)
	}

	expected := "Income/Expense added successfully"
	if rr.Body.String() != expected {
		t.Errorf("Handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestGetIncomeExpenses(t *testing.T) {
	r, _ := setup()

	req, err := http.NewRequest("GET", "/income-expenses", nil)
	if err != nil {
		t.Fatalf("Error creating request: %v", err)
	}

	rr := httptest.NewRecorder()
	r.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	var response []map[string]interface{}
	err = json.Unmarshal(rr.Body.Bytes(), &response)
	if err != nil {
		t.Errorf("Error unmarshalling response: %v", err)
	}

	// Add more assertions based on expected response structure
}

func TestUpdateIncomeExpense(t *testing.T) {
	r, _ := setup()

	updatedIncomeExpense := map[string]interface{}{
		"isIncome":    true,
		"name":        "Updated Salary",
		"category":    "Income",
		"price":       6000,
		"date":        "2023-06-01T00:00:00Z",
		"description": "Updated monthly salary",
	}

	jsonData, err := json.Marshal(updatedIncomeExpense)
	if err != nil {
		t.Fatalf("Error marshalling data: %v", err)
	}

	id := "aI6GXycBwCLiUmPJJent"
	req, err := http.NewRequest("PUT", "/income-expenses/"+id, bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatalf("Error creating request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")

	rr := httptest.NewRecorder()
	r.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	expected := "Income/Expense updated successfully"
	if rr.Body.String() != expected {
		t.Errorf("Handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestDeleteIncomeExpense(t *testing.T) {
	r, _ := setup()

	id := "aI6GXycBwCLiUmPJJent"
	req, err := http.NewRequest("DELETE", "/income-expenses/"+id, nil)
	if err != nil {
		t.Fatalf("Error creating request: %v", err)
	}

	rr := httptest.NewRecorder()
	r.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	expected := "Income/Expense deleted successfully"
	if rr.Body.String() != expected {
		t.Errorf("Handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}
