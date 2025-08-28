import pickle

data = pickle.load(open('app/models/model.pkl', 'rb'))
similarity_matrix = data['similarity']
books = data['books']

def recommend_books(query, top_n=20):
    query = query.strip().lower()
    
    # Search in book titles
    if query in books['book_title'].str.lower().values:
        idx = books[books['book_title'].str.lower() == query].index[0]
    # Search in authors
    elif query in books['book_author'].str.lower().values:
        idx = books[books['book_author'].str.lower() == query].index[0]
    else:
        return []
    
    distances = similarity_matrix[idx]
    
    # Get top_n similar books
    book_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:top_n+1]

    recommendations = []
    for i in book_list:
        recommendations.append({
            "title": books.iloc[i[0]]['book_title'].title(),
            "author": books.iloc[i[0]]['book_author'].title(),
            "cover": books.iloc[i[0]]['cover_url']
        })
    return recommendations
