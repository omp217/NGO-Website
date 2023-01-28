const express = require('express');
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const Category1 = require('./models/category1');
const Category2 = require('./models/category2');
const Category3 = require('./models/category3');

// express app
const app = express();

// for static files
app.use(express.static(__dirname + '/public'));

// register view engine
app.set('view engine', 'ejs');

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://watson:94RsU2xKfRs2QeFq@cluster0.cfth3qm.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'ri' })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// for POST request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home page
app.get('/', (req, res) => {
    res.render('home.ejs');
});

// Category 1
app.get('/category1', (req, res) => {
    res.render('category1.ejs');
});

app.get('/category1/insert', (req, res) => {
    res.render('category1/insert.ejs');
});

app.post('/category1/insert', async (req, res) => {
    (async function() {
        try{
            const category1 = new Category1(req.body);
            await category1.save();
            res.status(200).json({err: ''});
            console.log("Data saved successfully");
        }
        catch(err)
        {
            // console.log(err);
            if(err.code == 11000)
            {
                console.log("Aadhar number already exists");
                res.status(200).json({err: "Aadhar number already exists"});
            }
            else
            {
                res.status(200).json({err: "Some unexprected error occured"});
            }
        }
    })();
});

app.post('/category1/edit', async (req, res) => {
    console.log("Hello");
    await Category1.find({aadhar_number: req.body.aadhar_number}).then((result) => {
        res.status(200).json({data: result, err:''});
    }).catch((err) => {
        console.log(err);
        res.status(200).json({err: "Some unexprected error occured", data: []});
    });

    await Category1.deleteMany({aadhar_number: req.body.aadhar_number});
})

let cat1 = {
    data: [],
    err: ""
}

app.get('/category1/view', (req, res) => {
    res.render('category1/view.ejs', {data: cat1.data, err: cat1.err});
    cat1.data = [];
    cat1.err = "";
});

app.post('/category1/view', (req, res) => {
    // console.log(req.body);
    cat1.data = [];
    cat1.err = "";
    if(req.body.aadhar_number != "")
    {
        Category1.find({aadhar_number: req.body.aadhar_number}, (err, result) => {
            if(err)
            {
                // console.log(err);
                cat1.err = "Some unexprected error occured";
                res.status(200).json({temp:true});
            }
            else
            {
                if(result.length == 0)
                {
                    // console.log("No such aadhar number exists");
                    cat1.err = "No such aadhar number exists";
                    res.status(200).json({temp:true});
                }
                else
                {
                    // console.log("Data retrieved successfully");
                    cat1.data = result;
                    res.status(200).json({temp:true});
                }
            }
        });
    }
    else if(req.body.birth_date != "")
    {
        Category1.find({birth_date: req.body.birth_date}, (err, result) => {
            if(err)
            {
                // console.log(err);
                cat1.err = "Some unexprected error occured";
                res.status(200).json({temp:true});
            }
            else
            {
                if(result.length == 0)
                {
                    // console.log("No such aadhar number exists");
                    cat1.err = "No such birth date exists";
                    res.status(200).json({temp:true});
                }
                else
                {
                    // console.log("Data retrieved successfully");
                    cat1.data = result;
                    res.status(200).json({temp:true});
                }
            }
        });
    }
    else
    {
        // console.log("Please enter aadhar number or birth date");
        cat1.err = "Please enter aadhar number or birth date";
        res.status(200).json({temp:true});
    }
});

app.get('/category1/delete', (req, res) => {
    res.render('category1/delete.ejs');
});

app.post('/category1/delete', (req, res) => {
    (async function() {
        try{
            await Category1.deleteMany({aadhar_number: req.body.aadhar_number});
            res.status(200).json({err: ''});
            console.log("Data deleted successfully");
        }
        catch(err)
        {
            console.log(err);
            res.status(200).json({err: "Some unexprected error occured"});
        }
    })();
});

// Category 2
app.get('/category2', (req, res) => {
    res.render('category2.ejs');
});

app.get('/category2/insert', (req, res) => {
    res.render('category2/insert.ejs');
});

app.post('/category2/insert', async (req, res) => {
    (async function() {
        try{
            const category2 = new Category2(req.body);
            await category2.save();
            res.status(200).json({err: ''});
            console.log("Data saved successfully");
        }
        catch(err)
        {
            res.status(200).json({err: "Some unexprected error occured"});
        }
    })();
});

let cat2 = {
    data: [],
    err: ""
}

app.get('/category2/view', (req, res) => {
    res.render('category2/view.ejs', {data: cat2.data, err: cat2.err});
    cat2.data = [];
    cat2.err = "";
});

app.post('/category2/view', (req, res) => {
    // console.log(req.body);
    cat2.data = [];
    cat2.err = "";
    Category2.find({mobile_number: req.body.mobile_number}, (err, result) => {
        if(err)
        {
            // console.log(err);
            cat2.err = "Some unexprected error occured";
            res.status(200).json({temp:true});
        }
        else
        {
            if(result.length == 0)
            {
                // console.log("No such aadhar number exists");
                cat2.err = "No such mobile number exists";
                res.status(200).json({temp:true});
            }
            else
            {
                // console.log("Data retrieved successfully");
                cat2.data = result;
                res.status(200).json({temp:true});
            }
        }
    });
});

// Category 3
app.get('/category3', (req, res) => {
    res.render('category3.ejs');
});

app.get('/category3/insert', (req, res) => {
    res.render('category3/insert.ejs');
});

app.post('/category3/insert', async (req, res) => {
    (async function() {
        try{
            const category3 = new Category3(req.body);
            await category3.save();
            res.status(200).json({err: ''});
            console.log("Data saved successfully");
        }
        catch(err)
        {
            console.log(err);
            res.status(200).json({err: "Some unexprected error occured"});
        }
    })();
});

let cat3 = {
    data: [],
    err: ""
}

app.get('/category3/view', (req, res) => {
    res.render('category3/view.ejs', {data: cat3.data, err: cat3.err});
    cat3.data = [];
    cat3.err = "";
});

app.post('/category3/view', (req, res) => {
    // console.log(req.body);
    cat3.data = [];
    cat3.err = "";
    Category3.find({mobile_number: req.body.mobile_number}, (err, result) => {
        if(err)
        {
            // console.log(err);
            cat3.err = "Some unexprected error occured";
            res.status(200).json({temp:true});
        }
        else
        {
            if(result.length == 0)
            {
                // console.log("No such aadhar number exists");
                cat3.err = "No such mobile number exists";
                res.status(200).json({temp:true});
            }
            else
            {
                // console.log("Data retrieved successfully");
                cat3.data = result;
                res.status(200).json({temp:true});
            }
        }
    });
});

// Download

app.get('/download',async (req, res) => {
    try
    {
        let ma = -1;
        let result1 = await Category1.find({});
        result1 = result1.map((item) => {
            let ret = [item.first_name, item.last_name, item.date_of_visit, item.ref_name, item.birth_date, item.aadhar_number, item.address, item.mobile_number];
            for(let i = 0; i < item.help.length; i++)
            {
                // ret.push(JSON.stringify(item.help[i]));
                let arr = [];
                arr.push(item.help[i]);
                ret.push(arr);
            }
            ma = Math.max(ma, item.help.length);
            return ret;
        });
        for(let i = 0; i < result1.length; i++)
        {
            while(result1[i].length < ma+8)
            {
                result1[i].push("Empty");
            }
        }
        let push = ["First Name", "Last Name", "Date of Visit", "Ref Name", "Birth Date", "Aadhar Number", "Address", "Mobile Number"];
        for(let i = 0; i < ma; i++)
        {
            push.push(`Help ${i+1}`);
        }
        result1.unshift(push);

        let result2 = await Category2.find({});
        result2 = result2.map((item) => {
            return [item.first_name, item.last_name, item.date_of_visit, item.address, item.mobile_number, item.whatsApp_number, item.info_of_donation, item.review_of_visit];
        });
        result2.unshift(["First Name", "Last Name", "Date of Visit", "Address", "Mobile Number", "WhatsApp Number", "Info of Donation", "Review of Visit"]);

        let result3 = await Category3.find({});
        result3 = result3.map((item) => {
            return [item.first_name, item.last_name, item.date_of_visit, item.mobile_number, item.reason_of_visit];
        });
        result3.unshift(["First Name", "Last Name", "Date of Visit", "Mobile Number", "Reason of Visit"]);

        const wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(result1);
        XLSX.utils.book_append_sheet(wb, ws, "Category 1");
        ws = XLSX.utils.aoa_to_sheet(result2);
        XLSX.utils.book_append_sheet(wb, ws, "Category 2");
        ws = XLSX.utils.aoa_to_sheet(result3);
        XLSX.utils.book_append_sheet(wb, ws, "Category 3");
        console.log("File downloaded successfully");
        const filePath = path.join(__dirname, 'Data.xlsx');
        console.log(filePath);
        await XLSX.writeFile(wb, filePath);
        res.download(path.join(__dirname, 'Data.xlsx'), "Data.xlsx");
    }
    catch(err)
    {
        console.log(err);
        res.write("Some unexprected error occured");
    }
});