package handlers

import (
	"context"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// fakeCollection is a hand-rolled test double for the collection interface:
// each field is a delegate, so a test only needs to set the methods it
// actually exercises. Calling an unset method panics loudly, since a nil
// call means the test forgot to wire up a dependency it needed.
type fakeCollection struct {
	findFunc             func(ctx context.Context, filter any, opts ...options.Lister[options.FindOptions]) (*mongo.Cursor, error)
	findOneFunc          func(ctx context.Context, filter any, opts ...options.Lister[options.FindOneOptions]) *mongo.SingleResult
	insertOneFunc        func(ctx context.Context, document any, opts ...options.Lister[options.InsertOneOptions]) (*mongo.InsertOneResult, error)
	updateOneFunc        func(ctx context.Context, filter any, update any, opts ...options.Lister[options.UpdateOneOptions]) (*mongo.UpdateResult, error)
	updateByIDFunc       func(ctx context.Context, id any, update any, opts ...options.Lister[options.UpdateOneOptions]) (*mongo.UpdateResult, error)
	findOneAndUpdateFunc func(ctx context.Context, filter any, update any, opts ...options.Lister[options.FindOneAndUpdateOptions]) *mongo.SingleResult
	deleteOneFunc        func(ctx context.Context, filter any, opts ...options.Lister[options.DeleteOneOptions]) (*mongo.DeleteResult, error)
}

func (f *fakeCollection) Find(ctx context.Context, filter any, opts ...options.Lister[options.FindOptions]) (*mongo.Cursor, error) {
	return f.findFunc(ctx, filter, opts...)
}

func (f *fakeCollection) FindOne(ctx context.Context, filter any, opts ...options.Lister[options.FindOneOptions]) *mongo.SingleResult {
	return f.findOneFunc(ctx, filter, opts...)
}

func (f *fakeCollection) InsertOne(ctx context.Context, document any, opts ...options.Lister[options.InsertOneOptions]) (*mongo.InsertOneResult, error) {
	return f.insertOneFunc(ctx, document, opts...)
}

func (f *fakeCollection) UpdateOne(ctx context.Context, filter any, update any, opts ...options.Lister[options.UpdateOneOptions]) (*mongo.UpdateResult, error) {
	return f.updateOneFunc(ctx, filter, update, opts...)
}

func (f *fakeCollection) UpdateByID(ctx context.Context, id any, update any, opts ...options.Lister[options.UpdateOneOptions]) (*mongo.UpdateResult, error) {
	return f.updateByIDFunc(ctx, id, update, opts...)
}

func (f *fakeCollection) FindOneAndUpdate(ctx context.Context, filter any, update any, opts ...options.Lister[options.FindOneAndUpdateOptions]) *mongo.SingleResult {
	return f.findOneAndUpdateFunc(ctx, filter, update, opts...)
}

func (f *fakeCollection) DeleteOne(ctx context.Context, filter any, opts ...options.Lister[options.DeleteOneOptions]) (*mongo.DeleteResult, error) {
	return f.deleteOneFunc(ctx, filter, opts...)
}

// cursorOf builds a real *mongo.Cursor backed by in-memory documents, so
// handler code exercises the same Decode/All path it would against a live
// server.
func cursorOf(docs ...any) *mongo.Cursor {
	cur, err := mongo.NewCursorFromDocuments(docs, nil, nil)
	if err != nil {
		panic(err)
	}
	return cur
}

func singleResultOf(doc any, err error) *mongo.SingleResult {
	return mongo.NewSingleResultFromDocument(doc, err, nil)
}
