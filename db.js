class Book
{
    constructor(id,name,category,price,lendingArr)
    {
        this.id=id,
        this.name=name,
        this.category=category,
        this.price=price,
        this.isborrow=false
        this.lendingArr=lendingArr                     
    }
}

class Lending
{
    constructor(date,idCustomer)
    {
      this.date=date,
      this.idCustomer=idCustomer 
    }
}


const booksArr = [
  new Book(1, "lion", "animals", 20, [new Lending("12/3/2025", 3)]),
  new Book(2, "my family", "family", 50, [
  new Lending("12/3/2022", 2),
  new Lending("1/3/2025", 4),
  ]),
];


export default booksArr;