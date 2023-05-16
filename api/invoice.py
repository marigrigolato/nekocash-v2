import os
import dotenv
import psycopg2
import psycopg2.extras
import locale
from flask import Blueprint, request, jsonify

dotenv.load_dotenv(dotenv.find_dotenv())
locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')

invoice_bp = Blueprint('invoice', __name__)

def get_db_connection():
  conn = psycopg2.connect(host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'), user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'))
  return conn

@invoice_bp.route('')
def get_invoice():

  conn = get_db_connection()
  cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

  year_month = request.args.get('year_month')

  transactions_query = '''
    SELECT tx.id, tx.date, tx.description, tx.value_in_cent, tx.is_planned
    FROM transactions tx
    WHERE TO_CHAR(date, 'YYYY-MM') = %(year_month)s
    ORDER BY tx.date;
  '''

  cur.execute(transactions_query, { 'year_month': year_month })
  registers = cur.fetchall()

  tags_query = '''
    SELECT tt.id_transaction, tt.id_tag, t.name
    FROM transaction_tag tt
    INNER JOIN tags t ON t.id = tt.id_tag
    WHERE tt.id_transaction IN %(ids)s;
  '''

  cur.execute(tags_query, { 'ids': tuple([register['id'] for register in registers]) })
  tags = cur.fetchall()

  transactions = []
  for register in registers:
    transactions.append({
      'id': register['id'],
      'date': register['date'].strftime('%d %b'),
      'description': register['description'],
      'tags': [{'id': tag['id_tag'], 'name': tag['name']} for tag in tags if tag['id_transaction'] == register['id']],
      'value': register['value_in_cent'] / 100,
      'isPlanned': register['is_planned']
    })

  return jsonify(transactions)
