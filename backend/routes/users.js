const router=require("express").Router();
const User = require("../models/user")
const bcrypt = require("bcrypt");

//update a user 

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json("hashing error");
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json("updation error");
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  });


//delete a user

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json("deletion error");
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

 router.get("/:id" ,async(req,res)=>{
    try{
        
        const user=await User.findById(req.params.id);
        res.json(user);
    }catch(err)
    {
   res.status(500).json("error in retriving data")

    }

 })




//get a user 
router.get("/", async (req, res) => {
  const userId=req.query.userId;
  const username=req.query.username;
    try {
      const user = userId ? await User.findById(userId): await User.findOne({username:username});
      const { password, updatedAt,...other } = user._doc;
      console.log("saksahm");
      res.json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //get freinds 

   router.get("/friends/:userId" ,async(req,res)=>{
    try{
      const user= await User.findById(req.params.userId);
      const friends=await Promise.all( 
        user.followings.map(friendId=>{
          return User.findById(friendId)
        })
      );

      let friendList=[];
      friends.map((friend)=>{
        const{_id, username, profilePicture}=friend;
        friendList.push({_id,username,profilePicture});
      });
      res.status(200).json(friendList)

    }catch(err){
        res.status(500).json(err);
    }
   })



// follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentuser = await User.findById(req.body.userId);

      if (!user || !currentuser) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentuser.updateOne({ $push: { followings: req.params.id } });
        return res.status(200).json({ message: "User has been followed" });
      } else {
        return res.status(200).json({ message: "You already follow this user" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "An error occurred while following", error: err.message });
    }
  } else {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }
});

 


// unfollow a user 

router.put("/:id/unfollow", async (req,res)=>{
    if(req.body.userId !=req.params.id)
    {
      try{
        const user= await User.findById(req.params.id);
      const currentuser = await User.findById(req.body.userId);

      if(user.followers.includes(req.body.userId) )
      {
        await user.updateOne({$pull :{ followers : req.body.userId}});
        await currentuser.updateOne({$pull :{ followings : req.body.userId}});
        res.status(200).json("user has been unfollowed")
      }
      else{
        res.staus(200).json("you are following the user already")
      }
        }catch(err)
      {
          res.status(500).json("error occured while following")
      }
    }
})








module.exports=router;