FROM python:3.6-alpine3.6
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY ./backend /code/
#COPY . .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]
#CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "mysite.wsgi:application"]