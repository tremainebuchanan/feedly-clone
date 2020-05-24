const Publication = require('../models/db').Publication;

exports.index = (req, res, cb) => {
    Publication.find({}).exec((err, publications)=> {
        if(err){
            return res.json({
                status: 'error',
                message: err,
                data: []
            });
        }

        res.json({
            status: 'success',
            message: 'Publications',
            data: publications,
        });     
    });
}

exports.create = (req, res) => {
    const publication = new Publication(req.body);
    publication.save({}, (err)=>{
        if(err){
            return res.json({
                status: 'error',
                message: err
            })
        }

        res.json({
            status: 'success',
            message: 'Publication created',
            data: publication
        })
    })
}