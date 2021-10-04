SHOW DATABASES;
USE referendum;

SELECT * FROM topics;

UPDATE topics
SET 
	content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
    "Duis varius lorem sed dui consectetur consequat. Vivamus gravida tem"
    "pus porttitor. Donec efficitur nisl non consequat tincidunt. Phasell"
    "us rhoncus sem eget rhoncus convallis. Donec a urna in nisi faucibus"
    "scelerisque. Phasellus volutpat, tellus vel ornare facilisis, lectus"
    "felis porta neque, posuere dictum tellus mauris vitae turpis. Suspen"
    "disse sagittis leo in rhoncus rhoncus. Duis sit amet mauris erat. Do"
    "nec ut risus et ipsum luctus tempus. Sed pharetra faucibus lacinia. "
    "In venenatis nibh non tellus luctus, eu vulputate tellus eleifend. N"
    "am vel mi vel enim dictum egestas. In justo mi, pretium in commodo s"
    "ollicitudin, finibus non turpis. sss"
WHERE id = 12492;