#%%
import psycopg2
from datetime import date, timedelta
import locale
import pandas as pd
#%%
locale.setlocale(locale.LC_TIME, 'pt_BR.UTF-8')


conn = psycopg2.connect(
    host='localhost',
    database='sg_db',
    user='postgres',
    password='postgres'
)
#%%
cur = conn.cursor()
cur.execute("""
    DROP TABLE dim_calendario
""")
#%%
cur.execute("""
    CREATE TABLE dim_calendario (
        data DATE PRIMARY KEY,
        dia_da_semana VARCHAR(255)
    );
""")
conn.commit()

data_inicio = date(2010, 1, 1)
data_fim = date(2050, 12, 31)
delta = timedelta(days=1)

while data_inicio <= data_fim:
    dia_da_semana = data_inicio.strftime('%A')
    dia_da_semana = dia_da_semana.encode('iso-8859-1').decode('utf-8')

    cur.execute("""
        INSERT INTO dim_calendario (data, dia_da_semana)
        VALUES (%s, %s);
    """, (data_inicio, dia_da_semana))
    data_inicio += delta

conn.commit()

cur.close()
conn.close()
# %%
cursor = conn.cursor()
cursor.execute("CREATE SEQUENCE agenda_sequence START 1;")
conn.commit()
cursor.close()

# Criando uma função para inserir os dados e atualizar a sequência
cursor = conn.cursor()
insert_query = """
    CREATE OR REPLACE FUNCTION insert_agenda_data()
    RETURNS VOID AS $$
    BEGIN
        INSERT INTO ag_fact_agenda (cod_agenda, data, dia_semana)
        SELECT nextval('agenda_sequence'), data, dia_semana
        FROM dim_calendario;
        SELECT setval('agenda_sequence', max(cod_agenda)) FROM ag_fact_agenda;
    END;
    $$ LANGUAGE plpgsql;
"""
cursor.execute(insert_query)
conn.commit()
cursor.close()

# Executando a função para inserir os dados
cursor = conn.cursor()
cursor.execute("SELECT insert_agenda_data();")
conn.commit()
cursor.close()

# Lendo os dados da tabela ag_fact_agenda
df_agenda = pd.read_sql_query("SELECT * FROM ag_fact_agenda", conn)

# Fechando a conexão com o banco de dados
conn.close()
# %%
