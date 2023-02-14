.PHONY: IDB1
IDB1:
	git log > IDB1.log

.PHONY: requirements
requirements:
	pip freeze > requirements.txt