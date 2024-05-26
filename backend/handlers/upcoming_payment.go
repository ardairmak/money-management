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

func AddUpcomingPayment(w http.ResponseWriter, r *http.Request) {
	var upcomingPayment models.UpcomingPayment
	err := json.NewDecoder(r.Body).Decode(&upcomingPayment)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	_, _, err = utils.FirestoreClient.Collection("upcomingPayments").Add(ctx, upcomingPayment)
	if err != nil {
		http.Error(w, "Failed to add the upcoming payment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Upcoming payment added successfully"))

	log.Println("UpcomingPayment added successfully")
}

func GetUpcomingPayment(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	iter := utils.FirestoreClient.Collection("upcomingPayments").Documents(ctx)

	var upcomingPayments []models.UpcomingPayment
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		var upcomingPayment models.UpcomingPayment
		doc.DataTo(&upcomingPayment)
		upcomingPayments = append(upcomingPayments, upcomingPayment)
	}
	json.NewEncoder(w).Encode(upcomingPayments)

	log.Println("UpcomingPayments fetched successfully")
}

func UpdateUpcomingPayment(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var upcomingPayment models.UpcomingPayment
	err := json.NewDecoder(r.Body).Decode(&upcomingPayment)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	_, err = utils.FirestoreClient.Collection("upcomingPayments").Doc(id).Set(ctx, upcomingPayment)
	if err != nil {
		http.Error(w, "Failed to update the upcoming payment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Upcoming payment updated successfully"))

	log.Println("UpcomingPayment updated successfully")
}

func DeleteUpcomingPayment(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	ctx := context.Background()
	_, err := utils.FirestoreClient.Collection("upcomingPayments").Doc(id).Delete(ctx)
	if err != nil {
		http.Error(w, "Failed to delete the upcoming payment", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Upcoming payment deleted successfully"))

	log.Println("UpcomingPayment deleted successfully")
}
