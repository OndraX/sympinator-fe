default:
	@echo "———————————— building ——————————————————————"
	docker build -t frontend .

up: default
	@echo "———————————— starting ———————————————————————"
	docker run -it \
		-v ${PWD}:/usr/src/app \
		-v /usr/src/app/node_modules \
		-p 8080:8080 \
		--rm \
		frontend

connect:
	docker run -it frontend /bin/bash
