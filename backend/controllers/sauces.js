const Sauce = require('../models/sauce');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    req.body.sauce = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
      name: req.body.sauce.name,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      manufacturer : req.body.sauce.manufacturer,
      userId: req.body.sauce.userId,
      mainPepper: req.body.sauce.mainPepper,
      likes: 0 ,
      dislikes : 0 ,
      usersLiked : [],
      usersDisliked : []

    });
    sauce.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({ _id: req.params.id });
    if (req.file) {
      req.body.sauce = JSON.parse(req.body.sauce);
      const url = req.protocol + '://' + req.get('host');
      // match the property 
      sauce = {
       
        name: req.body.sauce.name,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      manufacturer : req.body.sauce.manufacturer,
      userId: req.body.sauce.userId,
      mainPepper: req.body.sauce.mainPepper,
      
      };
    } else {
      sauce = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        manufacturer : req.body.manufacturer,
        userId: req.body.userId,
        mainPepper: req.body.mainPepper,
        
      };
    }
    Sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
        res.status(201).json({
          message: 'Sauce updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then(
      (sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
          Sauce.deleteOne({_id: req.params.id}).then(
            () => {
              res.status(200).json({
                message: 'Deleted!'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        });
      }
    );
  };

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
exports.likesAndDislikes = (req,res) =>{
let userIdentifiant = req.body.userId
let likeStatus = req.body.like

// If the user like the sauce the like is increase to one

if (likeStatus == 1)
{
  Sauce.updateOne({_id:req.params.id}, {$inc:{likes:+1}, $push:{usersLiked:userIdentifiant}})
  .then (() => res.status(201).json({message:"Like has been increased"}))
  .catch(error => res.status(400).json(error))

}

//IF the user doesn't like anymore the sauce the like is decresed to one

if (likeStatus == 0) {
  Sauce.findOne({_id : req.params.id}).then((sauce)=>{
    if(sauce.usersLiked.includes(userIdentifiant)){
      Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: userIdentifiant } })
      .then(() => {
        res.status(201).json({ message: ['Like has been canceled', 'Dislike has been canceled'] });
      })
      .catch((error) => res.status(400).json(error));
    }
    if(sauce.usersDisliked.includes(userIdentifiant)){
      Sauce.updateOne(
        { _id: req.params.id },
        { $inc: { dislikes: -1 }, $pull: { usersDisliked: userIdentifiant } }
    )
      .then(() => {
          res.status(201).json({ message: ['Like has been canceled', 'Dislike has been canceled'] });
      })
      .catch((error) => res.status(400).json(error));
    }
  })
  
}

// If the user doesn't like the sauce we add a negative value -1
if (likeStatus == -1)
{
  Sauce.updateOne({_id:req.params.id}, {$inc:{dislikes:+1}, $push:{usersDisliked:userIdentifiant}})
  .then (() => res.status(201).json({message:"Dislike has been decreased"}))
  .catch(error => res.status(400).json(error))

}

}


