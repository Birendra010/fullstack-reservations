import roomModel from "../models/Room.js";
import hotelModel from "../models/Hotel.js";
import { handleError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new roomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await hotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};


// update room
export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await roomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (err) {
    next(err);
  }
};




export const updateRoomAvailability = async (req, res, next) => {
  try {
    await roomModel.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          //it will updated nested properties  it wiil be write like that
          "roomNumbers.$.unavailableDates":req.body.dates
        },
      }
   )
    res.status(200).json("Room status has been updated");
  } catch (err) {
    next(err);
  }
};
// delete room
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;


  try {
      await roomModel.findByIdAndDelete(req.params.id);
       try {
         await hotelModel.findByIdAndUpdate(hotelId, {
           $pull: { rooms: req.params.id },
         });
       } catch (err) {
         next(err);
       }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

// get room by room id
export const getRoom = async (req, res, next) => {
  try {
    const room = await roomModel.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

//get all rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await roomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
