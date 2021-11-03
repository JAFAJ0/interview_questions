#[C, Python]
#Assume we have a function get_book_info(isbn) that takes a string ISBN argument and retrieves a
#struct/object containing the Title, Author, and Language of a book (each represented as a string) from a
#database. Write a wrapper function that increases performance by keeping some of the database results in
#memory for quick lookup.
#To prevent memory from growing unbounded, we only want to store a maximum of N book records. At any
#given time, we should be storing the N books that we accessed most recently. Assume that N can be a large
#number when making decisions about choices of data structure(s) and algorithm(s).


import struct
from functools import wraps

def savemaxN(get_book_info):
        @wraps(get_book_info)
        def wrapper(self,*args, **kwargs):
            #if the book dictionary store the value, then just fetch it.
            #otherwise use get_book_info function to get
            arg=args[0]
            if arg in self.bookDic:
                print("We have data locally")
                return self.bookDic.get(arg)
                # fetch data from local one in order to save time
                # if this data, the number N is really big, its better to write it in file to store.
            else:
                print("Please wait for fetching data")
                bookdetail = get_book_info(self,arg)
                self.bookDic[arg]=bookdetail
                #add the latest one to the dic
        #Its only useful for python 3.7+, as dictionary do not have a order before.
                while len(self.bookDic) > self.N:
                    self.bookDic.pop(next(iter(self.bookDic)))
                    #Remove the first elememt in dic, Until the length <=N
                return bookdetail
                    #we donot have data locatally, so use function to get it
        return wrapper

#As we assume get_book_info(isbn) is given function, fetch from online source to get a list of data.
#Public varibles to be resuable. And In addition, this function return 
class savebook:
    def __init__(self,N):
        self.N=N
        self.bookDic={}
#Use python dictionaries. In addition, its ordered in python 3.7+, which is what we need here.
    
    @savemaxN
    def get_book_info(self,isbn):
        #Just a mock one, For the real one, need API calls
        #And possible stuck.unpack operation to turn back to byte,
        #Then need to decode to string
        return isbn
        
