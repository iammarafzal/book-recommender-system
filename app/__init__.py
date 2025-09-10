from flask import Flask, render_template, request, jsonify
from app.models.recommender import recommend_books, books

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search', methods=["GET"])
def search():
    query = request.args.get("q")
    recommendations = []

    if query:
        recommendations = recommend_books(query)

    return render_template('index.html', recommendations=recommendations)

@app.route('/suggest', methods=["GET"])
def suggest():
    term = request.args.get("term", "").lower()
    suggestions = []

    if term:
        matched_books = books[books['book_title'].str.lower().str.contains(term)]
        suggestions = matched_books['book_title'].head(10).tolist()  # limit to 10 suggestions

    return jsonify(suggestions)
