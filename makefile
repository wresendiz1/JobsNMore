idb1.log:
	git log > IDB1.log

idb2.log:
	git log > IDB2.log

install-back:
	cd backend && pip install -r requirements.txt

requirements:
	cd backend && pip-chill --no-version > requirements.txt

format-back:
	cd backend && find . -name '*.py' ! -path '*/env/*' -print0 | xargs -0 black

format-front:
	cd frontend && npx prettier --write .

run-back:
	cd backend && python run.py

run-back-test:
	cd backend && pytest app/tests.py
	
run-front:
	cd frontend && npm run start

VPATH = backend/app
models.html: models.py
	cd ./backend/app && python -m pydoc -w models