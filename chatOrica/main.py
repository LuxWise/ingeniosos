from langchain_community.utilities.sql_database import SQLDatabase
from langchain_experimental.sql import SQLDatabaseChain
from langchain_openai import ChatOpenAI
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os

load_dotenv()

print(os.getenv('dbpass'), os.getenv('dbport'), os.getenv('db'), os.getenv('dbhost'))

app = Flask(__name__)

db = SQLDatabase.from_uri(
    f"postgresql+psycopg2://postgres:{os.getenv('dbpass')}@{os.getenv('dbhost')}:{os.getenv('dbport')}/{os.getenv('db')}",
)

llm = ChatOpenAI(temperature=0, model='gpt-3.5-turbo')

QUERY = """
Given a user question:
1. Create a syntactically correct postgresql query to execute and do not put a limit on the query, keep in mind if they ask you for quotes or proformas, the type of user, whether it is commercial or customer
2. review the results
3. returns the data
#{question}
"""

# Setup the database chain
db_chain = SQLDatabaseChain(llm=llm, database=db, verbose=True)

@app.route('/')
def root():
    return jsonify({"Choo Choo": "Welcome to your Flask app 🚅"})


@app.route('/apiChatbot', methods=['POST'])
def chat():
    data = request.get_json()
    question = data.get("question")

    try:
        question = QUERY.format(question=question)
        result = db_chain.run(question)
        print(result)
        return jsonify(result=result), 201

    except Exception as err:
        print(err)
        return jsonify({"error": str(err)}), 400

if __name__ == '__main__':
    app.run(debug=False, port=os.getenv("PORT", default=5000))
