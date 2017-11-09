use ContactDB;

db.contacts.insert({
    name:"harsh",
    email:"harsh@gmail.com",
    mobile:8097522505,
    type:"Family"
})

db.contacts.find().pretty()
