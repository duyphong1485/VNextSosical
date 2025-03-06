# VNextSosical
 # Cài môi trường ảo
  ## pip install virtualenv
	## virtualenv venv
	## Set-ExecutionPolicy Unrestricted -Scope Process
	## venv\Scripts\activate
	## pip install django djangorestframework
	## -> cần sử dụng git pull thường xuyên
		# Không commit file db.sqlite3 vào Git (thêm vào .gitignore):
		#echo "db.sqlite3" >> .gitignore
		#	git add .gitignore
		#	Mỗi người sẽ tự tạo file db.sqlite3 khi chạy migrate.
		#	Kiểm tra môi trường: Đảm bảo  dùng cùng phiên bản Python và cài đúng các công cụ (Git, Python, virtualenv).
