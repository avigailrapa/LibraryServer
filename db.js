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


export default booksArr;