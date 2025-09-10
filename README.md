# 📚 Book Recommendation System  

A **Content-Based Book Recommendation System** built with **Python, Flask, and NLP techniques**.  
This system helps users discover books similar to their favorite titles or authors by analyzing metadata (tags, authors, and titles).  

---

## 🔎 Features
- **Content-Based Filtering** using Bag of Words and Cosine Similarity  
- Trained on a dataset of **10,000 books**  
- **Pickle-based model persistence** for fast loading  
- Flask-powered **web application** with:  
  - Mobile responsive UI  
  - Dark/Light theme toggle  
  - Autocomplete search suggestions  
  - "Show more" button (5 recommendations per click, up to 20 total)  

---

## 💻 Tech Stack
- **Python** (Scikit-learn, Pandas, NumPy)  
- **Flask** (Backend + API)  
- **HTML, CSS, JavaScript** (Responsive Frontend)  

---

## 📂 Project Structure
│
├── app/
│ ├── models/
│ │ ├── model.pkl # Precomputed similarity + book dataset
│ │ └── recommender.py # Recommendation logic
│ ├── static/ # CSS, JS, Images
│ ├── templates/ # HTML templates
│ └── app.py # Flask backend
│
├── data/ # Dataset (10k books metadata)
├── requirements.txt # Dependencies
└── README.md # Project Documentation


---

## ⚡ How It Works
1. The **tags column** of books is vectorized using `CountVectorizer` (max 2000 features, stopwords removed).  
2. Pairwise **Cosine Similarity** is computed between all books.  
3. The **top-N most similar books** are recommended for each query.  
4. The similarity matrix and dataset are stored in a pickle file for reuse.  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/iammarafzal/Book-Recommendation-System.git
cd Book-Recommendation-System

