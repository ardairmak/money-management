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

func AddEvent(w http.ResponseWriter, r *http.Request) {
	var event models.Event
	err := json.NewDecoder(r.Body).Decode(&event)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	_, _, err = utils.FirestoreClient.Collection("events").Add(ctx, event)
	if err != nil {
		http.Error(w, "Failed to add the event", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Event added successfully"))

	log.Println("Event added successfully")
}

func GetEvent(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	iter := utils.FirestoreClient.Collection("events").Documents(ctx)

	var events []models.Event
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		var event models.Event
		doc.DataTo(&event)
		events = append(events, event)
	}
	json.NewEncoder(w).Encode(events)

	log.Println("Events fetched successfully")
}

func UpdateEvent(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var event models.Event
	err := json.NewDecoder(r.Body).Decode(&event)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	_, err = utils.FirestoreClient.Collection("events").Doc(id).Set(ctx, event)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("Event updated successfully"))

	log.Println("Event updated successfully")
}

func DeleteEvent(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	ctx := context.Background()
	_, err := utils.FirestoreClient.Collection("events").Doc(id).Delete(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Event deleted successfully"))

	log.Println("Event deleted successfully")
}
