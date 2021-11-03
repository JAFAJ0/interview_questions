# Function_wrapper
Create a class to store number N, which is the most length of data, ANd using dictionary to store.

In this py i creat a very simple mock function for get_book_isbn. 

Not make anything about struct in python, because i donot think its the main topic.

With stuck the data flow will like: 

Remote API data=>stuck=>unpack to byte=>decode to string=>get_book_isbn=>book_information_Dictionary

Another way is to store them  in  files with ISBN as name, files can have index.

And do I/O to write files and delete old files.

With this way just save N isbns, which is N str, should be much cheaper when stack/heap is limited.

