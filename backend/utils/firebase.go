package utils

import (
	"context"
	"fmt"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"google.golang.org/api/option"
)

var FirestoreClient *firestore.Client
var FirebaseAuth *auth.Client

func InitFirebase(ctx context.Context, opt option.ClientOption) {
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		panic("Failed to initialize Firebase app: " + err.Error())
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		panic("Failed to create Firestore client: " + err.Error())
	}
	FirestoreClient = client

	authClient, err := app.Auth(ctx)
	if err != nil {
		panic("Failed to create Auth client: " + err.Error())
	}
	FirebaseAuth = authClient

	fmt.Println("Firebase initialized")
}
