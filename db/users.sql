SHOW DATABASES;
USE referendum;

SELECT * FROM users;

UPDATE users
SET 
	name="hi"
WHERE id = 12492;

INSERT INTO users (
	name, password
) SELECT * FROM (
	SELECT "asdf", "asdf"
) AS tmp WHERE NOT EXISTS (
	SELECT * FROM users WHERE name="asdf"
) LIMIT 1;


SELECT IF(
	EXISTS(
	  SELECT * FROM users WHERE name='asdf'
	),
	'username exists',
	'ok no problem'
) AS result