import hotelModel from "../models/Hotel.js";

// create hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new hotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// update hotels
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await hotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};
// delete hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

// get hotel by hotel id
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

//get all hotels
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await hotelModel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
