#%%
import psycopg2
from datetime import date, timedelta
import locale
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
