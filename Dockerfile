# Postgres base image
FROM postgres:16    

# Add envs
ENV POSTGRES_PASSWORD=pass123
ENV POSTGRES_DB=library_db

# # Copy initialization sql file
# COPY init.sql /docker-entrypoint-initdb.d/
