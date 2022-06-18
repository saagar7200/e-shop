//const { json } = require("express/lib/response");

class ApiFeatures {
    constructor(query,queryStr){
        this.query= query;
        this.queryStr = queryStr;
    }
    //here we define methods for search 
    search(){
        const keyword = this.queryStr.keyword
            ?{
                name:{
                    $regex: this.queryStr.keyword,
                    $options: 'i',
                },  
                
                
            }
            
            : {};

        //console.log(keyword);
        
        this.query = this.query.find({...keyword});
        return this;
    }
//to filter accorting to category and price range
    filter(){
        const queryCopy = {...this.queryStr};

       const  removeFields = ["keyword","page","limit"];
        //console.log(queryCopy);
        removeFields.forEach(element => delete  queryCopy[element]);

        //console.log(queryCopy);

        //filter for price and rating---->

        let queryStr = JSON.stringify(queryCopy);

        //console.log(queryStr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key) => `$${key}`);

       //  console.log(queryStr);


        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page || 1);

    
        const skip = resultPerPage *(currentPage-1);
        
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }


    

}

module.exports = ApiFeatures;


