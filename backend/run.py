import app as app_pkg

app = app_pkg.create_app()

if __name__ == '__main__':
	app.debug = True
	app.run(host = '0.0.0.0', port = 5000)