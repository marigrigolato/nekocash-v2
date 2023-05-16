import os
import dotenv
import psycopg2
import psycopg2.extras
from flask import Blueprint, jsonify

dotenv.load_dotenv(dotenv.find_dotenv())

invoices_bp = Blueprint('invoices', __name__)

def get_db_connection():
  conn = psycopg2.connect(host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'), user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'))
  return conn

@invoices_bp.route('')
def get_invoices_summary():

  conn = get_db_connection()
  cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

  cur.execute('''
    SELECT TO_CHAR(date, 'YYYY-MM') AS year_month, SUM(value_in_cent) AS amount
    FROM transactions
    GROUP BY year_month
    ORDER BY year_month;
  ''')

  registers = cur.fetchall()

  invoices_summary = []
  for register in registers:
    invoices_summary.append({
      'year_month': register['year_month'],
      'amount': register['amount'] / 100
    })

  return jsonify(invoices_summary)
