idb1.log:
	git log > IDB1.log

idb2:
	git log > IDB2.log

requirements:
	cd backend && pip-chill --no-version > requirements.txt

format-back:
	cd backend && find . -name '*.py' ! -path '*/env/*' -print0 | xargs -0 black

format-front:
	cd frontend && npx prettier --write .

run-back:
	cd backend && python run.py

run-back-test:
	cd backend && pytest tests/config.py

