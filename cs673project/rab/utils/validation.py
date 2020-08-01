

def validate_registration(username, password):
	if (username != "" and password != ""):
	   	return True
	else:
		return False

def validate_dish_input(name, cook_time, fresh_time):
	return True