const functions = require('./functions');

exports.index = async () => {
    return await functions.index();
}

// exports.create = (req, res) => {
//     const publication = new Publication(req.body);
//     publication.save({}, (err)=>{
//         if(err){
//             return res.json({
//                 status: 'error',
//                 message: err
//             })
//         }

//         res.json({
//             status: 'success',
//             message: 'Publication created',
//             data: publication
//         })
//     })
// }