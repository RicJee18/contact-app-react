const router = require('express').Router();
let Contact = require('../models/contact.model');

//home
router.route('/').get((req, res) => {

    Contact.find()
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json('Error : ' + err));

});

//add 
router.route('/create').post((req, res) => {

    const fullname = req.body.fullname;
    const email = req.body.email;
    const contact_num = req.body.contact_num;
    const location = req.body.location;
    const reg_date = req.body.reg_date;



    const newContact = new Contact({ fullname, email, contact_num, location, reg_date });

    newContact.save()
        .then(() => res.json('New Contact Added.'))
        .catch(err => res.status(400).json('Error: ' + err));

})

//detail
router.route('/:id').get((req, res) => {
    Contact.findById(req.params.id)
        .then(contact => res.json(contact))
        .catch(err => res.status(400).json('Error: ' + err));
})

//delete
router.route('/:id').delete((req, res) => {
    
    Contact.findByIdAndDelete(req.params.id)
        .then(contact => res.json('Contact was deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

//update
router.route('/update/:id').put((req, res) => {
    Contact.findById(req.params.id)
        .then(contact => {

            contact.fullname = req.body.fullname;
            contact.email = req.body.email;
            contact.contact_num = req.body.contact_num;
            contact.location = req.body.location;
            contact.reg_date = req.body.reg_date;

            contact.save()
                .then(contact => res.json("Record was updated."))
                .catch(err => res.status(400).json('Error: ' + err));
        })
})

module.exports = router;