import os
import dotenv
import psycopg2
import psycopg2.extras
import locale
from flask import Flask, request, jsonify
from invoices_summary import invoices_bp
from invoice import invoice_bp

dotenv.load_dotenv(dotenv.find_dotenv())
locale.setlocale(locale.LC_ALL, 'pt_BR.UTF-8')

app = Flask(__name__)
app.register_blueprint(invoices_bp, url_prefix='/invoices')
app.register_blueprint(invoice_bp, url_prefix='/invoice')


def get_db_connection():
  conn = psycopg2.connect(host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'), user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'))
  return conn

@app.route('/transactions')
def get_transactions():

  conn = get_db_connection()
  cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

  year_month = request.args.get('year_month')
  date = request.args.get('date')
  description = request.args.get('description')
  tags = request.args.get('tags')
  value = request.args.get('value')
  is_planned = request.args.get('isPlanned')

  insert_query = '''
    SELECT tx.id, tx.date, tx.description, tx.value_in_cent, tx.is_planned
    FROM transactions tx
    WHERE 1=1
  '''

  if year_month:
    insert_query += ' AND TO_CHAR(date, \'YYYY-MM\') = %(year_month)s'
  if date:
    insert_query += ' AND date = %(date)s'
  if description:
    insert_query += ' AND description = %(description)s'
  if tags:
    tags = tuple(tags.split(','))
    insert_query += ' AND (SELECT COUNT(1) FROM transaction_tag tt WHERE id_transaction = tx.id AND tt.id_tag IN %(tags)s) > 0'
  if value:
    value = round(locale.atof(value) * 100)
    insert_query += ' AND value_in_cent = %(value)s'
  if is_planned:
    insert_query += ' AND is_planned = %(is_planned)s'

  cur.execute(insert_query, { 'year_month': year_month,'date': date, 'description': description, 'tags': tags, 'value': value, 'is_planned': is_planned })
  registers = cur.fetchall()

  filtered_transactions = []
  if registers:
    tags_query = '''
      SELECT tt.id_transaction, tt.id_tag, t.name
      FROM transaction_tag tt
      INNER JOIN tags t ON t.id = tt.id_tag
      WHERE tt.id_transaction IN %(ids)s
    '''

    cur.execute(tags_query, { 'ids': tuple([register['id'] for register in registers]) })
    tags = cur.fetchall()

  for register in registers:
    filtered_transactions.append({
      'id': register['id'],
      'date': register['date'].strftime('%d %b'),
      'description': register['description'],
      'tags': [{'id': tag['id_tag'], 'name': tag['name']} for tag in tags if tag['id_transaction'] == register['id']],
      'value': register['value_in_cent'] / 100,
      'isPlanned': register['is_planned']
    })

  return jsonify(filtered_transactions)
