import psycopg2
import sshtunnel
from sqlalchemy import create_engine
import logging
import pandas as pd
# Configuração do logging
logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s %(levelname)s: %(message)s', 
    datefmt='%Y-%m-%d %H:%M:%S', 
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('log.txt') 
    ]
)

logging.info('Início do processo')
logging.info('Conectando ao PostgreSQL via psycopg2...')

# Credenciais de acesso ao PostgreSQL
postgres_hostname = "Safegold-3174.postgres.pythonanywhere-services.com"
postgres_host_port = 13174
postgres_user = 'super'
postgres_password = 'postsafe2023'
postgres_database = 'sg_db'
logging.info('Conexão estabelecida com sucesso.')

# Credenciais de acesso ao Redshift
redshift_user = 'awsuser'
redshift_password = 'Dw263815'
redshift_host = 'redshift-cluster-1.cbxyxoyph9q3.us-east-2.redshift.amazonaws.com'
redshift_port = '5439'
redshift_database = 'sg_db'

# Configuração do sshtunnel
sshtunnel.SSH_TIMEOUT = 5.0
sshtunnel.TUNNEL_TIMEOUT = 5.0

with sshtunnel.SSHTunnelForwarder(
    ('ssh.pythonanywhere.com'),
    ssh_username='Safegold',
    ssh_password='Soft2022sg@BI#ware',
    remote_bind_address=(postgres_hostname, postgres_host_port)
) as tunnel:

    # Conexão com o PostgreSQL via psycopg2
    connection = psycopg2.connect(
        user=postgres_user,
        password=postgres_password,
        host='127.0.0.1',
        port=tunnel.local_bind_port,
        database=postgres_database
    )
    logging.info('Conectando ao Redshift via SQLAlchemy...')

    # Conexão com o Redshift via SQLAlchemy
    redshift_url = f"postgresql://{redshift_user}:{redshift_password}@{redshift_host}:{redshift_port}/{redshift_database}"
    engine = create_engine(redshift_url)
    logging.info('Conexão estabelecida com sucesso.')

    # Query no Redshift
    query = """
    select 
    0 as cod_empresa,
    null as cnpj,
    null as empresa,
    id_fornecedor as id_fornecedor,
    'Nao' as matriz,
    fornecedor as fornecedor,
    replace(replace(concat('AGROSS',id_fornecedor),' ',''),',','')  as cod_fornecedor
    from fornecedores_agross
    """

    # Execução da query no Redshift
    logging.info('Executando a query no Redshift...')
    with engine.connect() as redshift_conn:
        result = redshift_conn.execute(query)
        data = result.fetchall()
    logging.info('Query executada com sucesso.')

    logging.info('Realizando o ETL para a tabela fornecedores_agross...')

    with connection.cursor() as cursor:
        cursor.execute("DROP TABLE IF EXISTS fornecedores_agross")
        cursor.execute("""
        CREATE TABLE public.fornecedores_agross (
            cnpj varchar(255) NULL,
            empresa varchar(65535) NULL,
            id_fornecedor varchar(255) NULL,
            matriz varchar(3) NULL,
            fornecedor varchar(255) NULL,
            cod_fornecedor varchar(262) NULL,
            cod_empresa int8 NULL
        );
    """)
        cursor.executemany("""
            INSERT INTO fornecedores_agross (cod_empresa, cnpj, empresa, id_fornecedor, matriz, fornecedor, cod_fornecedor)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, data)
    logging.info('ETL realizado com sucesso.')


    logging.info('Executando a primeira  procedure de tratamento_fornecedores...')

    # Execução da primeira stored procedure no PostgreSQL
    with connection.cursor() as cursor:
        cursor.execute('CALL public.tratamento_fornecedores_agross()')
    logging.info('procedure concluida')

    logging.info('Executando a segunda  procedure de tratamento_conta_analitica...')

    # Execução da segunda stored procedure no PostgreSQL
    with connection.cursor() as cursor:
        cursor.execute('CALL public.tratamento_conta_analitica()')
    logging.info('procedure concluida')

    logging.info('começando etl para o redshift')

    query_postgres = "SELECT substring(cod_fornecedor, position('AGROSS' in cod_fornecedor) + 6) AS cod_fornecedor, fornecedor, conta_analitica, cnpj, empresa FROM matriz_analitica_fornecedor WHERE empresa = 'AGROSS'"
    df = pd.read_sql(query_postgres, connection)


    # Cópia dos dados para o Redshift
    df.to_sql('fin_matriz_analitica', engine, index=False, if_exists='replace', schema='public')
 
    logging.info('fim ETL')


    # Fechamento das conexões
    connection.commit()
    connection.close()
    engine.dispose()

    logging.info('fim processo')

